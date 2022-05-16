// This macro lets you set a reduced vision for each players token.
// This could be due to magical darkness, blizzard, sandstorm or other.
// For players with tremorsense, blindsigth or other, just set the 
// reduced vision as the same as their sense.
// In order to restore vision to all the tokens, this dataset below needs
// the players default dim and brightvision as well.

let vision = {
  "player 1" : {dim:60, bright: 15, reduced: 10},
  "player 2" : {dim:60, bright: 15, reduced: 10},
  "player 3" : {dim:60, bright: 5, reduced: 60},
  "Bastien Rousseau" : {dim:60, bright: 5, reduced: 5},
}

let undo = document.UndoVisionNow;
document.UndoVisionNow = !undo;
if (undo)ui.notifications.info("Re-setting vision back to normal");
else ui.notifications.info("Applying reduced vision!");

for (let pn of Object.keys(vision)){
  let tks = canvas.tokens.placeables.filter( t=>t.name==pn);
  if (tks.length==0){
    ui.notifications.error("No tokens for '"+pn+"' found!");
  } else {
    for (let tk of tks){
      let o = vision[pn];
      if (undo){
        tk.document.update( {brightSight: o.bright, dimSight: o.dim});
      }else{
        let v=o.reduced;
        tk.document.update( {brightSight: v, dimSight: v});
      }
    }
  }
}
