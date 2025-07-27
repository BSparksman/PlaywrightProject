import { Page } from '@playwright/test';
import { clickByText } from '@utils/baseHelpers';

/*
    The basePage module provides a base class for all page objects in the Playwright framework.
    It includes common functionality that can be shared across different page objects.
*/
export class BasePage {
    constructor(protected page: Page) { }

    // Function shared too all pages that extends BasePage
    async clickByText(text: string) {
        await clickByText(this.page, text);
    }

    // Add other functions that can be shared across all pages here
}
