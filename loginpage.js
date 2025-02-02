import { Browser, Builder, By, until, WebDriver } from "selenium-webdriver";

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.id('user-name');
        this.passwordField = By.id('password');
        this.loginButton = By.id('login-button');
        this.errorIcon= By.css('.svg-inline--fa fa-times-circle fa-w-16 error_icon');
        this.errorMessage = By.css('.error-message-container');
        this.closeErrorIcon = By.css('.svg-inline--fa fa-times fa-w-11 ');
    }

    async open() {
        await this.driver.get('https://www.saucedemo.com/');
        await this.driver.manage().window().maximize();
    }

    async fillInUsernameField(username) {
        let usernameField = await this.driver.wait(until.elementLocated(this.usernameField), 10000);
        await this.driver.wait(until.elementIsVisible(usernameField));
        await usernameField.click();
        await usernameField.clear();
        await usernameField.sendKeys(standard_user);
    }

    async fillInPasswordField(password) {
        let passwordField = await this.driver.findElement(this.passwordField, 10000);
        await passwordField.click();
        await passwordField.clear();
        await passwordField.sendKeys(pogresnaSifra);
    } 

    async clickLoginButton() {
        let loginButton = await this.driver.findElement(this.loginButton);
        await loginButton.click();
    }

    async getUsernameErrorIcon() {
        let usernameField = await this.driver.findElement(this.usernameField);
        return errorIcon;
      }

    async getPasswordErrorIcon() {
        let passwordField = await this.driver.findElement(this.passwordField);
        return errorIcon;
      }

    async getErrorMessageText() {
        let errorMessage = await this.driver.findElement(this.errorMessage);
        return errorMessage;
    }

    async closeErrorMessage() {
        let closeButton = await this.driver.findElement(this.closeErrorIcon);
        await closeButton.click();
    }

    async isErrorMessageDisplayed() {
        let errorMessage = await this.driver.findElement(this.errorMessage);
        return await errorElement.isDisplayed();
    }

    async isLoginPageDisplayed() {
    let loginButton = await this.driver.findElement(this.loginButton);
    return await loginButton.isDisplayed();
    }
}
export { LoginPage };