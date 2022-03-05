function Cards(card_data){

    return {
        get name(){ return card_data.name },
        get power(){ return card_data.power },
        get health(){ return card_data.health },
        // get field(){ return card_data.Field },
        // get exil(){ return card_data.Exil },
        attack(){
            const balance = Math.trunc(this.power/2)
            return (this.power - balance) + Math.floor(balance * Math.random())
        },
        defense(n=0, callback) {
            card_data.health-= n
            callback(card_data)
            return n
        }
    }
}

module.exports = Cards