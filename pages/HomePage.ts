import { Page, expect } from '@playwright/test';
import { clickByText, scrollAndClickElement } from '@utils/baseHelpers';
import { BasePage } from '@pages/BasePage';

export class HomePage extends BasePage {

    // What is the liklyhood that the product name and ID will be required? Maybe we can just use product name?
    async AddProductToCartWithId(productName: string, productId: string): Promise<void> {
        const xpath = `(//div[@class='features_items']//p[text()='${productName}']/following-sibling::a[@data-product-id='${productId}'])[1]`;
        await scrollAndClickElement(this.page, xpath);
    }

    async AddProductToCart(productName: string): Promise<void> {
        const xpath = `(//div[@class='features_items']//p[text()='${productName}']/following-sibling::a)[1]`;
        await scrollAndClickElement(this.page, xpath);
    }

    async addFirstProductToCart() {
        await this.page.hover('.product');
        await this.page.click('.product-overlay a:has-text("Add to cart")');
    }

    async viewCart() {
        const xpath = "//a[text()=' Cart']";
        await scrollAndClickElement(this.page, xpath);
    }
}
