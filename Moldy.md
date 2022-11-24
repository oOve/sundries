# Moldy
Meet Moldy, a circle of the spores druid, or as they would introduce themselves. 

> Hi everyone, we are Moldy, we are very pleased to eat, I mean meet, you fellow biological creatures. 
> (Concentrates hard, and produces something that looks like an arm)
> Let us slap appendages, as we normal biological creatures do.

![download](https://user-images.githubusercontent.com/8543541/203871192-09eba78b-2391-4f9b-8992-57d448a7338f.png)


## Macros:

### Symbiotic Entity:

```JS
// Get my actor
let ac = game.actors.getName('Moldy');

// Get the wild shape "feature"/item
let ws = ac.items.getName('Wild Shape');
// Read out its uses
let wsu = ws.system.uses.value;

// If uses left is zero, shame/exit
if (wsu == 0){
  ui.notifications.warn("Dork, no more wild shape charges!");
  return;
}
ui.notifications.info("Wildshaping into a ferocious spore beast!");
// Update current uses -1
ws.update({'system.uses.value': wsu-1});

// Feature temp hp = druid levels * 4
let temp = ac.classes.druid?.system.levels * 4;
// Is this more than we have?, then apply
if (temp > ac.system.attributes.hp.temp){
  ac.update({'system.attributes.hp.temp':temp});
}

// Change over to "angry token"
const actor = game.user.character;
const token = actor.getActiveTokens()[0];
token.document.update({'texture.src':'moldy.angry.webm'});

// Adding an active effect
ac.createEmbeddedDocuments('ActiveEffect', [{
    "label": "Symbiotic Entity",
    "icon": "icons/commodities/biological/pustules-red.webp",
    "disabled": false,
    "transfer": false,
    "flags":{
      "core": {
        "statusId": "symbiotic"
       }
     },
    "changes":[{
        "key": "system.bonuses.mwak.damage",
        "value": "1d6[necrotic]",
        "mode": 2
    }]
}]);

// Lets grow a bit :)
token.document.update({'texture.scaleX':2, 'texture.scaleY':2} );

```

### Halo of Spores
```JS
// Get my actor
let ac = game.actors.getName('Moldy');

// Are we in symbiotic form?
let form = false;
let formName="Symbiotic Entity";
ac.effects.forEach((el)=>{if(el.label==formName&& !el.disabled)form=true;});

// Do we have one target?
let targets = Array.from(game.user.targets);
if (targets.length!=1){
  ui.notifications.warn("Select a single target!");
  return;
}
let t = targets[0];

// Get our active token (Fails if we don't have one)
let me = ac.getActiveTokens()[0];

// Sequencer effect
if(t){
  new Sequence()
    .effect()
    .file('moldy.spores.webm')
    .atLocation(me)
    .stretchTo(t)
    .randomizeMirrorY()
    .play();
}

// Attack -- These two attacks needs to be created as weapons using the correct scaling in damage as specified in the spores subclass
let nhos = ac.items.getName('Halo of Spores - Normal');
let ehos = ac.items.getName('Halo of Spores - Enhanced');
if (form){
  ehos.use();
}else{
  nhos.use();
}
```

### Fungal Infestation (Create Zombie/flower)
```JS
const summonType = "Zombie";
const actor = game.user.character;
const token = actor.getActiveTokens()[0];

actor.items.getName('Fungal Infestation').use();


// We can control multiple
//canvas.tokens.placeables.filter(t=>t.name==summonType).map(t=>t.id).forEach(t=>warpgate.dismiss(t));


let zombie_names = [
  'sir Rot a lot',
  'Moisty Torso',
  'Jonhy Rotten',
  'De-Kadie',
  'Your Mummy',
  'Braindad'
];


async function preEffect(template, update){
  new Sequence()
    .effect()
      .file('moldy.spores.webm')
      .atLocation(token)
      .stretchTo(template)     
      .play();
}

async function postEffect(template, token) {
  //bring in our protector
  new Sequence()
    .animation()
        .on(token)
            .fadeIn(2000)
    .play()
}

let updates = {
    token : {
        'name':zombie_names[Math.floor(Math.random()*zombie_names.length)],
        'alpha':0
    },
    actor: {
        'name' : `Moldys' Spore ${summonType}`,
        'data.attributes.hp': {value: 1, max: 1}
    }
}
let callbacks = {
    pre: async (template, update) => {
        preEffect(template,update);
        await warpgate.wait(1200);
    },
    post: async (template, token) => {
      postEffect(template,token);
      await warpgate.wait(500);
    }
}

warpgate.spawn(summonType, updates, callbacks);
``` 

### Calm Down
Stop the Wild Shape Symbiotic Entity effect.
```JS
// Get my actor
let ac = game.actors.getName('Moldy');

let formName="Symbiotic Entity";

// Delete the active effect(s) (if any)
ac.deleteEmbeddedDocuments( 'ActiveEffect', ac.effects.filter((el)=>(el.label==formName)).map(el=>el.id));

// Change back to our non-angry texture
ac.getActiveTokens().forEach(t=>t.document.update({'texture.src':'moldy.movie.webm'}));

token.document.update({'texture.scaleX':1, 'texture.scaleY':1} );
```

### Summon Brown Bear
Used if you cast Conjure Animals, then you get two bears.

```JS
const summonType = "Brown Bear";
const actor = game.user.character;
const token = actor.getActiveTokens()[0];

async function preEffect(template, update){
  new Sequence()
    .effect()
      .file('tokenizer/pc-images/moldy.spores.webm')
      .atLocation(token)
      .stretchTo(template)     
      .play();
}

async function postEffect(template, token) {
  //bring in our protector
  new Sequence()
    .animation()
        .on(token)
            .fadeIn(2000)
    .play()
}

let bear_names = [
  'Hairy Barry',
  'Beary Potter',
  'Winnie the Murder',
  'Cheery Tear Bear'
];

let updates = {
    token : {
        'name': bear_names[Math.floor(Math.random()*bear_names.length)],
        'alpha':0
    },
    actor: {
        'name' : `${summonType}`
    }
}
let callbacks = {
    pre: async (template, update) => {
        preEffect(template,update);
        await warpgate.wait(1200);
    },
    post: async (template, token) => {
      postEffect(template,token);
      await warpgate.wait(500);
    }
}

warpgate.spawn(summonType, updates, callbacks);

```


### Grow / Shrink
If you just want to change your size for dramatic effect
```JS
const actor = game.user.character;
const token = actor.getActiveTokens()[0];

let scale = token.document.texture.scaleX;

// For Grow
scale = 1.2*scale;
// For shrink
scale = 0.8*scale;

token.document.update({'texture.scaleX':scale, 'texture.scaleY':scale} );
```
