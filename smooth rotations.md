# Smooth Rotations using TokenMagic

![ezgif-2-8ac675cfaa](https://user-images.githubusercontent.com/8543541/172260556-1780e0dd-6e82-492a-b77a-61037fb5699c.gif)

Modules in use:
 * [TokenMagic](https://foundryvtt.com/packages/tokenmagic), for the actual rotation
 * [Tagger](https://foundryvtt.com/packages/tagger), for marking and grabbing items to rotate

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
