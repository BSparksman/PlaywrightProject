import { Page, expect } from '@playwright/test';
import { clickByText, scrollAndClickElement, typeIntoField } from '@utils/baseHelpers';
import { BasePage } from '@pages/BasePage';

export class LoginPage extends BasePage {

    async typeNewUserCredentials() {
        const xpath = "//a[text()=' Cart']";
        await scrollAndClickElement(this.page, xpath);
    }

    // Enter username and password
    async enterCredentials(name: string, email: string): Promise<void> {
        await typeIntoField(this.page, '//input[@data-qa="signup-name"]', name);
        await typeIntoField(this.page, '//input[@data-qa="signup-email"]', email);
        await this.page.waitForTimeout(5000);
    }

    // Click the Sign Up button
    async clickSignUpButton(): Promise<void> {
        await scrollAndClickElement(this.page, '//button[@data-qa="signup-button"]');
    }
}
