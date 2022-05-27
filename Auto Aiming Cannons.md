## Cannons that Automagically Follows the Closest Player

This macro depends on the Tagger module, and nothing else. It is also system agnostic.
It will rotate any number of tagged elements, be it tokens, tiles, or generic placeables. 
Every time a token moves, the "cannons" will point at their respective closest player owned
token.
This macro has a hardcoded angle set to 90, this is their initial offset, which will vary based on 
where your drawing points initially. If I'm not mistaken, replace 90 with 0 if your "cannons" point upward.

![ezgif-3-0a610f234c](https://user-images.githubusercontent.com/8543541/170799004-3e8e2654-5b23-4226-b683-3d4e1f25aa97.gif)


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
This macro is made by Dr.O_o 
If you appreciate this, consider buying me a coffee
at https://www.patreon.com/drO_o
*/

// All the tiles/placeables we should rotate are tagged "cannon"
let cannons = Tagger.getByTag('cannon');

// Argmin/argmax functions
const argFact = (compareFn) => (array) => array.map((el, idx) => [el, idx]).reduce(compareFn)[1]
const argMax = argFact((min, el) => (el[0] > min[0] ? el : min))
const argMin = argFact((max, el) => (el[0] < max[0] ? el : max))

// Radians to degrees
function rad2deg(radians){return radians * 180 / Math.PI;}
// Vector subtractions
function vSub(v1,v2){return {x:v1.x-v2.x, y:v1.y-v2.y}}
// Squared length (before sqrt, to save computations)
function len2(v1,v2){return (v1.x-v2.x)**2 + (v1.y-v2.y)**2 }

// The callback that does the actual rotations
function onUpdateToken(token, change, options, user_id){
  let players = canvas.tokens.placeables.filter( t=>t.actor.hasPlayerOwner );
  console.log(players);
  for (let cannon of cannons){
    let distances = players.map( p=>len2(p.center, cannon.object.center));
    
    // Player[i] is closest
    let i = argMin(distances);    
    // Pointing vector from cannon to player
    let dir = vSub(players[i].center, cannon.object.center);
    let r = Math.atan2(dir.x, dir.y);
    
    // TODO: Change 90 with what-ever works for your "cannons"
    // Add 90 (because thats how the cannons point at 0deg), and negate (since thats how foundry rolls).
    let d = 90-rad2deg(r);
    cannon.update({rotation:d});
  }    
}



// Hacky way of avoiding binding multiple hooks.
if ('cannon_O_o_hook' in document){
  console.log("Released previously bound hook:", document.cannon_O_o_hook);
  Hooks.off( 'updateToken', document.cannon_O_o_hook);
}
// Bind it
let hook_ID = Hooks.on("updateToken", onUpdateToken);
// And lets keep the id, to avoid binding to it twice.
document.cannon_O_o_hook = hook_ID;
```
