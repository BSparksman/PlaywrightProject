import { BasePage } from '@pages/BasePage';
import { getEnvConfig } from '@config/env.config';
import { expect } from '@playwright/test';
import jwt from 'jsonwebtoken'; // You may need to install this package;
import { log } from 'console';

const { loginUrl, appUrl } = getEnvConfig();

export class LoginPage extends BasePage {

    async typeNewUserCredentials() {
        const xpath = "//a[text()=' Cart']";
        const locator = this.page.locator(xpath);
        await this.click(locator);
    }

    // Enter UserName
    async enterUserName(name: string): Promise<void> {
        const nameLocator = this.page.locator('#username');
        await this.typeInTo(nameLocator, name);
    }

    // Enter Password
    async enterPassword(password: string): Promise<void> {
        const passwordLocator = this.page.locator('#password');
        await this.typeInTo(passwordLocator, password);
    }

    // Enter username and password
    async enterCredentials(name: string, password: string): Promise<void> {
        await this.enterUserName(name);
        await this.enterPassword(password);
    }

    // Click the Login button
    async clickLoginButton(): Promise<void> {
        const locator = this.page.locator('#login');
        await this.clickAndWaitForResponse(locator, loginUrl);
    }

    // Login with environment-specific credentials
    async login(): Promise<void> {
        const { username, password } = getEnvConfig().credentials.userA;
        await this.waitForLoginPage();
        await this.enterCredentials(username, password);
        await this.clickLoginButton();
    }

    async expectOnLoginPage() {
        expect(this.page.url()).toContain(loginUrl);
    }

    async waitForLoginPage() {
        await this.page.waitForURL(`${loginUrl}*`);
    }

    async mockAuthToken(username: string = 'demo.insurer') {
        // Build the JWT token
        const payload = {
            iss: process.env.AUTH_URL,
            nbf: 1729724936,
            iat: 1729724936,
            exp: 1729725536,
            aud: process.env.SUREPART_CLIENT_ID,
            amr: ['pwd'],
            nonce: '0.5808968477114533',
            at_hash: '8dgldOXfpqVmQFbNF3F3qg',
            sid: 'AC439E9379ACEDE18A3D30856FAEA23C',
            sub: 'Mona879ks4x',
            auth_time: 1663553152,
            idp: 'local',
        };
        const secret = 'secret'; // Use your real secret in a secure way
        const jwtToken = jwt.sign(payload, secret);

        const token = {
            access_token: jwtToken,
            expires_at: Date.now() + 24 * 60 * 60 * 1000, // expires tomorrow
            id_token: jwtToken,
            profile: { name: username },
            scope: 'staff_estimating_api%openid%partstrader_profile%offline_access%insurerticketing_api%insurerticketing_api:write',
        };

        const key = `oidc.user:${process.env.AUTH_URL}:${process.env.SUREPART_CLIENT_ID}`;
        await this.page.evaluate(
            ([k, v]) => localStorage.setItem(k, v),
            [key, JSON.stringify(token)]
        );
    }
}
