import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { expect } from "chai";
import LoginPage from "../page/LoginPage.js";
import ProductsPage from "../page/ProductsPage.js";
import CartPage from "../page/CartPage.js";
import CheckoutPage from "../page/CheckoutPage.js";

describe("Swag Lab tests", function () {
  let driver;
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(driver);
    productsPage = new ProductsPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);

    await driver.get("https://www.saucedemo.com");
    await driver.manage().window().maximize();
  });

  afterEach(async function () {
    await driver.quit();
});

//Test 1
  it("Login without credentials", async function () {
    await loginPage.openLoginModalWindow();
    
    expect(await loginPage.getPageTitle()).to.equal("Swag Labs");

    await loginPage.clickLoginButton();

    let usernameErrorIcon = await loginPage.getUsernameErrorIcon();
    expect(await usernameErrorIcon.isDisplayed()).to.equal(true);

    let passwordErrorIcon = await loginPage.getPasswordErrorIcon();
    expect(await passwordErrorIcon.isDisplayed()).to.equal(true);

    let errorMessage = await loginPage.getErrorMessageText();
    expect(errorMessage).to.equal("Epic sadface: Username is required");

    await loginPage.closeErrorMessage();

    let isErrorMessageDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorMessageDisplayed).to.equal(false);
  });


//Test 3
it("Purchase of products", async function () {
  
  await loginPage.openLoginModalWindow();

  await loginPage.login("standard_user', 'secret_sauce");

  let pageTitle = await driver.getTitle();
  expect(pageTitle).to.equal("Swag Labs");

  await productsPage.addProductToCart(0); // Dodaj prvi proizvod
  await productsPage.addProductToCart(1); // Dodaj drugi proizvod

  let badgeText = await productsPage.getCartBadge();
  expect(badgeText).to.equal("2");

  await driver.findElement(By.css('.shopping_cart_link')).click();

  let cartTitle = await driver.getTitle();
  expect(cartTitle).to.equal("Your Cart");

  let cartItems = await cartPage.getCartItems();
  expect(cartItems.length).to.equal(2);

  await cartPage.clickCheckoutButton();

  let checkoutTitle = await driver.getTitle();
  expect(checkoutTitle).to.equal("Checkout: Your Information");

  await checkoutPage.fillCheckoutForm("Amra", "Dzihic", "71000");

  let overviewTitle = await driver.getTitle();
  expect(overviewTitle).to.equal("Checkout: Overview");

  let overviewItems = await driver.findElements(By.css('.inventory_item_name'));
  expect(overviewItems.length).to.equal(2);

  await checkoutPage.clickFinishButton();

  let completeTitle = await driver.getTitle();
  expect(completeTitle).to.equal("Checkout: Complete!");

  await driver.findElement(By.css('.bm-menu-button')).click();

  await driver.findElement(By.id('logout_sidebar_link')).click();

  let loginPageTitle = await driver.getTitle();
  expect(loginPageTitle).to.equal("Login");
});
});