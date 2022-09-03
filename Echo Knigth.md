
# Echo Knights in DnD 5e
**Dependencies**
 * Module: [Sequencer](https://foundryvtt.com/packages/sequencer)
 * Video: [JB2A](https://github.com/Jules-Bens-Aa/JB2A_DnD5e)
 * Sound: [file](https://freesound.org/people/kwahmah_02/sounds/269326/)

<details>
 <summary>Video Example, un-mute sound</summary> 

https://user-images.githubusercontent.com/8543541/188287372-47365451-b959-4a39-90c7-a2c0239c7a63.mp4
</details>
Artwork by [Forgotten Adventures](https://forgotten-adventures.net)


Echo knights can switch their position with their echos at the cost of 15' of your movement. Want to automate that?
Use the following macro:

```JS
/*
▓█████▄  ██▀███           ▒█████  
▒██▀ ██▌▓██ ▒ ██▒        ▒██▒  ██▒
░██   █▌▓██ ░▄█ ▒        ▒██░  ██▒
░▓█▄   ▌▒██▀▀█▄          ▒██   ██░
░▒████▓ ░██▓ ▒██▒ ██▓    ░ ████▓▒░
 ▒▒▓  ▒ ░ ▒▓ ░▒▓░ ▒▓▒    ░ ▒░▒░▒░ 
 ░ ▒  ▒   ░▒ ░ ▒░ ░▒       ░ ▒ ▒░ 
 ░ ░  ░   ░░   ░  ░      ░ ░ ░ ▒  
   ░       ░       ░         ░ ░  
 ░                 ░              
 This macro is written by Dr.O.
 https://github.com/oOve/sundries
 If you like it, please consider buying me a coffee here: https://www.patreon.com/drO_o
 
 Some notes about this macro. 
 The variables player_character and echo_shadow automatically set to your users character name, 
 which might differ from his tokens name. If this is the case, you need to hardcode the varables to their correct name.
 The echo_shadow variable is set to the character name + "'s Shadow". If you have a different name for your shadow
 token, this must also be typed in below.
 */

let player_character, echo_shadow;
if (game.user.character){
  player_character = game.user.character.name;
  echo_shadow = player_character + "'s Shadow";
}
else{
  // We need to hardcode the player names if we are the DM, or don't have any characters assigned
  player_character = "Bastien Rousseau";
  echo_shadow = player_character + "'s Shadow";
}


let sound = "sound/269326__kwahmah-02__swoosh41.mp3";
let anim = "modules/JB2A_DnD5e/Library/Generic/Smoke/SmokePuffRing01_01_Regular_White_400x400.webm";

let t1s = canvas.tokens.placeables.filter(t=>t.name==player_character);
let t2s = canvas.tokens.placeables.filter(t=>t.name==echo_shadow);

if (t1s.length<1){
  ui.notifications.error("Token not found! " + player_character);
  return;
}
if (t1s.length>1){
  ui.notifications.error("Multiple tokens found on scene! " + player_character);
  return;
}
if (t2s.length<1){
  ui.notfications.error("No shadow found! " + echo_shadow);
  return;
}
if (t2s.length>1){
  ui.notifications.error("Multiple shadow tokens found! " + echo_shadow);
  return;
}

let t1 = t1s[0];
let t2 = t2s[0];


const ray = new Ray(t1, t2);
const segments = [{ray}];
const dist = canvas.grid.measureDistances(segments,{gridSpaces:true})[0]

if (dist > 30){
 ui.notifications.info("You are further than 30' away from your echo, be aware it might be destroyed at the end of your turn");
}


let seq = new Sequence()  
  .sound().file(sound)
  .effect()
     .file(anim)
     .atLocation(t1)
     .randomRotation()
     .scale(.4)
  .effect()
     .file(anim)
     .atLocation(t2)
     .randomRotation()
     .scale(.4)
  .wait(100)
  .thenDo( ()=>{let p1 = {x:t1.x, y:t1.y};t1.document.update( {x:t2.x, y:t2.y}, {animate:false} );t2.document.update( p1, {animate:false} );} )
  .play();
  
  ```
  
  
