function Decks(cards){

    const
        Librairy = new Map(),
        Graveyard = new Map(),
        Hand = new Map(),
        Field = new Map(),
        Exil = new Map(),
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
        ...methods
    }
}

module.export = Decks