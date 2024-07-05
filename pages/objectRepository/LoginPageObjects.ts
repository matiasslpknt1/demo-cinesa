import * as util from 'util';

export class LoginPageObjects{

    static getButtonByText = (text: string) =>{
		return util.format("//button[text()='%s']", text);
	};
}