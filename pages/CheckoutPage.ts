import { scrollAndClickElement, assertTextByXpath, typeIntoField} from '@utils/baseHelpers';
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

    // Enter optional order comment
	async enterOrderComment(comment: string): Promise<void> {
        await typeIntoField(this.page, '//textarea[@name="message"]', comment);
	}

    async clickPlaceOrderButton(): Promise<void> {
        const xpath = `//a[text()='Place Order']`;
        await scrollAndClickElement(this.page, xpath);
    }
}
