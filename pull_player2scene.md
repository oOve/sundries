Want a GM macro to send a named player to a named scene
```JS
game.socket.emit("pullToScene", game.scenes.getName('scene_name').id, game.users.getName("player_name").id)
```
