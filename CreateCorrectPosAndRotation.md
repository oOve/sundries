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
 */

let s = canvas.tokens.controlled;
let harvest = s.map(t=>{return {x:t.x, y:t.y, r:t.data.rotation}});
let ids = s.map(t=>t.id);

let content = `
if (canvas.scene.id == '${canvas.scene.id}'){
  let positions = ${JSON.stringify(harvest)};
  let ids = ${JSON.stringify(ids)};
  let found = ids.map(t=>false);
  for (let id of ids){
    let tk = canvas.tokens.get(id);
    let i = 0;
    for (let p of positions){
      if (p.x==tk.x && p.y==tk.y && p.r==tk.data.rotation){
        found[i]=true;
        break;
      }
      ++i;
    }
  }
  return found.every(v=>v);
}else{return false;}
`;
console.log(content);


function createMacro(name){
  if (name!="" && name!=undefined){
     Macro.create({
              "name": "Test Against State " + name,
              "type": "script",
              "img": 'icons/svg/daze.svg',
              "scope": "global",
              "command": content,
              "sort": 0,
              "permission": {
                  "default": 0
              }
            });
  }
}

let d = new Dialog({
 title: "State Name",
 content: "Name your state<input type='text' id='MacroStateName'/>",
 buttons: {
  ok: {
   icon: '<i class="fas fa-check"></i>',
   label: "OK",
   callback: () => {createMacro(document.getElementById('MacroStateName').value);}
  },
  cancel: {
   icon: '<i class="fas fa-times"></i>',
   label: "Cancel"
  }
 },
 default: "ok"
});
d.render(true);

```
