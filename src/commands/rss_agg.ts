import { fetchFeed } from "../lib/db/rss";

export async function handlerAggFeed() {
    const tempFeed = "https://www.wagslane.dev/index.xml"
    const rssFeed = await fetchFeed(tempFeed);
    console.log(JSON.stringify(rssFeed, null, 2))
}