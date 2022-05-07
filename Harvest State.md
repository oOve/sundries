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

let collect = ['x', 'y'];
let s = canvas.tokens.controlled;
let harvest = [];
for (let tk of s){
  let h = {"_id": tk.id};
  for (let k of collect){h[k] = tk.data[k];}
  harvest.push(h);
}

let json = JSON.stringify(harvest);
let content = `
if (canvas.scene.id == '${canvas.scene.id}'){
  canvas.scene.updateEmbeddedDocuments('Token', ${json} , {animate:false});
}
`;
console.log(content);

let macro = { 
  command:content, 
  img:'icons/svg/door-open-outline.svg'
}

function createMacro(name){
  if (name!="" && name!=undefined){
     Macro.create({
              "name": "Restore " + name,
              "type": "script",
              "img": macro.img,
              "scope": "global",
              "command": macro.command,
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
