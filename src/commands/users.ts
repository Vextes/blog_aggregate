import { setUser } from "src/config"

export function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("please enter a single username")
    }
    const currUser = args[0];
    setUser(currUser);
    console.log(`Current user has been set to ${currUser}`);
}