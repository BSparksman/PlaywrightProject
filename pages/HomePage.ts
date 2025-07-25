import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    async visit() {
        await this.page.goto('/');
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
