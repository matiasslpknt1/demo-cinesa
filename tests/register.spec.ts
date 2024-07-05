import test from '@lib/BaseTest';
import * as util from 'util';


test.describe('Register Test', ()=>{
    test('Register user test', async ({homePage, registerPage}) => {
        const menuItem = "Regístrate"; 
        await test.step('The user go to the home page', async()=>{
            await homePage.goToTheHome();
        });
        await test.step(util.format("The user click on %s", menuItem), async()=>{
            await homePage.clickOnTheMenuByText(menuItem);
        });
        await test.step("The user can complete the register form", async()=>{
            await registerPage.completeForm();
        });
    });
});