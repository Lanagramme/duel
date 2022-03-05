const readline = require("readline").createInterface(process.stdin, process.stdout)
let Joueur = require(  "./actors/joueur.js" )
let sp = 1
const players = {
    1: new Joueur(2),
    2: new Joueur(2),
}
function cards_data(key) {
    return players[sp].decks.card_data(key)
}
const show = {
    
    card(card){
        console.log(
            `${card.name}:`,
            "\n     power =>", card.power,
            "\n     health =>",card.health
        )
    },

    graveyard(){
        console.log(
            "graveyard:",
            "\n     cards index =>", players[sp].decks.graveyard,
            "\n     cards data =>",players[sp].decks.graveyard.map(cards_data)
        )
    },

    field(){
        console.log(
            "field:",
            "\n     cards index =>", players[sp].decks.field,
            "\n     cards data =>",players[sp].decks.field.map(cards_data)
        )
    },

    hand(){
        console.log(
            "hand:",
            "\n     cards index =>", players[sp].decks.hand,
            "\n     cards data =>",players[sp].decks.hand.map(cards_data)
        )
    },

    library(){
        console.log(
            "library:",
            "\n     cards index =>", players[sp].decks.library,
            "\n     cards data =>",players[sp].decks.library.map(cards_data)
        )
    },

    state() {
        console.log("Pv du joueur", players[sp].pv)
        this.library()
        this.hand()
        this.field()
        this.graveyard()
    },
    

}
const actions = {
    change(){
        sp++
        !players[sp] && (sp = 1)
    },

    shuffle(){
        players[sp].decks.shuffle(players[sp].decks.library)
        show.library()
    },

    draw(n=1){
        for( let i = 0; i<n; i++) players[sp].draw();
        show.library()
        show.hand()
    },

    play(n){
        players[sp].play(n)
        show.hand()
        show.field()
    },

    kill(){
        players[sp].kill("field")
        show.field()
        show.graveyard()
    },

    sacrifice(n){
        players[sp].kill("hand")
        show.hand()
        show.graveyard()
    },

    attaque(ai=0,ti=0){
        const attaquant = players[sp].decks.card_data(players[sp].decks.field[ai])
        const target = players[sp+1]
            ? players[sp+1].decks.card_data(players[sp+1].decks.field[ti])
            : players[1].decks.card_data(players[1].decks.field[ti])
        
        switch (true) {
            case !!(target && attaquant):
                console.log(attaquant.name,"deal",target.defense(attaquant.attack()), " damage to ", target.name);
                show.card(target)
                break;
        
            case !!attaquant:
                console.log(attaquant.name,"missed his attack")
                break;
        
            default:
                console.log("you can't launch an attack without cards on the fields ")
                break;
        }
    },

    show(name){
        console.log("show =>", name)
        show[name] && show[name]()
    }

}

function new_action(){
    readline.question(`Player${sp}:\n`, res => {
        const [command, ...rest] = res.split(" ")
        console.log(command, rest)
        if(command == "exit") {
            readline.close()
        } else {
            (actions[command] || function(){console.log("you tapped",res)})(...rest)
            new_action();
        };
    });
}

new_action()

