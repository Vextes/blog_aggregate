import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands";
import { handlerLogin } from "./commands/users";

function main() {
    const cmdReg: CommandsRegistry = {};
    registerCommand(cmdReg, "login", handlerLogin);
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log("No arguments provided")
        process.exit(1);
    }

    try {
        runCommand(cmdReg, args[0], ...args.slice(1));
    } catch (error) {
        console.error(`${error}`)
    }
}

main();