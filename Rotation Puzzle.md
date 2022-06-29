# Rotating Puzzle
For this puzzle we need the following modules:
 * Monks Active Tiles
 * Tagger

We want to create a puzzle where we need to rotate several disks, so that the final image is reconstructed.


## Creating the disks
I made my "disks" using inkscape. Cut an image into concetric circles using mask, clip and "distribute and align".

![circle description](https://user-images.githubusercontent.com/8543541/176551518-077169c8-d6cc-4649-88bd-c4e76e1bcd79.png)

Result:
1. ![ring1](https://user-images.githubusercontent.com/8543541/175750183-9af16ffa-8f41-46ce-9261-cd1cb0141587.png)
2. ![ring2](https://user-images.githubusercontent.com/8543541/175750195-d708e1f2-dcfd-43fd-b6fa-5f03717a46d2.png)
3. ![ring3](https://user-images.githubusercontent.com/8543541/175750199-900707e7-adda-4fd3-93ac-9986730b2f7f.png)


## Creating the Scene
Add the tiles to your scene, somewhere fitting. Using Tagger, tag first all the circle tiles as Disks, and then tag them as Disk1, Disk2 and so on.
![image](https://user-images.githubusercontent.com/8543541/175750656-cd1523ba-2117-4a79-afcf-7e9064a105cb.png)

## Rotation button(s)
Add an image as a tile that should work as a button to rotate one of the disks. 
Double click the tile, head over to triggers and make sure it looks like this:
![image](https://user-images.githubusercontent.com/8543541/175750832-0622dee2-6d05-4909-b8dc-3719ebb23cc9.png)

Repeat this step for each disk, and optionally add buttons to rotate them counter-clockwise (just subtract rotation instead of adding it) as well.

## Testing for "correct" solution
Add a new macro, make sure to set it to "script", call it "test if correct" and add the following code to it:
```JS
let tiles =  Tagger.getByTag('Disks');
let rotations = tiles.map(t=>t.data.rotation);
let result = !rotations.some(v=>(v!=0));
return result;
```
This macro, will return true if all disks are rotated to zero, and return false else. Alone, when called it doesn't do anything usefull.

## Adding a "Test and Reward" Tile
Next, add a new tile, set this to trigger when clicked.
Add two actions to it:
1."Run Macro"-> "test if correct"
2. Whatever actions you consider the reward, e.g., playing a fanfare.

![image](https://user-images.githubusercontent.com/8543541/175751341-b48e945c-8555-43df-a7cf-0d5d553e0d12.png)

## Tying it all together
Its rather boring if you have to click the "test and reward" tile everytime to check if its at the correct placement.
To have automatic testing, you need to edit all the rotation buttons, and add another step after the rotation: "Trigger Tile", and trigger the "test and reward" tile. This will run the test, and potentially the reward after each rotation.



