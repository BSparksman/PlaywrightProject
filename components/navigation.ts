import { Page } from '@playwright/test';

export class Navigation {
    constructor(private page: Page) { }

    async clickHome() {
        await this.page.getByRole('link', { name: ' Home' }).click();
    }

    async clickCart() {
        await this.page.getByRole('link', { name: ' Cart' }).click();
    }

    async clickSignupLogin() {
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    }

    async clickLogout() {
        await this.page.getByRole('link', { name: 'Logout' }).click();
    }
}
