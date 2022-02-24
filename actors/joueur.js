let decks = require( "./deck.js" )

let liste_des_cartes = [1,2,3,4]

class Joueur {
	constructor (pv, atk) {
		this.decks = decks(liste_des_cartes)
		this.init_pv = pv
		this._pv = pv
		this._atk = atk
	}

	set pv(pv) {
		// l'arbitre décidera si il est possible d'avoir plus de pv que de init_pv
		this._pv+= pv
		// l'arbitre définit le statut de défaite
	}

	get pv() {
		return this._pv
	}

	piocher(){
		return this.decks.move(this.decks.library, this.decks.hand, this.decks.library.length -1 )
	}

	attaquer(cible, attaquant){
		return this._atk(cible, attaquant)
	}

	sacrifier(origin, target){
		return this.decks.move(origin, target, this.decks.graveyard)
	}

	jouer(carte){
		return this.decks.move(this.decks.hand,  this.decks.field,carte,)
	}
}

module.exports = Joueur 
