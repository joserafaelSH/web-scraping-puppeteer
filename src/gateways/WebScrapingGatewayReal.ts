import WebScrapingGateway from './WebScrapingGateway';
import * as pup from 'puppeteer';
import { SelectorClass, SelectorId, Url } from './WebScrapingGateway';
import { ScrapingResults } from '../types';

export default class WebScrapingGatewayReal implements WebScrapingGateway {
    async createBrowser(): Promise<pup.Browser> {
        const browser = await pup.launch({ headless: true });
        return browser;
    }

    async createPage(browser: pup.Browser): Promise<pup.Page> {
        const page = await browser.newPage();
        return page;
    }

    async navigateToUrl(page: pup.Page): Promise<void> {
        await page.goto(Url.Base);
    }

    async getLinks(page: pup.Page): Promise<string[]> {
        await page.waitForSelector(SelectorId.SearchBar);
        await page.type(SelectorId.SearchBar, 'pedaleira guitarra');
        await Promise.all([
            page.waitForNavigation(),
            page.click(SelectorClass.SearchButton),
        ]);
        const links = await page.$$eval(
            `${SelectorClass.ItemSelector} > a`,
            (element) => element.map((link) => link.href)
        );
        return links;
    }

    async getResults(
        page: pup.Page,
        links: string[]
    ): Promise<ScrapingResults[]> {
        let counter = 0;
        const results: ScrapingResults[] = [];
        for (const link of links) {
            if (counter === 10) break;
            await page.goto(link);
            await page.waitForSelector(SelectorClass.Wait);
            const title = await page.$eval(
                SelectorClass.Title,
                (element) => element.textContent
            );
            const price = await page.$eval(
                SelectorClass.Price,
                (element) => element.textContent
            );
            const seller = await page.evaluate(() => {
                const el = document.querySelector(
                    '.ui-pdp-seller__link-trigger'
                );
                if (!el) return null;
                return el.textContent;
            });

            const img = await page.evaluate(() => {
                const el = document.querySelector(
                    '.ui-pdp-gallery__figure__image'
                );
                if (!el) return null;
                return el.getAttribute('src');
            });
            results.push({ title, price, link, seller, img });

            counter += 1;
        }
        return results;
    }

    async closeBrowser(browser: pup.Browser): Promise<void> {
        await browser.close();
    }
}
