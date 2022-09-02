# Smooth Rotations using TokenMagic

![ezgif-2-8ac675cfaa](https://user-images.githubusercontent.com/8543541/172260556-1780e0dd-6e82-492a-b77a-61037fb5699c.gif)

Modules in use:
 * [TokenMagic](https://foundryvtt.com/packages/tokenmagic), for the actual rotation
 * [Tagger](https://foundryvtt.com/packages/tagger), for marking and grabbing items to rotate

Using Tagger, tag all the things you wish to rotate with "cog". Then execute the following macro.
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
This macro is made by Dr.O_o 
If you appreciate this, consider buying me a coffee
at https://www.patreon.com/drO_o
*/
let p1 = [{
        filterType: "transform",
        filterId: "rotateIt1",
        autoDestroy: true,
        padding: 1,
        pivotX: 0.5,
        pivotY: 0.5,
        animated:
        {
            rotation:
            {
                animType: "rotation",
                active:true,
                val1: 0,
                val2: +360,
                clockWise: false,
                loopDuration: 10000,
            }
        }
    }];
let p2 = [{
        filterType: "transform",
        filterId: "rotateIt2",
        autoDestroy: true,
        padding: 1,
        pivotX: 0.5,
        pivotY: 0.5,
        animated:
        {
            rotation:
            {
                animType: "rotation",
                active: true,
                val1: 0,
                val2: 360,
                clockWise : true,    
                loopDuration: 10000,
            }
        }
    }];
let p3 = [{
        filterType: "transform",
        filterId: "rotateIt3",
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
                loopDuration: 20000,
            }
        }
    }];
let p4 = [{
        filterType: "transform",
        filterId: "rotateIt4",
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
                val2: 360,
                clockWise: true,
                loopDuration: 20000,
            }
        }
    }];


let params = [p1,p2,p3,p4];

for (let t of Tagger.getByTag("cog")){
  await TokenMagic.deleteFilters(t.object);
  TokenMagic.addUpdateFilters(t.object, params[Math.floor(Math.random()*4)]);
}
```
