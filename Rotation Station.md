# Rotating Mirrors or Lasers Using Monks Active Tiles

In this tutorial I will show how to achieve the following effect using the following modules:
 * Monks Active Tiles
 * Pushable Tokens
 * Lasers and Mirrors

All image assets in this tutorial come from the wonderful library of [Forgotten Adventures](https://www.forgotten-adventures.net/)

![ezgif-4-bb2cef10b0](https://user-images.githubusercontent.com/8543541/167701344-d87a165e-e916-4721-bac9-521a5e86ee7f.gif)




## Step 1 – Rotate those tokens
Create two tiles, using a suitable icon. These two tiles will be hidden from the players, so the image is not very important.
Edit the triggers of these tiles:
 * When: Manually Activate
 * Action: Alter 
   * Entity: Tokens within Tile
   * Attribute: rotation
   * Value: + 10  (notice that there must be a whitespace between the + and the 10).

Make sure that one of these two tiles has a value of + 10, and the other - 10. 

![image](https://user-images.githubusercontent.com/8543541/167701292-aebbac72-5b8c-4f56-a276-5445a26a5d8b.png)





## Step 2 – Trigger the rotation
Create two more tiles, one lever to rotate clockwise, and another to rotate counter-clockwise. 
For these tiles edit triggers:
 * When: On Click
 * Select the “hoverover” pointer to give a visual indication that these are clickable tiles.
 * Action:
    * Alter: Rotate the background tiles
    * Trigger: The tile(s) we created in step 1

After both these levers are created you can now drag the tiles from step 1 on top of each other.

![image](https://user-images.githubusercontent.com/8543541/167702297-5bf037b3-8b68-469a-a0ee-c2f6fde7a85d.png)




