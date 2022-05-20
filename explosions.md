## Explosions
Do you wish to spring an explosive trap on your players,? of course you do.
For this tutorial you need the following modules:
 * Monks Active Tiles
 * Sequencer
 * JB2A -- Animations

![ezgif-3-3aaddaa1f5](https://user-images.githubusercontent.com/8543541/168701507-ea51b45c-f7e5-42a8-a581-f3d7d9fd5f99.gif)


### Step 1 -- Some groundwork

First we need an actor that can perform the trap attack. Create a new NPC, name it traps and give it a fitting icon.
The NPC also needs to have an attack action, call this action "Explosion"

![image](https://user-images.githubusercontent.com/8543541/168702427-42a80caf-55a4-40d4-99cb-45a2e05ed7aa.png)

Next head over to [freesound](https://freesound.org/people/Iwiploppenisse/sounds/156031/) and download a suitable sound file for the explosion.
In the macro below, we need the file to be placed under "media/156031__iwiploppenisse__explosion.mp3", replace this with your selection of sound.

## Step 2 -- A Sequencer Macro

Click the token-bar or create a new macro from the macro menu. Call this macro "Explode At Tokens".
It should contain this:
```JS
let targets = arguments[0].tokens;

let sequence = new Sequence()
for(let target of targets){
    sequence.effect()
        .atLocation(target)
        .file("jb2a.explosion.01.orange")
        .sound("media/156031__iwiploppenisse__explosion.mp3")
       ;
}

```
Make sure you remember set its **Type** over to **script**

## Step 3 -- Configuring the Active Tile as the Trap trigger
Create a tile that spans the entire area where the trap should be triggered.
In my case I used a fitting image spanning only one grid-cell. Remember to hide this image, so that your players can't easily see the trap.

Double click the tile to bring up its configuration, and move over to the "_Triggers_" tab.
![image](https://user-images.githubusercontent.com/8543541/168703139-43e8092f-7ac0-439a-abe2-7b8591f54c74.png)

1. Set the tile to trigger "On Enter"
2. Add the _"Run Macro"_ action, and set it to run the macro we created in step 2.
3. Add the _"Attack"_ action, select our Trap actor, and the "Explosion" attack.

And, thats all.

