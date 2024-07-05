import * as util from 'util';

export class RegisterPageObjects{

    protected static INPUT_EMAIL = '//input[@name="email"]';
    protected static INPUT_CONFIRM_EMAIL = '//input[@id="email-confirmation-field"]';
    protected static INPUT_NAME = '//input[@name="givenName"]';
    protected static INPUT_LAST_NAME = '//input[@name="familyName"]';
    protected static INPUT_BIRTHDATE = '//input[@name="dateOfBirth"]';
    protected static INPUT_DNI = '//input[@name="nationalId"]';
    protected static INPUT_ADDRESS = '//input[@name="address"]';
    protected static INPUT_ADDRESS_2 = '//input[@name="suburb"]';
    protected static INPUT_CITY = '//input[@name="city"]';
    protected static INPUT_POSTAL_CODE = '//input[@name="postCode"]';
    protected static INPUT_PROMO_CODE = '//input[@name="promocode"]';
    protected static INPUT_PASSWORD = '//input[@name="password"]';

    static getButtonDivByText = (text: string) =>{
		return util.format("//button//div[text()='%s']", text);
	};

}