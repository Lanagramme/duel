let Joueur = require(  "./actors/joueur.js" ) 

let player = new Joueur(2)
console.log("création du joueur")
console.log("Pv du joueur", player.pv)

player.decks.shuffle(player.decks.library)
console.log('library =>', player.decks.library)
