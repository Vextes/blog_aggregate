import { readConfig } from "../config";
import { createFeed } from "../lib/db/queries/feeds"
import { getUser } from "../lib/db/queries/users"
import { Feed, User } from "../lib/db/schema";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`ERROR: usage - ${cmdName} <feed name> <feed url>`)
    }

    const config = readConfig();
    const curr_user = await getUser(config.currentUserName);
    if (!curr_user) {
        throw new Error(`User ${config.currentUserName} not found`)
    }

    const curr_user_id = curr_user.id;
    const feedName = args[0];
    const feedUrl = args[1];

    createFeed(feedName, feedUrl, curr_user_id);
}

function printFeed(feed: Feed, user: User) {
    console.log(`-feed id: ${feed.id}`)
    console.log(`-feed name: ${feed.name}`)
    console.log(`-feed url: ${feed.url}`)
    console.log(`-feed createdAt: ${feed.createdAt}`)
    console.log(`-feed updatedAt: ${feed.updatedAt}`)
}