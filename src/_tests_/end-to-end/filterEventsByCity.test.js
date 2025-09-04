/** @jest-environment node */
import puppeteer from "puppeteer";

describe("Filter Events By City (e2e)", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
      timeout: 0,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:5173/");
    // Wait until city search input is visible
    await page.waitForSelector("#city-search .city");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("When user hasn’t searched for a city, show upcoming events from all cities", async () => {
    // Expect multiple events to be rendered (default 32 slice)
    const events = await page.$$(".event");
    expect(events.length).toBeGreaterThan(0);
  });

  test("User should see a list of suggestions when they search for a city", async () => {
    await page.type("#city-search .city", "Berlin");
    await page.waitForSelector(".suggestions li");

    const suggestions = await page.$$eval(".suggestions li", (nodes) =>
      nodes.map((n) => n.textContent),
    );

    expect(suggestions.some((s) => s.includes("Berlin"))).toBe(true);
  });

  test("User can select a city from the suggested list", async () => {
    // Clear and type again
    await page.click("#city-search .city", { clickCount: 3 });
    await page.type("#city-search .city", "Berlin");

    // Wait and click first suggestion
    await page.waitForSelector(".suggestions li");
    await page.click(".suggestions li");

    // After selection, events list should update to only Berlin events
    await page.waitForSelector(".event");
    const eventLocations = await page.$$eval(
      ".event .event__location",
      (nodes) => nodes.map((n) => n.textContent),
    );

    // All rendered events should match Berlin
    const allBerlin = eventLocations.every((loc) => loc.includes("Berlin"));
    expect(allBerlin).toBe(true);
  });
});
