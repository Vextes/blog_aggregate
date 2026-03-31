import { setUser } from "src/config"
import { createUser, getUser, } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("please enter a single username")
    }
    const currUser = args[0];
    const existing = await getUser(currUser);
    if (!existing) {
        throw new Error(`User ${currUser} does not exist`);
    }
    setUser(existing.name);
    console.log(`Current user has been set to ${existing.name}`);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("please enter a single username to register")
    }

    const regUser = args[0];
    const existing = await getUser(regUser);
    if (existing) {
        throw new Error("User has already been registered");
    }
    
    const createdUser = await createUser(regUser);
    const currUser = createdUser.name;
    setUser(currUser);
    console.log(`Current user has been set to ${currUser}`);
}