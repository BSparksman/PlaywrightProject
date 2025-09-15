import { Page, Locator, expect } from '@playwright/test';
import { getEnvConfig } from '@config/env.config';

/*
    The BaseHelpers class provides utility methods for interacting with web elements in Playwright.
    These methods include clicking elements by text, scrolling and clicking elements by XPath, etc.
*/

export class BaseHelpers {
    protected page: Page;

    /**
     * Creates a new BaseHelpers instance for the given Playwright page.
     * @param page Playwright Page object.
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Clicks a locator, scrolling it into view and retrying if needed.
     * @param locator Locator for the element to click.
     * @param description Optional description for logging.
     * @param options Optional click options.
     * @param retries Number of retry attempts (default: 2).
     */
    async click(
        locator: Locator,
        options?: Parameters<Locator['click']>[0],
        retries = 2
    ): Promise<void> {
        const label = `Click on ${locator.toString()}`;
        await this.performAction(async () => {
            await this.logEvent(label);
            await this.scrollToLocator(locator, undefined, options?.timeout);
            await locator.click(options);
        }, retries, label);
    }

    /**
     * Clicks a locator and waits for navigation to complete.
     * @param locator Locator for the element to click.
     * @param description Optional description for logging.
     * @param timeout Maximum time to wait for navigation (default: 10000ms).
     * @param retries Number of retry attempts (default: 2).
     */
    async clickAndWaitForResponse(locator: Locator, endpoint: string, timeout: number = 10000, retries = 2): Promise<void> {
        const label = `Click on ${locator.toString()} and wait for response URL: ${endpoint.toString()}`;
        await this.performAction(async () => {
            this.click(locator);
            this.waitForResponseEndpoint(endpoint, timeout);
        }, retries, label);
    }

    async waitForResponseEndpoint(endpoint: string, timeout: number = 10000): Promise<void> {
        try {
            await this.logEvent(`Waiting for response URL: ${endpoint}`);
            await this.page.waitForResponse(response => response.url().includes(endpoint) && response.status() === 200, { timeout });
        } catch (error) {
            console.error(`[BaseHelpers] Timeout after ${timeout}ms waiting for response URL: ${endpoint}`);
            throw error;
        }
    }

    /**
     * Selects an option from a dropdown.
     * @param locator Locator for the dropdown element.
     * @param value Value to select from the dropdown.
     */
    async selectFromDropdown(locator: Locator, value: string): Promise<void> {
    await this.logEvent(`Select "${value}" from dropdown: ${locator.toString()}`);
        await this.scrollToLocator(locator);
        await locator.selectOption(value);
    }

    /**
     * Types text into a locator, scrolling it into view and retrying if needed.
     * @param locator Locator for the input element.
     * @param text Text to type.
     * @param description Optional description for logging.
     * @param retries Number of retry attempts (default: 2).
     */
    async typeInTo(locator: Locator, text: string, retries = 2): Promise<void> {
        const label = `Type "${text}" into: ${locator.toString()}`;
        await this.performAction(async () => {
            await this.logEvent(label);
            await this.scrollToLocator(locator);
            await locator.fill("");
            await locator.fill(text);
        }, retries, label);
    }

    /**
     * Scrolls to a target element, optionally within another scrollable container.
     * If a container is provided, scrolls the container into view first, then scrolls to the target inside the container.
     * Useful for nested scroll views (e.g., vertical page scroll, then horizontal carousel scroll).
     *
     * @param timeout Maximum time to wait for scrolling actions (default: 5000ms).
     */
    async scrollToLocator(
        targetLocator: Locator,
        containerLocator?: Locator,
        timeout: number = 5000
    ): Promise<void> {
        await this.waitForLocator(targetLocator, timeout);
        if (containerLocator) {
            await containerLocator.scrollIntoViewIfNeeded({ timeout });
            await containerLocator.locator(targetLocator).scrollIntoViewIfNeeded({ timeout });
        } else {
            await targetLocator.scrollIntoViewIfNeeded({ timeout });
        }
    }

    /**
     * Waits for a locator to become visible and stable.
     * Throws an error if the locator does not become visible and stable within the timeout.
     *
     * @param locator Locator to wait for.
     * @param timeout Maximum time to wait (default: 5000ms).
     */
    async waitForLocator(locator: Locator, timeout: number = 5000): Promise<void> {
        const start = Date.now();
        const multiMatchRegex = /strict mode violation:.*resolved to (\d+) elements/;
        var lastError: any = null;
        let lastMatch: RegExpMatchArray | null = null;
        while (Date.now() - start < timeout) {
            try {
                await locator.waitFor({ state: 'visible', timeout : 1000 });
                return; // Success!
            } catch (error: any) {
                if (error.message) {
                    const match = error.message.match(multiMatchRegex);
                    if (match) {
                        lastError = error;
                        lastMatch = match;
                        console.warn(`\x1b[33m[BaseHelpers] WARNING: WaitFor found ${match[1]} elements. Waiting a further ${timeout - (Date.now() - start)}ms...\x1b[0m`);
                        await this.page.waitForTimeout(1000);
                        continue;
                    }
                } 
            }
        }
        if (lastError) {
            throw new Error(`[BaseHelpers] Timeout waiting for locator ${timeout}ms:\n - ${lastError}`);
        } else {
            throw new Error(`[BaseHelpers] Timeout after ${timeout}ms: locator did not resolve to a single element.`);
        }
    }

