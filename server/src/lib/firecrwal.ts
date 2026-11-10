import { Firecrawl } from 'firecrawl';
import { ValidationError } from '../types/app-error.js'

export async function scrapeWebsite(url:string) {
    const apiKey=process.env.FIRECRAWL_API_KEY;

    if(!apiKey){
        throw new ValidationError("Firecrawl is not configured on server");
    }

    const client = new Firecrawl({ apiKey });
    const result = await client.scrape(url,{
        formats: ["markdown"],
    });

    const markdown = result.markdown?.trim();

    if(!markdown){
        throw new ValidationError("Could Not Extract Content From This URL");
    }

    return {
        markdown,
        title: result.metadata?.title,
        sourceUrl:result.metadata?.sourceURL ?? url,
    };
}