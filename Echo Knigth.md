
# Echo Knights in DnD 5e
**Dependencies**
 * Module: [Sequencer](https://foundryvtt.com/packages/sequencer), for playing fancy effects
 * Module: [Warpgate](https://foundryvtt.com/packages/warpgate), for spawning, dynamically setting saves and AC and dismissing your shadow.
 * Video: [JB2A](https://github.com/Jules-Bens-Aa/JB2A_DnD5e)
 * Sound: [freesound.org](https://freesound.org/people/kwahmah_02/sounds/269326/)


<details>
 <summary>Video Example, un-mute sound</summary> 

https://user-images.githubusercontent.com/8543541/188287372-47365451-b959-4a39-90c7-a2c0239c7a63.mp4
</details>
Artwork by [Forgotten Adventures](https://forgotten-adventures.net)

## Echo Spawn
Spawning the echo as a user, and with the option of dismissing it. (This macro will also remove your previous echo if you spawn a new one).
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
 The variables player_character and echo_shadow is automatically set to the users character name, 
 which might differ from their tokens name. If this is the case, hardcode the varables to their correct name.
 The echo_shadow variable is set to the character name + "'s Shadow".
 */
const actor = game.user.character;
const summonType = actor.name + "'s Shadow";

canvas.tokens.placeables.filter(t=>t.name==summonType).map(t=>t.id).forEach(t=>warpgate.dismiss(t));

async function preEffect(template, update){
  new Sequence()
    .effect()
      .file('modules/JB2A_DnD5e/Library/Generic/Smoke/SmokePuff01_02_Regular_Grey_400x400.webm')
      .scale(.5)
      .atLocation(template)     
      .play();
}

async function postEffect(template, token) {
  new Sequence()
    .animation()
        .on(token)
            .fadeIn(1000)
    .play()
}


let updates = {
    token : {
        'name':`${summonType}`,
        'alpha':0
    },
    actor: {
        'name' : `${summonType}`,
        'data.attributes.hp': {value: 1, max: 1},
        'data.attributes.ac': {flat: 14+actor.data.data.attributes.prof , calc:'flat'},
        'data.abilities' : actor.data.data.abilities,
        'data.details.cr' : actor.data.data.details.level
    }
}
let callbacks = {
    pre: async (template, update) => {
        preEffect(template,update);
        await warpgate.wait(1200);
    },
    post: async (template, token) => {
      postEffect(template,token);
      await warpgate.wait(500);
    }
}
warpgate.spawn(summonType, updates, callbacks);
```



## Echo Relocate
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
 The variables player_character and echo_shadow is automatically set to the users character name, 
 which might differ from their tokens name. If this is the case, hardcode the varables to their correct name.
 The echo_shadow variable is set to the character name + "'s Shadow".
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
  
  
