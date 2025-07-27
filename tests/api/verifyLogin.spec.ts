import { test, expect } from '@playwright/test';
import { getEnvConfig } from '@config/env.config';

test('API – Verify Login with valid credentials', async ({ request }) => {
    const { password } = getEnvConfig();
    const email = 'Hal_Walsh@gmail.com';

    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            email,
            password,
        },
    });

    const text = await response.text();
    console.log('Login Response:', text);

    expect(response.status()).toBe(200);
    expect(text).toContain('User exists!');
});
