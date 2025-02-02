import { By } from "selenium-webdriver";

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
    this.firstNameField = By.id('first-name');
    this.lastNameField = By.id('last-name');
    this.zipCodeField = By.id('postal-code');
    this.continueButton = By.id('continue');
    this.finishButton = By.id('finish');
  }

  async fillCheckoutForm(firstName, lastName, zipCode) {
    await this.driver.findElement(this.firstNameField).sendKeys(firstName);
    await this.driver.findElement(this.lastNameField).sendKeys(lastName);
    await this.driver.findElement(this.zipCodeField).sendKeys(zipCode);
}
async clickContinueButton() {
    await this.driver.findElement(this.continueButton).click();
  }

  async clickFinishButton() {
    await this.driver.findElement(this.finishButton).click();
  }
}

export { CheckoutPage };