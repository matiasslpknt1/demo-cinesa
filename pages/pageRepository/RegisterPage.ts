import { WebActions } from "@lib/WebActions";
import { RegisterPageObjects } from "@objects/RegisterPageObjects";
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import * as util from 'util';


let webActions: WebActions;

export class RegisterPage extends RegisterPageObjects{

    readonly page: Page

    constructor(page:Page) {
        super();
		this.page = page;
        webActions = new WebActions(this.page);
    }

    /**
     * completeForm
     */
    async completeForm(): Promise<void>{
        await webActions.enterElementText(RegisterPage.INPUT_EMAIL, "mauro@gmail.com", "The input text Email isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_CONFIRM_EMAIL, "mauro@gmail.com", "The input text Confirm Email isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_NAME, "Mauro", "The input text Name isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_LAST_NAME, "Garcia", "The input text Last Name isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_BIRTHDATE, "22/04/1983", "The input text Birthdate isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_DNI, "35345456546", "The input text DNI isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_ADDRESS, "9 de julio", "The input text Address isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_ADDRESS_2, "Bv cura brochero", "The input text Sub Address isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_CITY, "Cordoba", "The input text Sub Address isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_POSTAL_CODE, "5151", "The input text Sub Address isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_PASSWORD, "MauMe.1234567", "The input text Postal Code isn't visible");
        await webActions.enterElementText(RegisterPage.INPUT_PROMO_CODE, "1234567", "The input text Promo code isn't visible");

        await webActions.verifyElementIsDisplayed(RegisterPage.getButtonDivByText("Aplicar"), "The button 'Aplicar' isn't visible");
    }
}