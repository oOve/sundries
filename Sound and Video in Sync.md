
Do you want a video to play somewhere on your scene maybe started by an active tile, and synchronized with a sound file?

<details>
 <summary>Click here to show video example</summary> 
 
 https://github.com/oOve/sundries/raw/main/media/steam_explosion.mp4
</details>


Macro needed:
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

let v = "modules/JB2A_DnD5e/Library/5th_Level/Cone_Of_Cold/ConeOfCold_01_Regular_Blue_600x600.webm";
let s = "PATH TO YOUR SOUND FILE";

// The following data can be collected from the command console. 
// Place the tile/video at its desired position and write this commmand:
/*
{x: canvas.background.controlled[0].center.x, 
 y: canvas.background.controlled[0].center.y, 
 r: canvas.background.controlled[0].data.rotation, 
 w: canvas.background.controlled[0].data.width, 
 h: canvas.background.controlled[0].data.height }
*/
// Copy its output in below, and delete the tile.
// It should look something like:
let p = {x: 5548.4, y: 5805.1, r: 180, w: 600, h: 600};

let seq = new Sequence()  
  .sound()
    .file(s)
  .wait(2200) // 2200 milliseconds delay, this is the time to wait from playing the sound file to playing the video.
  .effect()
     .file(v)
     .atLocation(p)     
     .rotate(p.r)
  .play();
```

Steps:
 1. Place a webm video tile somwhere on your scene
 2. Select that tile and open the command console (F12)
 3. Type in ```{x: canvas.background.controlled[0].center.x, 
 y: canvas.background.controlled[0].center.y, 
 r: canvas.background.controlled[0].data.rotation, 
 w: canvas.background.controlled[0].data.width, 
 h: canvas.background.controlled[0].data.height }```
 4. Copy the output into the macro above.
 5. Have your active tile trigger run that macro :)






