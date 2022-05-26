# Creating a puzzle where inputing n-digits is the goal

Modules required:
  * Tagger
  * Monks Active Tiles

## Preparation

 1. Create N "Digits"/text boxes using the drawing tools. Enter 0 into all of them, and tag them using Tagger to digit-1, digit-2 and so on.
 2. Overlapping each digit, create a hidden tile; this will act as our Active Tile Trigger.
 3. Create the macro, as below.

´´´JS
// Define how many digits we have
const N = 4; 
// Define our answer
let answer = [4,1,6,7];

let digit_drawings = [...Array(N).keys()].map(i=>Tagger.getByTag('digit-'+(i+1))[0]);
let digit = digit_drawings.map(t=>t.data.text);
let res = [...Array(N).keys()].some(i=>(digit[i]!=answer[i]));
return !res;
```
