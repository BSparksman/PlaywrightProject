import { Page, expect } from '@playwright/test';
import { clickByText, scrollAndClickElement, assertTextByXpath} from '@utils/baseHelpers';
import { BasePage } from '@pages/BasePage';

export class CheckoutPage extends BasePage {

    // Assert Address details
    async assertAddressDetails(
		title: string,
        name: string,
        address: string,
        city: string,
        state: string,
        zip: string
    ): Promise<void> {
        await assertTextByXpath(this.page, `//ul[@class='address item box']//li[@class='address_firstname address_lastname']`, title + ". " + name);
		// TODO Assert address details
    }

	// TODO : Implement the method to assert that a specific item is in the cart

    async clickProceedToCartButton(productName: string): Promise<void> {
        const xpath = `(//div[@class='features_items']//p[text()='${productName}'])[1]`;
        await scrollAndClickElement(this.page, xpath);
    }
}
