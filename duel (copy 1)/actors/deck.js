function Decks(cards = []){

    const
        Library = [...cards.keys()],
        Graveyard = [],
        Hand = [],
        Field = [],
        Exil = [],
        methods = {

            shuffle(deck){ deck.sort(() => Math.random() - 0.5) },

            move(from, to, target, n=1){
                let cards;
                to.push(...cards = from.splice(target,n))
                for(const [deck_name, deck_content ]of Object.entries(obj)) {
                    if(from === deck_content) from = deck_name;
                    else if(to === deck_content) to = deck_name;
                }
                if(typeof from === "string" && typeof to === "string" ) return cards.map(x => this.card_data(x).name).join(', ') + ` has been moved from ${from} to ${to}`;
                else return 'something off';
            },

            card_data(key){ return cards[key] && {...cards[key]} }

        },
        
        obj = {
            get library(){ return Library },
            get graveyard(){ return Graveyard },
            get hand(){ return Hand },
            get field(){ return Field },
            get exil(){ return Exil },
            get cards_list(){ return cards },
            ...methods
        }

    return obj
}

module.exports = Decks
