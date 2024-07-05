import test from '@lib/BaseTest';

test.describe('Login Test', ()=>{
    test('Login with a user name valid', async ({homePage, loginPage}) => {
        await test.step('The user go to the login page', async()=>{
            await homePage.goToTheHome();
        });
        await test.step('The user click on the button login', async()=>{
            await loginPage.clickOnTheButtonLogin();
        });
    });
});
