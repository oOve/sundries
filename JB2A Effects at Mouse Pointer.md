# Want to rain down effects at the touch of a button?
Dependencies:
 * Sequencer
 * JB2A

## Lightning
This uses the lightningstrike from JB2A and the sound from:
https://freesound.org/people/Turrus/sounds/242048/

```JS
let mouse = canvas.app.renderer.plugins.interaction.mouse;
let local = mouse.getLocalPosition(canvas.app.stage);

new Sequence()
    .effect()
        .atLocation(local)
        .file('modules/JB2A_DnD5e/Library/Generic/Lightning/LightningStrike01_0{{n}}_Regular_Blue_800x800.webm')
        .setMustache({
            "n": () => { return Math.ceil( Math.random()*2) }
        })
        .scale(2.5)
        .randomizeMirrorX()
        .sound("modules/pzzl-1/media/242048__turrus__lightning-strike.mp3")
    .play();
```

## Explosions

JB2A video, sound from:
https://freesound.org/people/Iwiploppenisse/sounds/156031/

```JS
let mouse = canvas.app.renderer.plugins.interaction.mouse;
let local = mouse.getLocalPosition(canvas.app.stage);

let sequence = new Sequence()
sequence.effect()
   .atLocation(local)
   .file("jb2a.explosion.01.orange")
   .sound("modules/pzzl-1/media/156031__iwiploppenisse__explosion.mp3")
   ;

sequence.play();
```
