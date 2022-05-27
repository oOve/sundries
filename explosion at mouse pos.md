Explosions at the mouse position:

´´´JS
let mouse = canvas.app.renderer.plugins.interaction.mouse;
let local = mouse.getLocalPosition(canvas.app.stage);

let sequence = new Sequence()
sequence.effect()
   .atLocation(local)
   .file("jb2a.explosion.01.orange")
   .sound("modules/pzzl-1/media/156031__iwiploppenisse__explosion.mp3")
   ;

sequence.play();
´´´
