# Moldy
Meet Moldy, a circle of the spores druid.





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
token.document.update({'texture.src':'tokenizer/pc-images/moldy.angry.webm'});

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


