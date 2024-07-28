const puppeteer = require('puppeteer');

async function runAutomation(userName, pwd, giftCode) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    // Step 1: Go to NYTimes
    await page.goto('https://www.nytimes.com/');

    // Step 2: Click on "Log In"
    await page.click('a:contains("Log In")');

    // Step 3: Type username
    await page.waitForSelector('#email');
    await page.type('#email', userName);

    // Step 4: Click Continue
    await page.click('[data-testid="submit-email"]');

    // Step 5: Type password
    await page.waitForSelector('#password');
    await page.type('#password', pwd);

    // Step 6: Click Log In
    await page.click('[data-testid="login-button"]');

    // Step 7: Open new tab and go to redeem page
    const newPage = await browser.newPage();
    await newPage.goto(`https://www.nytimes.com/subscription/redeem?campaignId=8WH8J&gift_code=${giftCode}`);

    // Step 8: Click Redeem
    await newPage.waitForSelector('[data-testid="btn-redeem"]');
    await newPage.click('[data-testid="btn-redeem"]');

    console.log('Automation completed successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

// Get command line arguments
const userName = process.argv[2];
const pwd = process.argv[3];

if (!userName || !pwd || !giftCode) {
  console.error('Please provide both username and password as arguments');
  process.exit(1);
}

runAutomation(userName, pwd, giftCode);