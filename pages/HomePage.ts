import { Page, expect } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    async visit() {
        await this.page.goto('/');
    }

    async assertHomeLinkHasFocus() {
        const homeLink = this.page.locator('a[href="/"]');
        const color = await homeLink.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe('rgb(255, 165, 0)');
    }


    async goToSignup() {
        await this.page.click('text=Signup / Login');
    }

    async addFirstProductToCart() {
        await this.page.hover('.product');
        await this.page.click('.product-overlay a:has-text("Add to cart")');
    }

    async viewCart() {
        await this.page.click('text=View Cart');
    }
}
