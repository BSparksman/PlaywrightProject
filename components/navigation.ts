import { Page, expect } from '@playwright/test';
import { getEnvConfig } from '../config/env.config';
import { NavLink } from '../models/navLinks';

export class Navigation {
    constructor(private page: Page) { }

    async clickNavLink(navLink: NavLink) {
        await this.page.getByRole('link', { name: navLink }).click();
    }

    // TODO: Consider adding these asserts into a single method.
    async assertHomeDisplayed() {
        await this.expectOnPage("");
        await this.assertNavLinkHasFocus(NavLink.Home);
    }

    async assertCartDisplayed() {
        await this.expectOnPage("view_cart");
        await this.assertNavLinkHasFocus(NavLink.Cart);
    }

    async assertSignUpDisplayed() {
        await this.expectOnPage("signup");
        await this.assertNavLinkHasFocus(NavLink.SignUpLogin);
    }

    async assertLoginDisplayed() {
        await this.expectOnPage("login");
        await this.assertNavLinkHasFocus(NavLink.SignUpLogin);
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

    async assertLoggedInAs(username: string) {
        const loggedInText = await this.page.getByText(`Logged in as ${username.toUpperCase()}`);
        await expect(loggedInText).toBeVisible();
    }
}