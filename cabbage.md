# Charles "Yaphit" Cabbage the Plasmoid 

Meet "Yaphit" the plasmoid artificer.

![download - 2022-09-28T192236 232](https://user-images.githubusercontent.com/8543541/193375565-dc525180-45ca-40eb-9af1-0514e7716bd4.png)

He has a fancy animated token:

[cabbage_anim.webm](https://user-images.githubusercontent.com/8543541/193375708-0ca3368d-6ca3-4a7e-805b-4495b8922eb2.webm)

And he quite frequently "summons" his guarding "cannon", though flavored as him splitting out a small part of himself:

[shield_anim.webm](https://user-images.githubusercontent.com/8543541/193375763-1663fa6b-3786-4901-aebf-96ebc8a13a04.webm)

The protector/shield is small, but it has an aura that stretches out 10'. That would correspond to a token "scale" of 6, but the slider doesn't go further than 3. This macro will set the prototypes scale to 6 anyway:
```JS
game.actors.getName('Cabbage Shield').update( {'token.scale':6} )
```


## Spawning a Shield Protector
Requires:
  * Warpgate
  * Sequencer

```JS
const summonType = "Cabbage Shield";

// Delete old copies of this protector
canvas.scene.deleteEmbeddedDocuments("Token", canvas.tokens.placeables.filter(t=>t.name==summonType).map(t=>t.id) );

async function preEffect(template, update){
  new Sequence()
    .effect()
      .file('cabbage/gloop2.webm')
      .atLocation(template)
      .center()      
        .scale(0.25)
      .play();
}

async function postEffect(template, token) {
  //bring in our protector
  new Sequence()
    .animation()
        .on(token)
            .fadeIn(1000)
    .play()
}


let updates = {
    token : {
        'name':`${summonType}`,
        'alpha':0
    },
    actor: {
        'name' : `${summonType}`,
        'data.attributes.hp': {value: 25, max: 25}
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

## Activating the Shield Guardian
```JS
let actor = game.user.character;
let shields = canvas.tokens.placeables.filter(t=> t.name==='Cabbage Shield');
if (shields.length < 1){ 
  ui.notifications.warn("No protector!"); 
  return;
}
if (shields.length > 1){
  ui.notifications.warn("More than one protector!"); 
  return;
}
let shield = shields[0];
let r = new Roll('1d8+@intMod', {'intMod':actor.data.data.abilities.int.mod});

await r.evaluate();
r.toMessage( {'flavor':'Protector rolling for temp hp'} );
let temp_hp = r.total;

let tokens_affected = canvas.tokens.placeables.filter( t=>(canvas.grid.measureDistance(shield.center, t.center) < 14) );

console.log("Temp HP rolled:", temp_hp);
console.log("Updating:", tokens_affected);


for (let t of tokens_affected){
  let up = {'actor.data.attributes.hp.temp':temp_hp};
  if (temp_hp > t.actor.data.data.attributes.hp.temp){    
     warpgate.mutate(t.document, up, undefined, {description:'Cabbages Protector is granting you '+temp_hp+' temp HP'});
  }
}
```
