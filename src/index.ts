import ScrapingService from './services/ScrapingService';
import ScrapingController from './controllers/ScrapingController';
import WebScrapingGatewayReal from './gateways/WebScrapingGatewayReal';

const webScrapingGateway = new WebScrapingGatewayReal();
const scrapingService = new ScrapingService(webScrapingGateway);
const scrapingController = new ScrapingController(scrapingService);

(async () => {
    try {
        const results = await scrapingController.execute();
        console.log(results);
    } catch (error) {
        console.log(error);
    }
})();
