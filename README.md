Cinesa smoke test 
===
## Information
- Title:  `Cinesa smoke test`
- Authors:  `MINDATA`
- Repo: [https://github.com/mauro0812/demo-cinesa.git]()
- Project type: [Playwright](https://playwright.dev/) 

## Install & Dependence
- [node](https://nodejs.org/en/download/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Getting Started 🚀

After clone the project you must to install:

- [Playwright](https://playwright.dev/docs/intro#installing-playwright)

- Installing Playwright in the root folder:
  ```
  npm init playwright@latest
  ```

- Installing Husky for pre-commit checks -> more info [here](https://typicode.github.io/husky/getting-started.html)
  ```
  npm run prepare
  ```
- Run all suite:
  ```
  ENVIRONMENT=ppe npx playwright test --workers 1 --retries 2 
  ```  

- Run happy path suite:
  ```
  ENVIRONMENT=ppe npx playwright test --workers 1 --retries 2 --grep @happy_path
  ``` 

- Run specific test:
  ```
  ENVIRONMENT=ppe npx playwright test –g "test name" --retries 2  
  ```   

After run the tc you must to open the report:

- Open Html report:
  ```
  npx playwright show-report html-report  
  ```   
- Open the Allure report:
  ```
  npx allure generate allure-results --clean && npx allure open 
  ```

## Directory Hierarchy
```
|—— .pipelines
|—— allure-report
|—— allure-results
|—— html-report
|—— lib
    |——BaseTest.ts
    |——WebActions.ts
|——logs
    |——info.log
|——node_modules
|——pages
    |——objectRepository
    |——pageRepository
|——test-results
|——tests
    |——register.spec.ts-snapshots
|——utils
    |——AppContext.ts
|——.gitignore
|——package-lock.json
|——package.json
|——playwright.config.ts
|——README.md
|——testConfig.ts
|——tsconfig.json