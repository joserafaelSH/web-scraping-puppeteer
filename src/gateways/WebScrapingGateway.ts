import * as pup from 'puppeteer';
import { ScrapingResults } from '../types';

export default interface WebScrapingGateway {
    createBrowser(): Promise<pup.Browser>;
    createPage(browser: pup.Browser): Promise<pup.Page>;
    navigateToUrl(page: pup.Page): Promise<void>;
    getLinks(page: pup.Page): Promise<string[]>;
    getResults(page: pup.Page, links: string[]): Promise<ScrapingResults[]>;
    closeBrowser(browser: pup.Browser): Promise<void>;
}

export enum SelectorClass {
    SearchButton = '.nav-search-btn',
    ItemSelector = '.ui-search-result__image',
    Title = '.ui-pdp-title',
    Price = '.andes-money-amount__fraction',
    Seller = '.ui-pdp-seller__link-trigger',
    Image = '.ui-pdp-gallery__figure__image',
    Wait = '.ui-recommendations-title',
}

export enum SelectorId {
    SearchBar = '#cb1-edit',
}

export enum Url {
    Base = 'https://www.mercadolivre.com.br/',
}
