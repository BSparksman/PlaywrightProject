import { clickElementByXpath } from '@utils/baseHelpers';
import { BasePage } from '../BasePage';

export class CheckoutModal extends BasePage {

    async clickRegisterLoginButton() {
        const xpath = "//a//u[text()='Register / Login']";
        await clickElementByXpath(this.page, xpath);
    }
}
