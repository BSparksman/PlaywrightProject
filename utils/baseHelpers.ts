import { Page } from '@playwright/test';

/*
    The baseHelpers module provides utility functions for interacting with web elements in Playwright.
    These functions include clicking elements by text, scrolling and clicking elements by XPath.
*/

//Waits for and clicks on an element containing exact text
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

// type into a field given the Xpath
export async function typeIntoField(page: Page, xpath: string, text: string): Promise<void> {
    const field = page.locator(`xpath=${xpath}`);
    await field.waitFor({ state: 'visible' });
    await field.fill(text);
}

export async function clickRadioButtonWithValue(page: Page, radioName: string, value: string): Promise < void> {
    const xpath = `//input[@type='radio' and @name='${radioName}' and @value='${value}']`;
    await clickElementByXpath(page, xpath);
}

//select from select dropdown
export async function selectFromDropdown(page: Page, selectorId: string, value: string): Promise<void> {
    const xpath = `//select[@data-qa='${selectorId}']`;
    const dropdown = page.locator(xpath);
    await dropdown.waitFor({ state: 'visible' });
    await dropdown.selectOption(value);
}

// Get the text of an element with a daata-qa id
export async function getTextByDataQa(page: Page, dataQaId: string): Promise<string> {
    const locator = page.locator(`[data-qa="${dataQaId}"]`);
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() || '';
}

// GetText by Xpath
export async function getTextByXpath(page: Page, xpath: string): Promise<string> {
    const locator = page.locator(`xpath=${xpath}`);
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() || '';
}

// asset the text of an element with a data-qa id against expected text.
export async function assertText(page: Page, dataQaId: string, expectedText: string): Promise<void> {
    const actualText = await getTextByDataQa(page, dataQaId);
    if (actualText !== expectedText) {
        throw new Error(`Expected text "${expectedText}" but found "${actualText}"`);
    }
}

// Assert text with xpath
export async function assertTextByXpath(page: Page, xpath: string, expectedText: string): Promise<void> {
    const actualText = await getTextByXpath(page, xpath);
    if (actualText !== expectedText) {
        throw new Error(`Expected text "${expectedText}" but found "${actualText}"`);
    }
}


