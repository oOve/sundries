# SMITE!!
(System dnd5e)

Playing a paladin, enjoying those smites?

This macro will show the following dialog box:
![Skjermbilde 2022-09-21 020057](https://user-images.githubusercontent.com/8543541/191385708-e49474b9-3ab3-426d-914a-3132bd47f93a.png)

The radio boxes for spell slot level will be greyed out based on your characters current spell slots. And this macro will roll that lovely SMITE damage, and deduct the chosen spell slot from the character.

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
 Macro by Dr.O_o
 https://github.com/oOve/sundries
 */

const myContent = `
  Slot: <input type="radio" name="slot" checked id="slot1" value="1"/>
        <label for="slot1">1</label>
        <input type="radio" name="slot" id="slot2" value="2"/>
        <label for="slot2">2</label>
        <input type="radio" name="slot" id="slot3"/>
        <label for="slot3">3</label>
        <input type="radio" name="slot" id="slot4"/>
        <label for="slot4">4</label>
        <input type="radio" name="slot" id="slot5"/>
        <label for="slot5">5</label>
    <br>
    <input type="checkbox" id="fiend"/>
    <label for="fiend">Fiend or Undead?</label>
    <br>
    <input type="checkbox" id="crit"/>
    <label for="crit">Crit!</label>
`;

new Dialog({
  title: "Smite!!",
  content: myContent,
  render: (html) => {onRender(html);},
  buttons: {
    button1: {
      label: "Smite!",
      callback: (html) => SMITE(html),
      icon: `<i class="fas fa-check"></i>`
    }
  }
}).render(true);


function onRender(html){
  let c = game.user.character;
  if(c === null){
    ui.notifications.info("No character bound to this player!");
    return false;
  }

  if (c.system.spells.spell1.value===0){
    html.find("input#slot1").attr("disabled", true);
    html.find("input#slot1").attr("checked", false);
  }
  if (c.system.spells.spell2.value===0){
    html.find("input#slot2").attr("disabled", true);
    html.find("input#slot2").attr("checked", false);
  }
  if (c.system.spells.spell3.value===0){
    html.find("input#slot3").attr("disabled", true);
    html.find("input#slot3").attr("checked", false);
  }
  if (c.system.spells.spell4.value===0){
    html.find("input#slot4").attr("disabled", true);
    html.find("input#slot4").attr("checked", false);
  }
  if (c.system.spells.spell5.value===0){
    html.find("input#slot5").attr("disabled", true);
    html.find("input#slot5").attr("checked", false);
  }
  

}

function SMITE(html) {  
  const value = html.find('input[name="slot"]:checked').val();
  console.log("Value:", value);
  if (value===undefined){
    ui.notifications.info("No slot selected");
    return;
  }
  let crit = html.find("input#crit:checked").val() == 'on';
  let fiend= html.find("input#fiend:checked").val() == 'on';

  let dice = (Math.min(value, 4) + 1 + fiend) * (crit?2:1);
  let roll = new Roll(''+dice+'d8[radiant]');
  
  let msg = roll.toMessage({
     speaker: game.user.character.token,
     content: "SMITE!",
     flavor: "Smite Damage Roll (Radiant)",
     rollMode: 'roll'
  });

  
 let c = game.user.character;
 let new_slots = c.system.spells['spell'+value].value - 1;
 let s = 'system.spells.spell'+value+'.value';
 let d = {};
 d[s] = new_slots;
 console.log(d);
 c.update(d);
}


```