    async waitForStableLocator(locator: Locator, timeout: number = 5000): Promise<void> {
        try {
            await this.waitUntilStable(locator, timeout);   
        } catch (error) {
            await this.logEvent(`Timeout after ${timeout}ms waiting for locator to be stable: ${locator.toString()}`);
            throw error;
        }
    }

    async waitUntilHidden(locator: Locator, timeout: number = 5000): Promise<void> {
        try {
            await locator.waitFor({ state: 'hidden', timeout });
        } catch (error) {
            await this.logEvent(`Timeout after ${timeout}ms waiting for locator to be hidden: ${locator.toString()}`);
            throw error;
        }
    }

    /**
     * Asserts that a locator has the expected text.
     * @param locator Locator for the element.
     * @param expectedText Text to assert.
     * @param description Optional description for logging.
     */
    async assertText(locator: Locator, expectedText: string, description?: string): Promise<void> {
        const logLabel = `Assert text "${expectedText}": ${locator.toString()}`;
        await this.logEvent(logLabel);
        await this.scrollToLocator(locator);
        await expect(locator).toHaveText(expectedText);
    }

    /**
     * Gets the text content of a locator.
     * @param locator Locator for the element.
     * @param description Optional description for logging.
     * @returns The text content of the element.
     */
    async getElementText(locator: Locator, description?: string): Promise<string> {
        const label = `Get text: ${locator.toString()}`;
        await this.logEvent(label);
        await this.scrollToLocator(locator);
        return await locator.evaluate(el => el.textContent) || '';
    }

    /**
     * Waits until the locator is stable (not moving or animating) for a short period.
     * Used internally to ensure the element is ready for interaction after becoming visible.
     *
     * @param locator Locator to check for stability.
     * @param timeout Maximum time to wait (default: 5000ms).
     * @private
     */
    private async waitUntilStable(locator: Locator, timeout: number = 2000): Promise<void> {
        const pollInterval = 50; // Faster polling
        const requiredStableChecks = 2; // Number of consecutive stable checks
        const maxAttempts = Math.ceil(timeout / pollInterval);
        let previousBox: { x: number; y: number; width: number; height: number } | null = null;
        let stableCount = 0;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const box = await locator.boundingBox();
            if (!box) throw new Error('Element is not visible or detached from DOM');
            if (
                previousBox &&
                box.x === previousBox.x &&
                box.y === previousBox.y &&
                box.width === previousBox.width &&
                box.height === previousBox.height
            ) {
                stableCount++;
                if (stableCount >= requiredStableChecks) return; // Early exit
            } else {
                stableCount = 0;
            }
            previousBox = box;
            await this.page.waitForTimeout(pollInterval);
        }
        throw new Error(`Element did not become stable within ${timeout}ms`);
    }

    /**
     * Retries an async action a specified number of times, logging each attempt and error.
     * @param action The async action to retry.
     * @param retries Number of retry attempts.
     * @private
     */
    private async performAction(action: () => Promise<void>, retries: number, actionLabel: string = ""): Promise<void> {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                await action();
                return; // Success
            } catch (error) {
                // Log error for first attempt and retries
                if (attempt === 0) {
                    console.warn(`\x1b[33m[BaseHelpers] Error on first attempt:\n - ${actionLabel}:\n - ${error}\x1b[0m`);
                } else {
                    console.warn(`\x1b[33m[BaseHelpers] Error on retry attempt: ${attempt} ${actionLabel}:\n - ${error}\x1b[0m`);
                }

                // If last attempt, throw error
                if (attempt === retries) {
                    throw error;
                }

                // Wait before next retry
                await this.page.waitForTimeout(500);
            }

            // Log retry attempts (skip for first attempt)
            if (attempt > 0) {
                console.log(`\x1b[33m[BaseHelpers] Retry attempt ${attempt} of ${retries}: ${actionLabel}\x1b[0m`);
            }
        }
    }

    /**
     * Logs an action for debugging and traceability.
     * @param logLabel Unified label for logging.
     * @private
     */
    private async logEvent(logLabel: string): Promise<void> {
        console.log(`[BaseHelpers] ${logLabel}`);
    }
}
