import { WebActions } from "@lib/WebActions";
import { LoginPageObjects } from "@objects/LoginPageObjects";
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import * as util from 'util';


let webActions: WebActions;

export class LoginPage extends LoginPageObjects{

    readonly page: Page

    constructor(page:Page) {
        super();
		this.page = page;
        webActions = new WebActions(this.page);
    }

    /**
     * clickOnTheButtonLogin
     */
    async clickOnTheButtonLogin(){
        await webActions.clickElement(LoginPage.getButtonByText("Ingresar"), "The button called 'Ingresar' isn't visible");
    }
}