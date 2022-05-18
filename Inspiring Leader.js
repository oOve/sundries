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
A macro for the Inspiring Leader feat.
Iterates through the players and their characters 
and uses warpgate to add temp hp to them.
Macro must be executed by the player with the feat.
*/

 let talker = game.user.character;
 // Talker should be "the player with inspiring leader"
 // Inspiring leader gives the leaders level plus their charisma modifier
 let thp = talker.data.data.details.level + talker.data.data.abilities.cha.mod;
 
 
let missed=[];
for (let u of game.users){
  if(u.character){
    let tks = canvas.tokens.placeables.filter(t=>t.name == u.character.name);
    if (tks.length){
      if(tks[0].actor.data.data.attributes.hp.temp < thp){
        warpgate.mutate(
          tks[0].document, 
          {'actor.data.attributes.hp.temp':thp},
          undefined,
          {'description':'Update to your temp HP'}
        );
      }
    } else {
      missed.push(u.character.name);
    }
  }
}

if (missed.length){
  ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: "Tried to apply temp HP to all, but could not find tokens for: " + missed
  });
}
