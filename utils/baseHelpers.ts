import { Page } from '@playwright/test';

/**
 * Waits for and clicks on an element containing exact text
 */
export async function clickByText(page: Page, text: string): Promise<void> {
    await page.getByText(text).click();
}

// TODO: Add other selector types such as CSS selectors or ID
export async function scrollAndClickElement(page: Page, xpath: string): Promise < void> {
    const element = page.locator(`xpath=${xpath}`);

    await element.waitFor({ state: 'visible' });
    await element.evaluate((el) => el.scrollIntoView({ behavior: 'auto', block: 'center' }));
    await element.click();
}

// Click element given the Xpath
export async function clickElementByXpath(page: Page, xpath: string): Promise<void> {
    const element = page.locator(`xpath=${xpath}`);
    await element.waitFor({ state: 'visible' });
    await element.click();
}


// Clicks a visible element, retrying if it's temporarily blocked
export async function safeClick(page: Page, selector: string): Promise<void> {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible' });
    await element.click();
}
