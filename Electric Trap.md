# Electric Trap

**Requirements:**
 * [Monk's Active Tile Triggers](https://github.com/ironmonk88/monks-active-tiles/)
 * [Sequencer](https://foundryvtt.com/packages/sequencer)
 * [JB2A Animated Tiles](https://github.com/Jules-Bens-Aa/JB2A_DnD5e)

**Video Preview**
<details>
 <summary>Video Example, un-mute sound</summary> 

https://user-images.githubusercontent.com/8543541/188281655-5cf8bafd-e2d2-484c-abdd-f6f0dffdd9c4.mp4
</details>
Artwork by [Forgotten Adventures](https://forgotten-adventures.net)


**Macro:**
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
 */

let t = arguments[0].tokens[0]; // Extract the first "current token" from MATT
let s = "sound/456310__corruptinator__electricity-energy-2.mp3";  // The path to our sound file, replace with your own.

let seq = new Sequence()  
  .sound()
    .file(s)
    .duration(1000)
  .effect()
     .file("modules/JB2A_DnD5e/Library/Generic/Lightning/LightningBall_01_Regular_Blue_400x400.webm")
     .attachTo(t)
     .duration(1000)
  .play(); 
 ```
 
 The sound file used [Electricity Energy 2, by Corruptinator](https://freesound.org/people/Corruptinator/sounds/456310/)
 
 
