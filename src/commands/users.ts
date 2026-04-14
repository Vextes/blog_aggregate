import { read } from "node:fs";
import { readConfig, setUser } from "../config"
import { createUser, getUser, getUsers } from "../lib/db/queries/users";

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

export async function handlerListAllUsers(cmdName: string) {
    const userList = await getUsers();
    
    for (const user of userList) {
        if (readConfig().currentUserName === user.name) {
            console.log(` * ${user.name} (current)`);
        } else {
            console.log(` * ${user.name}`);
        }
    }
}