const Cards = require("./card")
/* =================================================================== */
// ARBITRE
// ======================================================================
// Entité stoquant les règle et le deroulement du jeu
// ======================================================================

class Arbitre{
    constructor(data){
        this.Game_cards = data.cards.map(card_data => Cards(card_data))
    }

    start_game(){}
    end_game(){}
    
}

module.exports = Arbitre

