import fs from 'fs';
import type { Page } from '@playwright/test';
import { BrowserContext, expect } from '@playwright/test';
import { Workbook } from 'exceljs';
import path from 'path';
import { Frame } from 'playwright';
const waitForElement = 47000;

export class WebActions {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async navigateToURL(url: string) {
		await this.page.goto(url);
	}

	async waitForPageNavigation(event: string): Promise<void> {
		switch (event.toLowerCase()) {
			case 'networkidle':
				await this.page.waitForNavigation({
					waitUntil: 'networkidle',
					timeout: waitForElement,
				});
				break;
			case 'load':
				await this.page.waitForNavigation({
					waitUntil: 'load',
					timeout: waitForElement,
				});
				break;
			case 'domcontentloaded':
				await this.page.waitForNavigation({
					waitUntil: 'domcontentloaded',
					timeout: waitForElement,
				});
		}
	}

	async delay(time: number): Promise<void> {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}

	async clickElement(locator: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayed(locator, errorMessage);
		await this.page.click(locator);
	}

	async getIframe(iframeLocator:string): Promise<Frame>{
		const elementHandle = await this.page.waitForSelector(iframeLocator);
		return await elementHandle.contentFrame();
	}

	async clickElementInFrame(iframeLocator:string, locator: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await frame.click(locator);
	}

	async dobleClickElementInFrame(iframeLocator:string, locator: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await frame.dblclick(locator);
	}

	async clickElementInFrameAtIndex(iframeLocator:string, locator: string, index: number, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await frame.locator(locator).nth(index).click();
	}

	async hoverOverElement(locator: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayed(locator, errorMessage);
		await this.page.locator(locator).hover();
	}

	async hoverOverElementInFrame(iframeLocator:string, locator: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await frame.locator(locator).hover();
	}

	async mouseOverElementInFrame(iframeLocator:string, locator: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await frame.locator(locator).dispatchEvent('mouseover');

	}

