const { By, until } = require('selenium-webdriver');

import { getDriver, login, logHTMLOnFailure, saveTestState, GRAFANA_URL } from './helpers';

describe.only('writing queries', () => {
  jest.setTimeout(30000);
  let driver;
  let testStatus = { ok: true };

  beforeAll(async () => {
    driver = await getDriver();

    await login(driver);
    await driver.get(`${GRAFANA_URL}/explore`);
    // await driver.wait(until.elementLocated(By.css('[aria-label="Code editor container"]')), 5 * 1000);
    await driver.wait(until.elementLocated(By.css('.react-monaco-editor-container')), 5 * 1000);
  });

  afterEach(async () => {
    await logHTMLOnFailure(testStatus, driver);
    testStatus.ok = true;
  });

  afterAll(async () => {
    await driver.quit();
  });

  it.only(
    'runs an updated query',
    saveTestState(testStatus, async () => {
      const editor = await driver.findElement(By.css('.react-monaco-editor-container'));
      editor.click();
      editor.sendKeys('SELECT 12');
      await driver.findElement(By.css('.explore-toolbar')).click();

      await driver.sleep(5000);
      await driver.sleep(5000);
    })
  );
});
