import * as util from 'util';

export class HomePageObjects{

    protected static BURGER_CONTAINER = '//div[@class="burger-container"]';
    
    static getSpanByText = (text: string) =>{
		return util.format("//span[text()='%s']", text);
	};

    static getButtonByText = (text: string) =>{
		return util.format("//button[text()='%s']", text);
	};
}