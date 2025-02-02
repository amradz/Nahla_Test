import { By } from "selenium-webdriver";

class ProductsPage {
  constructor(driver) {
    this.driver = driver;
    this.addToCartButtons = By.css('.btn_inventory');
    this.cartIcon = By.css('.shopping_cart_link');
  }

  async addProductToCart(index) {
    let addButtons = await this.driver.findElements(this.addToCartButtons);
    await addButtons[index].click();
  }

  async getCartBadge() {
    let cartIcon = await this.driver.findElement(this.cartIcon);
    return cartIcon.getText();
  }
}
export { ProductsPage };

