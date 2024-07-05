import { LoginPage } from '@pages/LoginPage';
import { HomePage } from '@pages/HomePage';
import { RegisterPage } from '@pages/RegisterPage';
import { test as baseTest } from '@playwright/test';
import * as util from 'util';

//import AppContext from '@utils/AppContext';


function getFixtures() {
	return {
		loginPage: async ({ page }, use) => {
			await use(new LoginPage(page));
		},
		homePage: async ({ page }, use) => {
			await use(new HomePage(page));
		},
		registerPage: async ({ page }, use) => {
			await use(new RegisterPage(page));
		},
	};
}

const test = baseTest.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
  registerPage: RegisterPage;
 }>(getFixtures());

export default test;
