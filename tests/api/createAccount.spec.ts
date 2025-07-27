import { test, expect } from '@playwright/test';
import { createUser } from '@utils/userFactory';

test('API – Create Account using factory-generated user', async ({ request }) => {
    const user = createUser();
    const response = await request.post('https://automationexercise.com/api/createAccount', {

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            name: user.name,
            email: user.email,
            password: user.password,
            title: user.title,
            firstname: user.firstName,
            lastname: user.lastName,
            address1: user.address,
            country: user.country,
            zipcode: user.zipCode,
            state: user.state,
            city: user.city,
            mobile_number: user.mobileNumber,
        },
    });

  expect(response.status()).toBe(200);
  const responseText = await response.text();
  expect(responseText).toContain('User created!');
});
