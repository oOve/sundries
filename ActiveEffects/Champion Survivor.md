# The 5e Fighter Champion level 18 feat: **Survivor**

## Step 1.
Add active effect, and in the duration tab, set the macro repeat to start of turn
![image](https://user-images.githubusercontent.com/8543541/173966909-282e4baf-a922-4f08-94f7-936a3901e79f.png)


## Step 2.
Call macro:
![image](https://user-images.githubusercontent.com/8543541/173966331-23449ede-9d56-4503-8613-275de7c20f14.png)


## Step 3.
Create macro "Survivor Heal", add the following code, and give your players observer rights to it.

```JS
let act = arguments[0]['args'][1]['actor'];
let tok = canvas.tokens.get(arguments[0]['args'][1]['tokenId']);
let hp = act.data.data.attributes.hp.value;
let mx = act.data.data.attributes.hp.max;

if ((hp/mx)<0.5){
   let heal = 5+act.data.data.abilities.con.mod;
   act.update({'data.attributes.hp.value': hp+heal});
   ChatMessage.create({
     speaker: ChatMessage.getSpeaker({token: tok}),
     content: "I'm a survivor, I will survive (regenerated "+heal+" hp)"
});
}
```
