import { Page, expect } from '@playwright/test';
import { getEnvConfig } from '../config/env.config';
import { NavLink } from '../models/navLinks';

export class Navigation {
    constructor(private page: Page) { }

    async clickNavLink(navLink: NavLink) {
        await this.page.getByRole('link', { name: navLink }).click();
    }

    async assertNavLinkHasFocus(navLink: NavLink) {
        const homeLink = this.page.getByRole('link', { name: navLink });
        const color = await homeLink.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe('rgb(255, 165, 0)');
    }

    async expectOnPage(path: string) {
        const { baseUrl } = getEnvConfig();
        await expect(this.page).toHaveURL(`${baseUrl}${path}`);
    }
}
