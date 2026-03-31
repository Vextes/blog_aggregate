import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands";
import { handlerReset } from "./commands/reset";
import { handlerLogin, handlerRegister } from "./commands/users";

async function main() {
    const cmdReg: CommandsRegistry = {};
    registerCommand(cmdReg, "login", handlerLogin);
    registerCommand(cmdReg, "register", handlerRegister)
    registerCommand(cmdReg, "reset", handlerReset)
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log("No arguments provided")
        process.exit(1);
    }

    try {
        await runCommand(cmdReg, args[0], ...args.slice(1));
        process.exit(0);
    } catch (error) {
        console.error(`${error}`)
        process.exit(1);
    }
}

main();