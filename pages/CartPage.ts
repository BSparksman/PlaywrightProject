import { Page, expect } from '@playwright/test';
import { clickByText, scrollAndClickElement } from '@utils/baseHelpers';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    // TODO: Implement the method to assert that a specific item is in the cart
    async assertItemInCart(productName: string, price: string, quantity: string, total: string): Promise<void> {
    }

    // TODO: Remove Item from Cart
    async removeItemFromCart(productName: string): Promise<void> {
    }

    async clickProceedToCartButton(productName: string): Promise<void> {
        const xpath = `(//div[@class='features_items']//p[text()='${productName}'])[1]`;
        await scrollAndClickElement(this.page, xpath);
    }
}
