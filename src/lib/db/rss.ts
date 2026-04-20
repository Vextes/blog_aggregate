import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
    const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator"
        }
    });
    if (!response.ok) {
        throw new Error(`error fetching rss feed`)
    }
    const xml = await response.text();

    const options = {
        processEntities: false
    }
    const parser = new XMLParser(options);
    const parsedXML = parser.parse(xml);

    const resultFeed: RSSFeed = {
        channel: {
            title: "",
            link: "",
            description: "",
            item: []
        }
    };

    if (!parsedXML.rss.channel) {
        throw new Error(`no channel found`)
    }
    const channelObj = parsedXML.rss.channel;

    if (!channelObj.title || !channelObj.link || !channelObj.description) {
        throw new Error("channel is missing required metadata");
    }
    resultFeed.channel.title = channelObj.title;
    resultFeed.channel.link = channelObj.link;
    resultFeed.channel.description = channelObj.description;

    let rawItems: RSSItem[];
    if (Array.isArray(channelObj.item)) {
        rawItems = channelObj.item
    } else {
        rawItems = [channelObj.item];
    }

    for (const item of rawItems) {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            continue;
        } else {
            resultFeed.channel.item.push({
                title: item.title,
                link: item.link,
                description: item.description,
                pubDate: item.pubDate,
            })

        }
    }

    return resultFeed;
}