import { WebActions } from "@lib/WebActions";
import { HomePageObjects } from "@objects/HomePageObjects";
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import * as util from 'util';


let webActions: WebActions;

export class HomePage extends HomePageObjects{

    readonly page: Page

    constructor(page:Page) {
        super();
		this.page = page;
        webActions = new WebActions(this.page);
    }

    /**
     * goToTheLogin
     */
    async goToTheHome(): Promise<void>{
        await webActions.navigateToURL("/");
        await webActions.clickElement(HomePage.getButtonByText("Accept All Cookies"), "The button 'Accept All Cookies' isn't visible")
    }

    /**
     * clickOnTheMenuByText
     * @param text
     */
    async clickOnTheMenuByText(text:string){
        if(await this.page.locator(HomePage.BURGER_CONTAINER).isVisible()){
            await webActions.clickElement(HomePage.BURGER_CONTAINER, util.format("The button called '%s' isn't visible", text));
        }
        await webActions.clickElement(HomePage.getSpanByText(text), util.format("The button called '%s' isn't visible", text));
    }
}