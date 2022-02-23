function Decks(cards){

    const
        // Librairy = new Map(cards),
        // Graveyard = new Map(),
        // Hand = new Map(),
        // Field = new Map(),
        // Exil = new Map(),
        Librairy = cards,
        Graveyard = [],
        Hand = [],
        Field = [],
        Exil = [],
        methods = {
            shuffle(deck){
                deck.sort(() => Math.random() - 0.5);
            },
            moveto(from, to, target){
                to.push(from.splice(target))
            }
        }

    return {
        get librairy(){ return Librairy },
        get graveyard(){ return Graveyard },
        get hand(){ return Hand },
        get field(){ return Field },
        get exil(){ return Exil },
        get cards_list(){ return cards },
        ...methods
    }
}

module.export = Decks