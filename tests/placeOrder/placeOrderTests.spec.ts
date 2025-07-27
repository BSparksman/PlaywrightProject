import { test } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { AddedToCartModal } from '@modals/addedToCartModal';
import { CheckoutModal } from '@modals/checkoutModal';
import { CartPage } from '@pages/CartPage';
import { Navigation } from '../../components/navigation';
import { createUser } from '@utils/userFactory';
import { NavLink } from '@models/navLinks';


test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('Place Order: Register While Checkout', async ({ page }) => {
	const user = createUser();
	const home = new HomePage(page);
	const addedToCartModal = new AddedToCartModal(page);
    const checkoutModal = new CheckoutModal(page);
	const cart = new CartPage(page);
    const navigation = new Navigation(page);

	await navigation.expectOnPage('');
	await navigation.assertNavLinkHasFocus(NavLink.Home);
	// TODO: Dynamic Product Selection: If "Frozen Tops For Kids" changes or disappears, tests may break.
	await home.AddProductToCart("Frozen Tops For Kids");
	await addedToCartModal.viewCart();

	//await navigation.clickNavLink(NavLink.Cart);
	await navigation.expectOnPage('view_cart');
	await navigation.assertNavLinkHasFocus(NavLink.Cart);

	await cart.assertItemInCart("Frozen Tops For Kids", "", "", "");
	await cart.clickByText('Proceed To Checkout');

    await checkoutModal.clickRegisterLoginButton();

	
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
});