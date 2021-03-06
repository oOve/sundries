# Creating a puzzle where inputing n-digits is the goal

Modules required:
  * Tagger
  * Monks Active Tiles

## Preparation

 1. Create N "Digits"/text boxes using the drawing tools. Enter 0 into all of them, and tag them using Tagger to digit-1, digit-2 and so on.
 2. Overlapping each digit, create a hidden tile; this will act as our Active Tile Trigger.
 3. Create a tile that will test for the correct combo, and if so trigger our reward.
    1. Trigger: click
    2. Action: **run macro** , run the macro below (needs to be done after you actually create it).
    3. Action: Play a sound, or any other fitting reward action. This action will only happen if the macro above returns true.
 5. Create the macro, as below:

```JS
// Define how many digits we have
const N = 4; 
// Define our answer
let answer = [4,1,6,7];

let digit_drawings = [...Array(N).keys()].map(i=>Tagger.getByTag('digit-'+(i+1))[0]);
let digit = digit_drawings.map(t=>t.data.text);
let res = [...Array(N).keys()].some(i=>(digit[i]!=answer[i]));
return !res;
```

For each of the tiles, which are above a number, edit their active effect:
![image](https://user-images.githubusercontent.com/8543541/170485918-9b52604f-1e35-4b7e-889d-5995f7558878.png)

These tiles are triggered by click, from anyone and have the following _actions_:
 1. **Filter Tokens by distance**: to avoid anyone clicking them from afar.
 2. **Alter**: Use tagger and get _digit-1_ . Write in text as the attribute and as the value copy and paste in: "= (Number({{entity.data.text}})+1)%10"
 3. **Delay Actions:** We need to wait a bit, untill the digit is done changing, before running the macro to test for correct digits
 4. **Trigger Tile:** Trigger the tile we set up to test for the correct combo, and if so, trigger the reward.

If you wish to add two "buttons" one to increment and one to decrement the number, replace the above with: ""= (Number({{entity.data.text}})+9)%10". (yes, that adds 9 instead of -1, because javascript.)
