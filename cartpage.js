import { By } from "selenium-webdriver";

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.checkoutButton = By.id('checkout');
    this.cartItems = By.css('.cart_item');
  }

  async clickCheckoutButton() {
    await this.driver.findElement(this.checkoutButton).click();
  }

  async getCartItems() {
    return await this.driver.findElements(this.cartItems);
  }
}

export { CartPage };