import { chromium } from 'playwright';
import {setTimeout} from "node:timers/promises";

async function runAutomation(userName, pwd, giftCode) {
  const browser = await chromium.launch({
    headless: false // Set this to false to see the browser window
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    // Step 1: Go to NYTimes
    await page.goto('https://www.nytimes.com/');

    // Step 2: Click on "Log In"
    await page.click('a[href*="/auth/login"]');

    // Step 3: Type username
    await page.fill('#email', userName);

    // Step 4: Click Continue
    await page.click('[data-testid="submit-email"]');

    // Step 5: Type password
    await page.fill('#password', pwd);

    // Step 6: Click Log In
    await page.click('[data-testid="login-button"]');

    // Step 7: Open new tab and go to redeem page
    const newPage = await context.newPage();
    await newPage.goto(`https://www.nytimes.com/subscription/redeem?campaignId=8WH8J&gift_code=${giftCode}`);

    // Step 8: Click Redeem
    await newPage.click('[data-testid="btn-redeem"]');

    // Step 9: Check the page after clicking Redeem
    await newPage.waitForLoadState('networkidle');

    const alreadySubscriberElement = await newPage.$('[data-testid="already-subscriber-view"]');

    if (alreadySubscriberElement) {
      console.log('Success: User is already a subscriber');
      return;
    }

    const continueButton = await newPage.$('a[data-testid="get-started-btn"]');
    if (continueButton) {
      await continueButton.click();
      console.log('Clicked on Continue button');
    } else {
       throw new Error('Did not find continue button');
    }

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
const giftCode = process.argv[4];

if (!userName || !pwd || !giftCode) {
  console.error('Please provide username, password and girtCode as arguments');
  process.exit(1);
}

runAutomation(userName, pwd, giftCode);