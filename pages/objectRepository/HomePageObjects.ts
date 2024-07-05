import * as util from 'util';

export class HomePageObjects{

    static getSpanByText = (text: string) =>{
		return util.format("//span[text()='%s']", text);
	};

    static getButtonByText = (text: string) =>{
		return util.format("//button[text()='%s']", text);
	};
}