import { Page, expect } from '@playwright/test';
import { getEnvConfig } from '../config/env.config';

export class Navigation {
    constructor(private page: Page) { }

    async clickHome() {
        await this.page.getByRole('link', { name: ' Home' }).click();
    }

    async clickCart() {
        await this.page.getByRole('link', { name: ' Cart' }).click();
    }

    async clickSignupLogin() {
        await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    }

    async assertNavLinkHasFocus(linkName: string) {
        const homeLink = this.page.getByRole('link', { name: linkName });
        const color = await homeLink.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe('rgb(255, 165, 0)');
    }

    async expectOnPage(path: string) {
    const { baseUrl } = getEnvConfig();
    await expect(this.page).toHaveURL(`${baseUrl}${path}`);
}
}
