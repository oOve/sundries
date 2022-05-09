# The Macro Macro – Creator of Sokoban Maps

I have previously made sokoban maps using the on-enter/on-exit functionality of Active Tiles. If your targets are not next to each other this works fairly ok, but it is prone to mess up the counter. This is due to the on-enter and on-exit being called too close to each other and the counter gets lost in “race-condition” bugs. In this document I will describe how I made a couple of macros that will ease Sokoban map creation.

## Modules required:
 * Pushable
 * Monks Active Tiles
 * Harvest State (found [here](Harvest%20State.md) )
 * Define Correct (found [here](Define%20Correct.md) )

## Setup
In these maps I have marked the crates initial position in green, and the target/goal positions in red (red can overlap green as you see).
![image](https://user-images.githubusercontent.com/8543541/167253477-59251e67-fd10-4aa5-af10-97cf3798d9d0.png)

## Step 1 -- Crate Tokens

Create a Crate token, mark it pushable (and pullable) and drag it onto your scene. Copy and paste it for all the initial placements.
![image](https://user-images.githubusercontent.com/8543541/167253693-4e4c3c80-d025-41fd-9c5d-006997945708.png)

## Step 2 -- Create a Reset State / Revert Macro
Ensure that all your tokens/crates are in their initial position and select/mark them all. With all tokens selected, run the [Harvest State](Harvest%20State.md)  macro. The Harvest State macro presents a text input, in this type in your room name, I will type in Room 4, and click Ok.
Next to your macro hotbar there is a small folder icon, click that and the full list of all your macros will show up. In this list there should now be a macro called: “Restore Room 4”

![image](https://user-images.githubusercontent.com/8543541/167254157-fa6ee31e-bef2-4016-93e3-c72633fe387b.png)

If you move your tokens/crates around, executing this macro will bring them back to their initial positions.

## Step 3. – Automating Reset
Drag a tile suitable to act as a lever. Double click the tile and enter the Monks Active Tile Triggers (MATT) settings.
![image](https://user-images.githubusercontent.com/8543541/167254459-0bff6d20-fa58-4304-83a3-a7b0f26be39d.png)
Add a trigger “On Click” and the Action: Run Macro, “Restore Room 4” and Run As GM.

You now have a lever you can click to reset the scene. If you wish your players to be able to reset the scene as well, place the lever in view of the players. As long as you selected “Controlled by anyone” and the macro was run as GM your players should be able to use it as well.

## Step 4 – Defining the End Goal
Move all your crates around to put them in their final positions. As before make sure you mark them all (as shown in the image below), and this time run the macro called [Define Correct](Define%20Correct.md). In the prompt, put in “Room 4”.
![image](https://user-images.githubusercontent.com/8543541/167254991-53d6bed8-8047-4e7b-ab20-60aedc910e9a.png)

As before this created a new macro for you. You’ll find it the same place as the previous macro, it will be named: “Test Against State Room 4”. 

Create a new tile, I chose a door handle icon, and enter MATT settings. 
![image](https://user-images.githubusercontent.com/8543541/167255181-57f49220-3d78-401d-9ae7-b61edb6d290d.png)
Set the tile to “On Click” and add the actions:
* **Run Macro**: “Testa against state room 4” as GM
* **Play Sound File**: “congratulations sound.mp3”
* Open the next door: Change Wall/Door
* Other actions you wish to perform as a successful reward to solving this puzzle.


## Step 5 – Automating it All
It is kinda daft having to click the button every time you wish to see if the boxes are in their right position, so lets automate that.

Create a new tile, and scale it down so it fits within one grid cell. Mark this tile as “Hidden”:

![image](https://user-images.githubusercontent.com/8543541/167255525-31af9eb7-92d6-4392-8fd3-fa40b21b1e85.png)

Enter its MATT settings, and set this to trigger “On Enter” (usually the default), but ensure that it will only trigger by “Restricted Tokens: Only GM Tokens”.
Add the following actions to this tile:
 * **Delay Actions** by 0.5 seconds
 * **Trigger Tile**: Trigger the tile created in step 4, the door handle/test button.

![image](https://user-images.githubusercontent.com/8543541/167255747-3e859023-536e-4df6-8122-9e4dc1834aeb.png)

Copy this tile, and paste it into all the goal positions. 

The finished product should look something like this (for the GM):

![image](https://user-images.githubusercontent.com/8543541/167255860-55e2c0e6-4589-4026-8ae1-f74405636dd0.png)



## Caveats/Notes:
* This module not only requires the GM to be logged in to work, it also requires the GM to have the map “active” (not on another tab). If your detection macro does not trigger for your players, this might be the reason.
* As you can see in the “door handle” tile, there are no fancy tests done before starting the actions for the reward. This is because Active Tile triggers will automatically stop the following actions if a macro returns false.
* The state macro sends each specific crate back to its starting position, but the test solution macro ignores these. If you mark your solution in a specific order, it will also return true for any other order of crates (as long as it is from the same list as before).
* For the same reason as above, you cannot have more tokens/crates than the set in the solution. You cannot bring a crate from a previous level into the next (unless you already planned this one).
* If you delete/add a crate, you need to re-create all the macros. I suggest deleting the old ones first.
* The “delay-action” in the target tiles are there so that the crate has had time to move to its final position before testing if it's at its correct place. You might need to tweak this “0.5” seconds if the Test final state does not trigger.
* To play with true Sokoban rules, you need to disable pull, dis-allow diagonal movement, set the push limit to 1, and tell your players to not drag and drop their token (hmm.maybe the pushable module could optionally enforce this in the future).


