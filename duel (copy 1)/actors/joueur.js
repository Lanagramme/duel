let decks = require( "./deck.js" )
let cards = require( "./card.js" )

let liste_des_cartes = [
	{ name: "Freezing fighting fighter", 	power: 60, health: 45 },
	{ name: "Burning fighting fighter", 	power: 90, health: 15 },
	{ name: "Stunning fighting fighter", 	power: 35, health: 70 },
	{ name: "Freezing officing officer", 	power: 40, health: 65 },
	{ name: "Burning officing officer", 	power: 60, health: 45 },
	{ name: "Stunning officing officer", 	power: 25, health: 80 },
	{ name: "Freezing teaching teacher", 	power: 20, health: 85 },
	{ name: "Burning teaching teacher", 	power: 30, health: 75 },
	{ name: "Stunning teaching teacher", 	power: 10, health: 95 },
]

function fight_rules(player, card_key){
	return ({health, name}) => {
		if(health > 0) {
			console.log( name, "has", health, "health left" )
		} else {
			player.kill('field', card_key)
			console.log( name, "has been killed" )
		}
	}
}

class Player {
	constructor (pv) {
		this.decks = decks(liste_des_cartes.map(card => cards(card)))
		this.init_pv = pv
		this._pv = pv
	}

	set pv(pv) {
		// l'arbitre décidera si il est possible d'avoir plus de pv que de init_pv
		this._pv+= pv
		// l'arbitre définit le statut de défaite
	}

	get pv() {
		return this._pv
	}

	draw(n=1){
		return this.decks.move(this.decks.library, this.decks.hand, this.decks.library.length -n, n )
	}

	attack(card_key, target){
		let source = this.decks.card_data(this.decks.field[card_key])
		switch (true) {
			case !!(source && target):
				return [source.name,"deal",target.defense(source.attack(), fight_rules(this, card_key)), "damage to", target.name].join(" ")
				
		
			case !!source:
				return [source.name," missed his attack"].join(" ")
				
		
			default:
				return "you can't launch an attack without selecting a card"
		}
	}

	kill(origin, target){
		return this.decks.move(this.decks[origin], this.decks.graveyard, target)
	}

	unkill(origin, target){
		return this.decks.move(this.decks.graveyard, this.decks[origin], target)
	}

	play(carte){
		return this.decks.move(this.decks.hand, this.decks.field, carte)
	}
}

module.exports = Player 
