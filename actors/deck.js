function Decks(cards = []){

    const
        Library = cards.keys(),
        Graveyard = [],
        Hand = [],
        Field = [],
        Exil = [],
        methods = {
            shuffle(deck){
                deck.sort(() => Math.random() - 0.5);
            },
            move(from, to, target){
                to.push(...from.splice(target))
            }
        }

    return {
        get library(){ return Library },
        get graveyard(){ return Graveyard },
        get hand(){ return Hand },
        get field(){ return Field },
        get exil(){ return Exil },
        get cards_list(){ return cards },
        ...methods
    }
}

module.exports = Decks
