const readline = require("readline").createInterface(process.stdin, process.stdout)

function Promptinator(CLI={}){
    readline.question(CLI.question+'\n', res => {
        const [command, ...parameters] = res.split(" ")
        switch (true) {
            
            case !(CLI.do instanceof Function): console.log("do is not a function")
            case (command == CLI.exit):
                readline.close() 
                break;
        
            default:
                Promptinator(CLI.do(command, parameters) || CLI);
                break;
        }
    });
}

module.exports = Promptinator