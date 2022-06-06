# Smooth Rotations using TokenFX

Modules in use:
 * TokenFX, for the actual rotation
 * Tagger, for marking and grabbing items to rotate

Using Tagger, tag all the things you wish to rotate with "cog". Then execute the following macro.
```JS
let params =
    [{
        filterType: "transform",
        filterId: "savingRoll",
        autoDestroy: true,
        padding: 1,
        pivotX: 0.5,
        pivotY: 0.5,
        animated:
        {
            rotation:
            {
                animType: "rotation",
                val1: 0,
                val2: +360,                
                loopDuration: 10000,
            }
        }
    }];

for (let t of Tagger.getByTag("cog")){
  TokenMagic.addUpdateFilters(t.object, params);
}
```
