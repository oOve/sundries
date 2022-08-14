# Foundry NPC Export
Ever wanted to publish your monsters created in Foundry on gmbinder, or just as a picture. Here is a macro that exports a Foundry NPC to a format readable by 
http://tetra-cube.com/dnd/dnd-statblock.html
From there you can export either as a stat block image, or as markdown readable by gmbinder and homebrewery. If you improve this macro, please share its improvements with me :)
Here is an example export:
![aspect of lamia (5)](https://user-images.githubusercontent.com/8543541/184555525-cf1f8019-ea6c-418e-ad85-8e2de4b21f19.png)


## Useage:
Select a token, run the following macro. The json is now automatically placed in your clipboard, open an empty file, paste this json to it and save it as something.monster. You can now open this monster on 
http://tetra-cube.com/dnd/dnd-statblock.html

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

let a = _token.actor;
let d = a.data.data;
console.log(a);

let size_map = {
	tiny:'tiny',
	sm:'small',
	med:"medium", 
	lg:'large', 
	huge:'huge', 
	grg:"gargantuan"
};
let skill_map = {
	acr:'acrobatics',
	ani:'animal handling',
	arc:'arcana',
	ath:'athletics',
	dec:'deception',
	his:'history',
	ins:'insight',
	itm:'intimidation',
	inv:'investigation',
	med:'medicine',
	nat:'nature',
	prc:'perception',
	prf:'performance',
	per:'persuasion',
	rel:'religion',
	slt:'sleight of hand',
	ste:'stealth',
	sur:'survival'
};


let tetra = {};
tetra.name      = a.name;
tetra.size      = size_map[ d.traits.size ];
tetra.type      = d.details.type.value;
tetra.tag       = d.details.type.subtype;
tetra.alignment = d.details.alignment;
tetra.cr        = d.details.cr;

tetra.strPoints = d.abilities.str.value;
tetra.dexPoints = d.abilities.dex.value;
tetra.conPoints = d.abilities.con.value;
tetra.intPoints = d.abilities.int.value;
tetra.wisPoints = d.abilities.wis.value;
tetra.chaPoints = d.abilities.cha.value;

dmgt = [];
for (i of d.traits.di.value){
 dmgt.push({name:i, "note":" (Immune)", "type":"i"})
}
for (r of d.traits.dr.value){
 dmgt.push({name:r, "note":" (Resistant)", "type":"r"})
}
for (v of d.traits.dv.value){
 dmgt.push({name:v, "note":" (Vulnerable)", "type":"v"})
}
tetra.damagetypes = dmgt;

cond = [];
for (c of d.traits.ci.value){cond.push({'name':c});}
tetra.conditions = cond;

tetra.damage=[];
tetra.specialdamage=[];

tetra.armorName = "other";
tetra.otherArmorDesc = ''+d.attributes.ac.value;

let m = d.attributes.movement;
tetra.speed        = m.walk;
tetra.burrowSpeed  = m.burrow;
tetra.climbSpeed   = m.climb;
tetra.flySpeed     = m.fly;
tetra.swimSpeed    = m.swim;
tetra.hover        = m.hover;

tetra.skills = [];
for (k of Object.keys(d.skills)){
  if (d.skills[k].value===1){
    tetra.skills.push(
     {name:skill_map[k], 
      stat:d.skills[k].ability});
  }
}


tetra.customHP= true;
tetra.hpText  = d.attributes.hp.max;

tetra.languages = d.traits.languages.value.map(l=>{return {name:l,speaks:true}});

tetra.isLegendary = d.resources.legact.max > 0;
tetra.legendariesDescription = "This creature has "+d.resources.legact.max+" legendary actions per round";
tetra.legendaries = [];
for (let it of a.data.items.filter(t=>t.data.data.activation.type=='legendary')){
  let name = it.name;
  let desc = '**'+it.data.data.activation.cost + '**';
  desc = desc + it.data.data.description.value;
  desc = desc.replaceAll('<p>','').replaceAll('</p>','');  
  tetra.legendaries.push({name:name, desc:desc});
}

tetra.abilities = [];
for (let it of a.data.items.filter(t=>(t.data.data.activation.type!='action'&&t.data.data.activation.type!='legendary'))){
  let name = it.name;
  let desc = it.data.data.description.value;
  desc = desc.replaceAll('<p>','').replaceAll('</p>','');  
  tetra.abilities.push({name:name, desc:desc});
}


let act = [];
for (let it of a.data.items.filter(t=>t.data.data.activation.type=='action')){
  let name = it.name;
  let desc = it.data.data.description.value;
  desc = desc.replaceAll('<p>','').replaceAll('</p>','');  
  act.push({name:name, desc:desc});
}
tetra.actions = act;

let json = JSON.stringify(tetra);
console.log("Wrote to clipboard: ", json);
navigator.clipboard.writeText(json);
```
