const classinator = require("./classinator")
const Player = require("./actors/joueur")

function Games(){
    
    const
        Item = this,
        // Class data
        Count = {},
        Attackers = [],
        Targets = [],
        Players = [],

        // Class structure (Je n'ai pas trouvé mieux)
        getters = {
            get turn() { return Count.turn },
            get players_list() { return Players },
            get current_player() { return (Players[Count.turn%Players.length]) },
            get global_turn() { return Players[Count.turn/(Players.length||1)] },
        },

        Setters = {},

        Methods = {
            new_player() { Players.push(new Player(20)) },
            start(CLI = false) {
                Count.turn = 0;
                if(CLI){
                    const interface = require('./CLI')
                    
                    Object.entries(Complex_command).forEach( ([key, val]) => interface.add_command(key, val) )
                    
                    require("./prompt")(interface)
                }
            }
        },

        Complex_command = {
            show: {
                players(){ return Item.players_list },
                current_player(){ return Item.current_player },
                game(){ return Item },
                hand(){ return Item.current_player
                    ? Item.current_player.decks.hand.map((x, i) => [i+1, Item.current_player.decks.card_data(x).name ])
                    : "no player selected"
                 },
                field(){
                    return 
                        Item.players_list.map((player,i) => [`Player${i+1} field =>`, ...player.decks.field.map((x, j) => [`${i+1}-${j+1}`, Item.current_player.decks.card_data(x).name])])
                     
                },
                gy(){
                    return 
                        Item.players_list.map((player,i) => [`Player${i+1} graveyard =>`, ...player.decks.graveyard.map((x, j) => [`${i+1}-${j+1}`, Item.current_player.decks.card_data(x).name])])
                     
                },
                // command: Object.keys(Methods).filter(x => x != "start").concat(["show"])
            },

            .../* player: */ {
                draw(){
                    return Item.current_player.draw()
                },
                shuffle(){
                    return Item.current_player.decks.shuffle(Item.current_player.decks.library)
                },
                play(card_key=1){
                    return (card_key > 0 || card_key === undefined)
                        ? Item.current_player.play(card_key-1)
                        : "you can't choose a number under 1"
                    
                },
                kill(card_key=1){
                    return (card_key > 0 || card_key === undefined)
                        ? Item.current_player.kill('field', card_key-1)
                        : "you can't choose a number under 1"
                    
                },
                sacrifice(card_key=1){
                    return (card_key > 0 || card_key === undefined)
                        ? Item.current_player.kill('hand', card_key-1)
                        : "you can't choose a number under 1"
                    
                },
                revive(card_key=1){
                    return (card_key > 0 || card_key === undefined)
                        ? Item.current_player.unkill('field', card_key-1)
                        : "you can't choose a number under 1"
                    
                },
                reborn(card_key=1){
                    return (card_key > 0 || card_key === undefined)
                        ? Item.current_player.unkill('hand', card_key-1)
                        : "you can't choose a number under 1"
                    
                },
                end(){
                    Count.turn++;
                    return "end of turn"
                },
                attack(a_key=1, ...ti){

                    return Item.current_player.attack(
                            a_key-1, // key of the attacking card
                            Item.players_list[(ti[0]||1)-1], // key of the attacked player
                            (ti[1]||1) // key of the attacked card
                        );
                    
                }
            },

            init(p=2, hp=20){
                Players.length = 0
                for (let i = 0; i < p; i++) {
                    Methods.new_player(hp)
                    Players[i].decks.shuffle(Players[i].decks.library)
                    Players[i].draw(4)

                }
                return Players.map((player,i) => [`Player${i+1} hand =>`, player.decks.hand.map(x => player.decks.card_data(x).name)])
            },

            ...Methods,

            start: undefined
        }
    // Pseudo constructor
    classinator(
        this,
        {
            sources: [
                getters,
                Setters],
            methods: Methods
        }
    )


}

const my_game = new Games()
my_game.start(true)