	async getTextInFrame(iframeLocator:string, locator: string, errorMessage: string):Promise<string> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		return await frame.locator(locator).textContent();
	}

	async getTextInFrameWithoutCheck(iframeLocator:string, locator: string):Promise<string> {
		const frame = await this.getIframe(iframeLocator);
		return await frame.locator(locator).textContent();
	}

	async scrollElementToEndInFrame(iframeLocator:string, locator: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await frame.$eval(locator, (el) =>
			el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
		);
	}

	async scrollElementToStartInFrame(iframeLocator:string, locator: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await frame.$eval(locator, (el) =>
			el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'end' })
		);
	}

	/*async clickElementJS(locator: string): Promise<void> {
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }*/

	async boundingBoxClickElement(locator: string): Promise<void> {
		await this.delay(1000);
		const elementHandle = await this.page.$(locator);
		const box = await elementHandle.boundingBox();
		await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
	}

	async enterElementText(locator: string, text: string,  errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayed(locator, errorMessage);
		await this.page.fill(locator, text);
	}

	async enterElementTypeText(locator: string, text: string,  errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayed(locator, errorMessage);
		await this.page.type(locator, text);
	}

	async enterElementTextInFrame(iframeLocator:string, locator: string, text: string,  errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await frame.fill(locator, text);
	}

	async dragAndDrop(
		dragElementLocator: string,
		dropElementLocator: string
	): Promise<void> {
		await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
	}

	async selectOptionFromDropdown(
		locator: string,
		option: string
	): Promise<void> {
		const selectDropDownLocator = await this.page.$(locator);
		selectDropDownLocator.type(option);
	}

	async getTextFromWebElements(locator: string): Promise<string[]> {
		return this.page.$$eval(locator, (elements) =>
			elements.map((item) => item.textContent.trim())
		);
	}

	async getTextFromWebElementsInFrameNoDisplayCheck(iframeLocator: string, locator: string): Promise<string[]> {
		const frame = await this.getIframe(iframeLocator);
		return frame.$$eval(locator, (elements) =>
			elements.map((item) => item.textContent.trim())
		);
	}

	async getTextFromWebElementsInFrame(iframeLocator: string, locator: string, errorMessage: string): Promise<string[]> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		return frame.$$eval(locator, (elements) =>
			elements.map((item) => item.textContent.trim())
		);
	}

	async downloadFile(locator: string): Promise<string> {
		const [download] = await Promise.all([
			this.page.waitForEvent('download'),
			this.page.click(locator),
		]);
		await download.saveAs(
			path.join(__dirname, '../Downloads', download.suggestedFilename())
		);
		return download.suggestedFilename();
	}

	async keyPress(locator: string, key: string): Promise<void> {
		this.page.press(locator, key);
	}

	async keyPressInFrame(iframeLocator:string, locator: string, key: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		frame.press(locator, key);
	}

	async readDataFromExcel(
		fileName: string,
		sheetName: string,
		rowNum: number,
		cellNum: number
	): Promise<string> {
		const workbook = new Workbook();
		return workbook.xlsx.readFile(`./Downloads/${fileName}`).then(function () {
			const sheet = workbook.getWorksheet(sheetName);
			return sheet.getRow(rowNum).getCell(cellNum).toString();
		});
	}

	async readValuesFromTextFile(filePath: string): Promise<string> {
		return fs.readFileSync(`${filePath}`, 'utf-8');
	}

	async writeDataIntoTextFile(
		filePath: number | fs.PathLike,
		data: string | NodeJS.ArrayBufferView
	): Promise<void> {
		fs.writeFile(filePath, data, (error) => {
			if (error) throw error;
		});
	}

	async verifyElementText(locator: string, text: string): Promise<void> {
		const textValue = await this.page.textContent(locator);
		expect(textValue.trim()).toBe(text);
	}

	async verifyNewWindowUrlAndClick(
		context: BrowserContext,
		newWindowLocator: string,
		urlText: string,
		clickOnNewWindowLocator: string
	): Promise<void> {
		const [newPage] = await Promise.all([
			context.waitForEvent('page'),
			this.page.click(newWindowLocator),
		]);
		await newPage.waitForLoadState();
		expect(newPage.url()).toContain(urlText);
		await newPage.click(clickOnNewWindowLocator);
		await newPage.close();
	}

	async verifyElementContainsText(
		locator: string,
		text: string
	): Promise<void> {
		await expect(this.page.locator(locator)).toContainText(text);
	}

	async verifyElementContainsTextInIframe(iframeLocator: string, locator: string, text: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await expect(frame.locator(locator)).toContainText(text);
	}

	async verifyInputHasValueInIframe(iframeLocator: string, locator: string, value: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		await expect(frame.locator(locator)).toHaveValue(value);
	}

	/*async verifyJSElementValue(locator: string, text: string): Promise<void> {
    const textValue = await this.page.$eval(
      locator,
      (element: HTMLInputElement) => element.value
    );
    expect(textValue.trim()).toBe(text);
  }*/

	async verifyElementAttributeInIframe(iframeLocator: string, locator: string, attribute: string, value: string, errorMessage: string): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		const textValue = await frame.getAttribute(locator, attribute);
		expect(textValue.trim()).toBe(value);
	}

	async verifyElementAttribute(locator: string, attribute: string, value: string): Promise<void> {
		const textValue = await this.page.getAttribute(locator, attribute);
		expect(textValue.trim()).toBe(value);
	}

	async getElementAttributeInFrame(iframeLocator: string, locator: string, attribute: string, errorMessage: string): Promise<string> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		return await frame.getAttribute(locator, attribute);
	}

	async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
		await this.page
			.waitForSelector(locator, { state: 'visible', timeout: waitForElement })
			.catch(() => {
				throw new Error(`${errorMessage}`);
			});
	}

	async expectToBeGreaterThanInFrame(iframeLocator: string, locator: string, count: number, errorMessage: string){
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		expect(await frame.locator(locator).count()).toBeGreaterThan(count);
	}

	async expectToEqualInFrame(iframeLocator: string, locator: string, count: number, errorMessage: string){
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		expect(await frame.locator(locator).count()).toEqual(count);
	}

	async expectToNotEqualInFrame(iframeLocator: string, locator: string, count: number, errorMessage: string){
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const frame = await this.getIframe(iframeLocator);
		expect(await frame.locator(locator).count()).not.toEqual(count);
	}

	async verifyElementIsNotDisplayed(locator: string, errorMessage?: string): Promise<void> {
		await this.page
			.waitForSelector(locator, { state: 'detached', timeout: waitForElement })
			.catch(() => {
				throw new Error(`${errorMessage || ''}`);
			});
	}

	async verifyElementIsNotDisplayedInIframe(iframeLocator: string, locator: string, errorMessage: string): Promise<void> {
		const frame = await this.getIframe(iframeLocator);
		await frame
			.waitForSelector(locator, { state: 'detached', timeout: 30000 })
			.catch(() => {
				throw new Error(`${errorMessage || ''}`);
			});
	}

	async verifyElementIsDisplayedInFrame(iframeLocator: string, locator: string, errorMessage: string): Promise<void> {
		const elementHandle = await this.page.waitForSelector(iframeLocator);
		const frame =  await elementHandle.contentFrame();
		await frame.waitForSelector(locator, { state: 'visible', timeout: waitForElement })
			.catch(() => {
				throw new Error(`${errorMessage}`);
			});
	}

	async verifyElementIsFocusInFrame(iframeLocator: string, locator: string, errorMessage: string, shouldBeFocused = true): Promise<void> {
		await this.verifyElementIsDisplayedInFrame(iframeLocator, locator, errorMessage);
		const elementHandle = await this.page.waitForSelector(iframeLocator);
		const frame =  await elementHandle.contentFrame();
		const isFocusedInFrame = await frame.$eval(locator, (el) => el === document.activeElement);

		expect(isFocusedInFrame).toBe(shouldBeFocused);
	}

	async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
		expect(status, `${errorMessage}`).toBe(true);
	}

	async expectToBeValue(expectedValue: string, actualValue: string, errorMessage: string): Promise<void> {
		expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
	}

	async expectNoToBeValue(expectedValue: string, actualValue: string, errorMessage: string): Promise<void> {
		expect(expectedValue.trim(), `${errorMessage}`).not.toBe(actualValue);
	}

	async expectToBeContent(value: string, text: string, errorMessage: string): Promise<void> {
		expect(value.trim(), `${errorMessage}`).toContain(text);
	}

	async expectToEqual(expectedValue: number, actualValue: number, errorMessage: string): Promise<void> {
		expect(expectedValue, `${errorMessage}`).toEqual(actualValue);
	}

	async expectToNotEqual(expectedValue: number, actualValue: number, errorMessage: string): Promise<void> {
		expect(expectedValue, `${errorMessage}`).not.toEqual(actualValue);
	}

	async expectToGreaterThanOrEqual(expectedValue: number, actualValue: number, errorMessage: string): Promise<void> {
		expect(expectedValue, `${errorMessage}`).toBeGreaterThanOrEqual(actualValue);
	}

	async expectToBeLessThan(expectedValue: number, actualValue: number, errorMessage: string): Promise<void> {
		expect(expectedValue, `${errorMessage}`).toBeLessThan(actualValue);
	}

	async expectToBeLessThanOrEqual(expectedValue: number, actualValue: number, errorMessage: string): Promise<void> {
		expect(expectedValue, `${errorMessage}`).toBeLessThanOrEqual(actualValue);
	}

	async verifyToBeVisible(locator: string){
		await expect(this.page.locator(locator)).toBeVisible();
	}

	async verifyToBeDisableInIframe(iframeLocator: string, locator: string){
		const elementHandle = await this.page.waitForSelector(iframeLocator);
		const frame =  await elementHandle.contentFrame();
		await expect(frame.locator(locator)).toBeDisabled();
	}

	async verifyToNotBeVisible(locator: string){
		await expect(this.page.locator(locator)).not.toBeVisible();
	}

	async verifyArrayIsEqual(locator: string, array: string[]) {
		const texts = await this.page.locator(locator).allTextContents();
		if (texts.length > 0) {
			expect(
				texts.map((text) =>
					text
						.replace(/\([0-9]\)|[^aA-zZ\s0-9+]/g, '')
						.trim()
						.toLowerCase()
				)
			).toEqual(array.map((text) => text.toLowerCase()));
		}
	}
}
