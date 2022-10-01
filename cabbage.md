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
