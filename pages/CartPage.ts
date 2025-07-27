import { Page, expect } from '@playwright/test';
import { clickByText, scrollAndClickElement } from '@utils/baseHelpers';
import { BasePage } from '@pages/BasePage';

export class CartPage extends BasePage {

    // TODO: Implement the method to assert that a specific item is in the cart
    async assertItemInCart(productName: string, price: string, quantity: string, total: string): Promise<void> {
        const xpath = `//table[@id='cart_info_table']//a[text()='${productName}']`;
        await this.page.waitForSelector(xpath);
        const item = this.page.locator(xpath);
        await expect(item).toBeVisible();
    }


    // TODO: Remove Item from Cart
    async removeItemFromCart(productName: string): Promise<void> {
    }

    async clickProceedToCheckoutButton(): Promise<void> {
        const xpath = `//a[@class='btn btn-default check_out' and text()='Proceed To Checkout']`;
        await scrollAndClickElement(this.page, xpath);
    }
}
