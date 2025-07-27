import { Page, expect } from '@playwright/test';
import { assertText } from '@utils/baseHelpers';
import { BasePage } from '@pages/BasePage';

export class AccountDeletedPage extends BasePage {

    async assertSuccessMessage(successText: string): Promise<void> {
        await assertText(this.page, "account-deleted", successText);
    }
}