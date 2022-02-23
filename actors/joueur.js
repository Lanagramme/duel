require( "./deck.js" )

let liste_des_cartes = [1,2,3,4]

class Joueur {
	constructor (pv) {
		this.decks = decks(liste_des_cartes)
		this.init_pv = pv
		this.pv = pv
	}

	set pv(pv) {
		// l'arbitre décidera si il est possible d'avoir plus de pv que de init_pv
		this.pv+= pv
		// l'arbitre définit le statut de défaite
	}

	piocher(){
		return this.decks.move(this.decks.Library, this.library.length,this.decks.Hand)
	}

	attaquer(cible, attaquant){}

	sacrifier(origin, target){
		return this.decks.move(origin, target, this.decks.Graveyard)
	}

	jouer(carte){
		return this.decks.move(this.decks.Hand, carte, this.decks.Field)
	}
}

module.exports = Joueur 
