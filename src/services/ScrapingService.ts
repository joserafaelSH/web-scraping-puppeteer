import WebScrapingGateway from '../gateways/WebScrapingGateway';
import { ScrapingResults } from '../types';

export default class ScrapingService {
    constructor(readonly webScrapingGateway: WebScrapingGateway) {}

    async execute(): Promise<ScrapingResults[]> {
        const browser = await this.webScrapingGateway.createBrowser();
        const page = await this.webScrapingGateway.createPage(browser);
        await this.webScrapingGateway.navigateToUrl(page);
        const links = await this.webScrapingGateway.getLinks(page);
        const results = await this.webScrapingGateway.getResults(page, links);
        await this.webScrapingGateway.closeBrowser(browser);
        return results;
    }
}
