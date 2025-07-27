import { Page } from '@playwright/test';
import { clickByText, scrollAndClickElement } from '@utils/baseHelpers';

export class BasePage {
    constructor(protected page: Page) { }

    // Function shared too all pages that extends BasePage
    async clickByText(text: string) {
        await clickByText(this.page, text);
    }

    // Function using baseHelpers to scroll to an element and click it
    async scrollAndClick(xpath: string) {
        await scrollAndClickElement(this.page, xpath);
    }
}
