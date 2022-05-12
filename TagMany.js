/*
Tag many things (placeables) at the same time
Select any number of tiles, tokens or walls, run
this macro, type in a tag in its prompt, and
this tag is added to all your selections.
Ps. is dependent on the module "Tagger"
*/

function tagMany( tag ){  
  // Tag background elements  
  Tagger.addTags(canvas.background.controlled, tag);
  // Tag foreground elements
  Tagger.addTags(canvas.foreground.controlled, tag);
  // Tag tokens
  Tagger.addTags(canvas.tokens.controlled, tag);  
  // Tag walls:
  Tagger.addTags(canvas.walls.controlled, tag);
}

let d = new Dialog({
 title: "Set Tag",
 content: "Which Tag<input type='text' id='MacroStateName'/>",
 buttons: {
  ok: {
   icon: '<i class="fas fa-check"></i>',
   label: "OK",
   callback: () => {tagMany(document.getElementById('MacroStateName').value);}
  },
  cancel: {
   icon: '<i class="fas fa-times"></i>',
   label: "Cancel"
  }
 },
 default: "ok"
});
d.render(true);
