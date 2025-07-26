import { test } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { createUser } from '@utils/userFactory';

test('Place Order: Register While Checkout', async ({ page }) => {
	const user = createUser();
	const home = new HomePage(page);

	await home.visit();
	await home.assertHomeLinkHasFocus();
	//4. Add products to cart

	//5. Click 'Cart' button
	//6. Verify that cart page is displayed
	//7. Click Proceed To Checkout
	//8. Click 'Register / Login' button
	//9. Fill all details in Signup and create account
	//10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
	//11. Verify ' Logged in as username' at top
	//12.Click 'Cart' button
	//13. Click 'Proceed To Checkout' button
	//14. Verify Address Details and Review Your Order
	//15. Enter description in comment text area and click 'Place Order'
	//16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
	//17. Click 'Pay and Confirm Order' button
	//18. Verify success message 'Your order has been placed successfully!'
	//19. Click 'Delete Account' button
	//20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
	//await home.addFirstProductToCart();
	//await home.viewCart();
	//await page.click('text=Proceed To Checkout');

	//await page.click('text=Register / Login');
	//await page.fill('[data-qa="signup-name"]', user.name);
	//await page.fill('[data-qa="signup-email"]', user.email);
	//await page.click('[data-qa="signup-button"]');

	// Fill out rest of registration fields (can be another Page Object call)
	//await page.fill('[data-qa="password"]', user.password);
	//await page.click('[data-qa="create-account"]');
	//await page.waitForSelector('text=Account Created!');
	//await page.click('text=Continue');

	// Return to cart and complete checkout
	//await home.viewCart();
	//await page.click('text=Proceed To Checkout');

	//await page.fill('[name="name_on_card"]', user.name);
	//await page.fill('[name="card_number"]', '4111111111111111');
	//await page.fill('[name="cvc"]', '123');
	//await page.fill('[name="expiry_month"]', '12');
	//await page.fill('[name="expiry_year"]', '2025');
	//await page.click('#submit');

	//await expect(page.locator('text=Congratulations! Your order has been confirmed!')).toBeVisible();
});
