import { PlaywrightTestConfig, devices } from '@playwright/test';
import { testConfig } from '@testConfig';

const ENVIRONMENT = process.env.ENVIRONMENT;
/** environment */
if (!ENVIRONMENT || !['ppe', 'pe'].includes(ENVIRONMENT)) {
	console.log(
		'Please provide a correct environment value like "ENVIRONMENT=dfe|ppe|pe"'
	);
	process.exit();
}

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig ={
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [['allure-playwright', { environmentInfo:{ ENVIRONMENT: ENVIRONMENT} }], ['html', { outputFolder: 'html-report', open: 'never' }],['junit', { outputFile: 'results.xml' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Store state */
		//storageState: storageState,
    /* Permission */
		//permissions: ['clipboard-read'],
  },

  /* Configure projects for major browsers */
	projects: [
		{
      name: "Chrome",
      use: {
        channel: "chrome",
        baseURL: testConfig[process.env.ENVIRONMENT],
        headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: "Firefox",
      use: {
        baseURL: testConfig[process.env.ENVIRONMENT],
        ...devices["Desktop Firefox"],
        headless: true,
        //viewport: { width: 1900, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        baseURL: testConfig[process.env.ENVIRONMENT],
        headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
       },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13'],
        baseURL: testConfig[process.env.ENVIRONMENT],
        headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
      },
    },
		/*{
			name: 'Microsoft Edge',
			use: {
				channel: 'msedge',
				baseURL: testConfig[process.env.ENVIRONMENT],
				headless: true,
				viewport: { width: 1680, height: 750 },
				ignoreHTTPSErrors: true,
				acceptDownloads: true,
				screenshot: 'only-on-failure',
				video: 'retain-on-failure',
				trace: 'retain-on-failure',
				launchOptions: {
					slowMo: 2,
				},
			},
		}*/
	],
};
export default config;
  
