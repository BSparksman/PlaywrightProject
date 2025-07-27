import { Page, expect } from '@playwright/test';
import { clickByText, clickElementByXpath } from '@utils/baseHelpers';
import { BasePage } from '../BasePage';

export class AddedToCartModal extends BasePage {

    async viewCart() {
        const xpath = "//a//u[text()='View Cart']";
        await clickElementByXpath(this.page, xpath);
    }

    async continueShopping() {
        const xpath = "//button[text()='Continue Shopping']";
        await clickElementByXpath(this.page, xpath);
    }
}
