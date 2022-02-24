const joueur = require(./joueur.js)

class Arbitre{
 constructor(){
	 this.joueurs = [
		 new joueur(this.attaque_carte, this.joueurs.lenth-1), 
		 new joueur(this.attaque_carte, this.joueurs.lenth-1)
	 ]
	 this.trample = false
	 this.counter = false
 }

	attaque_carte(origin, origin_index, target, target_index, counter = false){
		let attaque = this.joueurs[origin].hand[origin_index].atk
		let defense = this.joueurs[target].hand[target_index].atk
		let degats  = attaque - defense

		if (counter == false) counter = this.counter

		this.joueur[target].hand[target_index].pv = -degats
		if (attaque > defense && this.trample) 
			this.joueurs[target].pv= -(attaque-defense)
		if (counter) 
			this.attaquer_carte(target, target_index, origin, origin_index, 0)
	}
}

module.exports = Arbitre

