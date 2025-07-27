import { Page, expect } from '@playwright/test';
import { clickByText, scrollAndClickElement, assertText } from '@utils/baseHelpers';
import { BasePage } from '@pages/BasePage';

export class AccountCreatedPage extends BasePage {

    async clickContinueButton(): Promise<void> {
        await scrollAndClickElement(this.page, "//a[@data-qa='continue-button']");
    }

    async assertSuccessMessage(successText: string): Promise<void> {
        await assertText(this.page, "account-created", successText);
    }
}
