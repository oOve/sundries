# The Aura Creating Item
![ezgif-2-27364f47e1](https://user-images.githubusercontent.com/8543541/166172021-469372ca-ee34-41f5-8088-351c5b327439.gif)

## Major steps:
1. Creating an item
1. Creating the effect, duration and aura for the item
1. Modifying Midi-Qol settings to apply effect automatically
1. Creating the visual aspect of the aura, using JB2A and Automated Animations

## Modules needed
 * Dynamic effects using Active Effects
 * MIDI Qol – For applying the aura directly from item usage
 * JB2A - Jules and Ben’s Animated Assets - Free Content – Only necessary if you wish to include the fancy animated visible aura
 * Automated Animations – Tied in with JB2A
 * Active-Auras – The main enabling module for auras
 * Times up – If you wish your aura to time out in rounds rather than real time seconds


## 1 ― Creating the item
![image](https://user-images.githubusercontent.com/8543541/166172066-33a44081-315f-406c-aca2-9650c89e2db6.png)
Create Item →
* **Name**: AC Aura Trinket
* **Type**: Consumable

**Details Tab** --
Here I’ve set up this “trinket/potion” to cost a Bonus Action to activate, and it has one out of one uses, that will refresh on a short rest.

![image](https://user-images.githubusercontent.com/8543541/166172151-3f24e7dc-7dea-4bd9-8f5e-bf53495a841d.png)


## 2 ― Setting up its Active Effect
In the item above, select the Effects tab. Add a Temporary Effect (1), and click edit (2) effect.

![image](https://user-images.githubusercontent.com/8543541/166172220-c18a5d63-f9b7-4514-8dfb-8c360c6ea548.png)


**Details Tab** – Name your effect, select an icon and make sure the checkboxes are as follows. Also, fill in something in the “Force display on token” field.

![image](https://user-images.githubusercontent.com/8543541/166172255-acfc8db2-b87e-4d3c-bcd5-97833bc7764e.png)

**Duration Tab** – Select effect duration in rounds, unless you have the “Times-Up” this setting will not do anything

![image](https://user-images.githubusercontent.com/8543541/166172340-09279d7d-5e30-4551-b270-13e77ba808be.png)

**Effects Tab** – This is the actual inner workings of what effect this aura has. In this example we simply add 10 to AC.

![image](https://user-images.githubusercontent.com/8543541/166172348-310e8b26-b0e2-4911-880e-f66b00db14bc.png)

**Auras Tab** – Enable aura, select the aura radius (in feet if that is your system setup). Applying the active effect icon to affected tokens will give your players good feedback on whether they are within or outside the aura.
![image](https://user-images.githubusercontent.com/8543541/166172353-f29c8c7f-0c23-48c2-a0ea-2bd51d048d59.png)


## 3 ― MIDI Qol
In order to apply the aura-effect automatically when using the item this setting needs to be set:
Midi-Qol Configuration → Workflow → Specials →Apply item effects to targets → Apply effects do not show button

![image](https://user-images.githubusercontent.com/8543541/166172388-c4b17db3-0c13-4c0e-a13b-355c7b3582bd.png)


## 4 ― Animated Aura
Setting up the visual aspect of the aura is done using Automated Animations. You need to enter the settings under Module Settings → Configure Automatic Recognition

![image](https://user-images.githubusercontent.com/8543541/166172405-8d160a4a-9264-4a3f-a221-f2707bf5e66a.png)


Under the Aura tab add a new rule (+). The name for this rule should match your item name.
Select your animation from JB2A and set its “Radius” (I think this should rather be diameter). When done click submit and close in the bottom part of this dialog.

![image](https://user-images.githubusercontent.com/8543541/166172413-29773618-197d-4a30-90c7-64a8c02cbdd9.png)


