import { Page, expect } from '@playwright/test';
import { clickByText, scrollAndClickElement } from '@utils/baseHelpers';
import { BasePage } from '@pages/BasePage';

export class CheckoutPage extends BasePage {

    // Assert Address details
    async assertAddressDetails(
        name: string,
        address: string,
        city: string,
        state: string,
        zip: string
    ): Promise<void> {
		await expect(this.page.locator('.address-name')).toHaveText(name);
		await expect(this.page.locator('.address-details')).toHaveText(`${address}, ${city}, ${state} ${zip}`);
	}

    async clickProceedToCartButton(productName: string): Promise<void> {
        const xpath = `(//div[@class='features_items']//p[text()='${productName}'])[1]`;
        await scrollAndClickElement(this.page, xpath);
    }
}
