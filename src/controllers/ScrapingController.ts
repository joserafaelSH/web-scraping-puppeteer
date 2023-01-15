import ScrapingService from '../services/ScrapingService';
import { ScrapingResults } from '../types';

export default class ScrapingController {
    constructor(readonly scrapingService: ScrapingService) {}

    async execute(): Promise<ScrapingResults[]> {
        const results = await this.scrapingService.execute();
        return results;
    }
}
