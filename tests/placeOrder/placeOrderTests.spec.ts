import { test } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { AddedToCartModal } from '@modals/addedToCartModal';
import { CheckoutModal } from '@modals/checkoutModal';
import { CheckoutPage } from '@pages/CheckoutPage';
import { CartPage } from '@pages/CartPage';
import { LoginPage } from '@pages/LoginPage';
import { Navigation } from '../../components/navigation';
import { NavLink } from '@models/navLinks';
import { createUser } from '@utils/userFactory';
import { SignUpPage } from '@pages/SignUpPage';
import { AccountCreatedPage } from '@pages/AccountCreatedPage';


test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('Place Order: Register While Checkout', async ({ page }) => {
	const user = createUser();
	const navigation = new Navigation(page);
	const home = new HomePage(page);
	const addedToCartModal = new AddedToCartModal(page);
	const checkoutModal = new CheckoutModal(page);
    const checkout = new CheckoutPage(page);
	const cart = new CartPage(page);
	const login = new LoginPage(page);
	const signup = new SignUpPage(page);
	const accountCreaated = new AccountCreatedPage(page);

    await navigation.assertHomeDisplayed();
	// TODO: Dynamic Product Selection: If "Frozen Tops For Kids" changes or disappears, tests may break.
	await home.AddProductToCart("Frozen Tops For Kids");
	await addedToCartModal.viewCart();
	await navigation.assertCartDisplayed();

	await cart.assertItemInCart("Frozen Tops For Kids", "", "", "");
    // We can either use baseHelpers clickByText or cart.clickProceedToCartButton.
	await cart.clickByText('Proceed To Checkout');

	await checkoutModal.clickRegisterLoginButton();
    await navigation.assertLoginDisplayed();
	await login.enterCredentials(user.name, user.email);
    await login.clickSignUpButton();

	await signup.fillOutSignUpForm(user);
	await accountCreaated.assertSuccessMessage("Account Created!");
	await accountCreaated.clickContinueButton();

    // Once logged in, the user should be redirected to the cart page with their items still in the cart.
	//await navigation.assertCartDisplayed();
	//await cart.assertItemInCart("Frozen Tops For Kids", "", "", "");

	await navigation.assertLoggedInAs(user.name);

	await navigation.clickNavLink(NavLink.Cart);
	await cart.clickByText('Proceed To Checkout');

	//14. Verify Address Details and Review Your Order
	await checkout.assertAddressDetails(
		user.name,
		user.address,
		user.city,
		user.country,
		user.mobileNumber
	);

	//15. Enter description in comment text area and click 'Place Order'
	//16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
	//17. Click 'Pay and Confirm Order' button
	//18. Verify success message 'Your order has been placed successfully!'
	//19. Click 'Delete Account' button
	//20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
});