import { test, expect } from '@playwright/test';
import { createUser } from '@utils/userFactory';

test('API – Create Account using factory-generated user', async ({ request }) => {
  const user = createUser();

  const data = new URLSearchParams({
    name: user.name,
    email: user.email,
    password: user.password,
    title: user.title,
    birth_date: '01',
    birth_month: '01',
    birth_year: '1990',
    firstname: user.firstName,
    lastname: user.lastName,
    company: 'Automation Testers Inc.',
    address1: user.address,
    address2: 'Suite 42',
    country: user.country,
    zipcode: user.zipCode,
    state: user.state,
    city: user.city,
    mobile_number: user.mobileNumber,
  });

  console.log('POST body:', data.toString());

  const response = await request.post('https://automationexercise.com/api/createAccount', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data.toString(),
  });

  expect(response.status()).toBe(200);
  const responseText = await response.text();
  expect(responseText).toContain('User created!');
});
