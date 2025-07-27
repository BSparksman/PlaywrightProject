import { scrollAndClickElement, typeIntoField , clickRadioButtonWithValue, selectFromDropdown} from '@utils/baseHelpers';
import { BasePage } from '@pages/BasePage';
import { User } from '@utils/types';


export class SignUpPage extends BasePage {

    // Strings are more flexible than using a Customer object. We can send any string we want.
    // Can be used to test invalid inputs and assertions of required fields.

    // click radio button with value = Mr

    async clickTitle(titleValue: string): Promise<void> {
        await clickRadioButtonWithValue(this.page, "title", titleValue);
    }

    async enterName(name: string): Promise<void> {
        await typeIntoField(this.page, "//input[@data-qa='name']", name);
    }

    async enterFirstName(firstName: string): Promise<void> {
        await typeIntoField(this.page, "//input[@data-qa='first_name']", firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await typeIntoField(this.page, "//input[@data-qa='last_name']", lastName);
    }

    async enterPassword(password: string): Promise<void> {
        await typeIntoField(this.page, "//input[@data-qa='password']", password);
    }

    async selectDay(day: string): Promise<void> {
        await selectFromDropdown(this.page, "days", day);
    }

    async enterAddress(address: string): Promise<void> {
        await typeIntoField(this.page, "//input[@data-qa='address']", address);
    }

    async enterState(state: string): Promise<void> {
        await typeIntoField(this.page, '//input[@data-qa="state"]', state);
    }

    async enterCity(city: string): Promise<void> {
        await typeIntoField(this.page, "//input[@data-qa='city']", city);
    }

    async enterZipCode(zipCode: string): Promise<void> {
        await typeIntoField(this.page, "//input[@data-qa='zipcode']", zipCode);
    }

    // select country from dropdown
    async selectCountry(country: string): Promise<void> {
        await selectFromDropdown(this.page, "country", country);
    }

    async enterMobileNumber(mobileNumber: string): Promise<void> {
        await typeIntoField(this.page, "//input[@data-qa='mobile_number']", mobileNumber);
    }

    async clickCreateAccountButton(): Promise<void> {
        await scrollAndClickElement(this.page, "//button[@data-qa='create-account']");
    }

    // For simplicity, we are using customer here with User type.
    async fillOutSignUpForm(customer: User): Promise<void> {
        await this.clickTitle(customer.title);
        await this.enterPassword(customer.password);
        await this.enterFirstName(customer.firstName);
        await this.enterLastName(customer.lastName);
        await this.enterAddress(customer.address);
        await this.enterState(customer.state);
        await this.enterCity(customer.city);
        await this.selectCountry(customer.country);
        await this.enterZipCode(customer.zipCode);
        await this.enterMobileNumber(customer.mobileNumber);
        await this.clickCreateAccountButton();
    }
}
