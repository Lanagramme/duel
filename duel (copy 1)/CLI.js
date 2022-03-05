let
    msg = `welcome to this game!`,
    exit_command = "exit"

module.exports = {

    get question(){return msg},
    get exit(){return exit_command},

    command_list: {
        help(){ console.log(Object.keys(this).filter(name => name != "help")) }
    },

    add_command(name, actions){
        switch (true) {
            case (typeof name === "object"):
                Object.entries(name).forEach(([key, val]) => this.add_command(key, val))
                break;
            
            case (typeof actions === "object"):
                this.command_list[name] = (method, ...parameters) => {
                    return actions[method] && actions[method](...parameters)
                }
                break;
            
            case (typeof actions === "function"):
                this.command_list[name] = actions
                break;
            
            default:
                console.log("cannot add command => ", name,": ", actions)
                break;
        }
    },

    do(command, parameters){
        return this.command_list[command]
            ? this.command_list[command](...parameters)
            :  console.log("Unknow command")
    }
}