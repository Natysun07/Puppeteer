let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content", async () => {
    const expectedOutput = "GitHub · Build and ship software on a single, collaborative platform · GitHub"

    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();

    expect(title2).toEqual(expectedOutput);
  }, 10000);

  test("The first link attribute", async () => {
    const expectedOutput = "#start-of-content";

    const actual = await page.$eval("a", link => link.getAttribute('href') );

    expect(actual).toEqual(expectedOutput);
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnElementSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    const expectedOutput = "Sign up for free"

    await page.waitForSelector(btnElementSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnElementSelector, link => link.textContent);

    expect(actual).toContain(expectedOutput);
  }, 10000);
});

test("The page contains 'Get the checklist' button", async () => {
  const btnElementSelector = "body > div.logged-out.env-production.page-responsive > div.application-main > main > react-app > div > div > div > div.Primer_Brand__Grid-module__Grid___q48mT > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > a";
  const expectedOutput = "Get the checklist";

  await page.goto("https://github.com/features/security");
  await page.waitForSelector(btnElementSelector, {
    visible: true,
  });
  const actual = await page.$eval(btnElementSelector, link => link.textContent);

  expect(actual).toContain(expectedOutput);
}, 10000);

test("The page contains the element with a specific text", async () => {
  const pElementSelector = ".f5.color-fg-muted.mb-3";
  const expectedOutput = "Get tips, technical guides, and best practices. Twice a month. Right in your inbox.";

  await page.goto("https://github.com/resources/articles/ai");
  const pText = await page.$eval(pElementSelector, el => el.textContent);

  expect(pText).toBe(expectedOutput);
}, 10000);

test("The drawer menu has exactly 6 child-elements", async () => {
  const drawerElementSelector = "body > div.logged-out.env-production.page-responsive.header-white > div.position-relative.header-wrapper.js-header-wrapper > header > div > div.d-flex.flex-justify-between.flex-items-center.width-full.width-lg-auto > div:nth-child(1) > button";
  const liElement = "body > div.logged-out.env-production.page-responsive.header-white > div.position-relative.header-wrapper.js-header-wrapper > header > div > div.HeaderMenu.js-header-menu.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.top-0 > div > nav > ul > li"
  const expectedOutput = 6;

  await page.goto("https://github.com/pricing");
  await page.$eval(drawerElementSelector, form => form.click());
  const listItemsCount = await page.$$eval(liElement, (items) => items.length);

  expect(listItemsCount).toEqual(expectedOutput);
}, 10000);
