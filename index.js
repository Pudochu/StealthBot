/**
 * Advanced Stealth Web Automation Bot
 * 
 * This script demonstrates advanced techniques for web automation while
 * attempting to mimic human-like behavior and avoid detection.
 * 
 * DISCLAIMER: This script is for educational purposes only. Using this script
 * to access websites may violate their terms of service. Always ensure you have
 * permission before automating interactions with any website.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const randomUseragent = require('random-useragent');
const fs = require('fs').promises;
const { executablePath } = require('puppeteer');
const proxy = require('puppeteer-page-proxy');
const devices = require('puppeteer/lib/cjs/puppeteer/common/DeviceDescriptors');

async function advancedStealthBot() {
  // Launch the browser with advanced stealth settings
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list',
      `--user-data-dir=/tmp/temp-${Math.floor(Math.random() * 1000000)}`,
      '--disable-extensions',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-webgl',
      '--disable-threaded-animation',
      '--no-experiments',
      '--no-default-browser-check',
      '--no-first-run',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--allow-running-insecure-content',
      '--disable-web-security',
      '--disable-client-side-phishing-detection',
      '--disable-component-update',
      '--disable-popup-blocking',
      '--disable-prompt-on-repost',
      '--no-service-autorun',
      '--password-store=basic',
      '--use-mock-keychain',
      '--disable-notifications',
      '--disable-accelerated-2d-canvas',
      '--disable-features=site-per-process',
      '--enable-features=NetworkService',
    ],
    ignoreHTTPSErrors: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  
  // Uncomment the following line to use a proxy (replace with your proxy details)
  // await proxy(page, 'http://username:password@proxy_address:port');

  // Emulate a random device
  const device = devices[Math.floor(Math.random() * devices.length)];
  await page.emulate(device);

  // Apply advanced browser fingerprint evasion techniques
  await applyStealthTechniques(page);

  // Set a random user agent
  const userAgent = randomUseragent.getRandom();
  await page.setUserAgent(userAgent);

  // Set custom HTTP headers
  await setCustomHeaders(page);

  // Simulate realistic mouse movements
  await simulateMouseMovements(page);

  // Navigate to the target website
  await page.goto('https://example.com/register', { 
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  // Perform human-like behavior on the page
  await humanLikeBehavior(page);

  // Fill out the form
  await fillForm(page);

  // Submit the form
  await submitForm(page);

  // Check the result
  await checkResult(page);

  // Save cookies for potential future use
  const cookies = await page.cookies();
  await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));

  await browser.close();
}

async function applyStealthTechniques(page) {
  await page.evaluateOnNewDocument(() => {
    // Hide webdriver presence
    Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
    
    // Modify navigator properties
    Object.defineProperty(navigator, 'languages', {get: () => ['en-US', 'en']});
    Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
    
    // Mock permissions API
    Object.defineProperty(navigator, 'permissions', {
      get: () => ({
        query: () => Promise.resolve({state: 'granted'})
      })
    });
    
    // Add chrome object
    window.chrome = { runtime: {} };
    
    // Modify the permissions query method
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );
    
    // Conceal WebGL fingerprint
    const getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
      if (parameter === 37445) {
        return 'Intel Open Source Technology Center';
      }
      if (parameter === 37446) {
        return 'Mesa DRI Intel(R) HD Graphics (Skylake GT2)';
      }
      return getParameter.apply(this, arguments);
    };
    
    // Modify additional navigator properties
    Object.defineProperty(navigator, 'hardwareConcurrency', {get: () => 8});
    Object.defineProperty(navigator, 'deviceMemory', {get: () => 8});
    Object.defineProperty(navigator, 'platform', {get: () => 'Win32'});
    
    // Randomize language
    const languages = ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES'];
    Object.defineProperty(navigator, 'language', {
      get: () => languages[Math.floor(Math.random() * languages.length)]
    });
    
    // Prevent WebRTC IP leak
    const originalRTCPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function(...args) {
      const pc = new originalRTCPeerConnection(...args);
      pc.createDataChannel = function() { return {}; };
      return pc;
    };
  });
}

async function setCustomHeaders(page) {
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Upgrade-Insecure-Requests': '1',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'DNT': '1',
    'Referer': 'https://www.google.com/',
  });
}

async function simulateMouseMovements(page) {
  const viewportSize = await page.viewport();
  for (let i = 0; i < 20; i++) {
    await page.mouse.move(
      Math.random() * viewportSize.width,
      Math.random() * viewportSize.height,
      {steps: 10}
    );
    await page.waitForTimeout(Math.random() * 200);
  }
}

async function humanLikeBehavior(page) {
  const randomWait = () => page.waitForTimeout(1000 + Math.random() * 3000);

  // Simulate smooth scrolling
  await page.evaluate(() => {
    const scroll = () => {
      window.scrollBy(0, 5);
      if (window.scrollY < document.body.scrollHeight) {
        setTimeout(scroll, 20 + Math.random() * 50);
      }
    };
    scroll();
  });

  await randomWait();

  // Randomly select and highlight text
  const textElements = await page.$$('p, h1, h2, h3, h4, h5, h6');
  if (textElements.length > 0) {
    const randomElement = textElements[Math.floor(Math.random() * textElements.length)];
    await randomElement.click({ clickCount: 2 });
  }

  await randomWait();

  // Simulate more mouse movements and clicks
  for (let i = 0; i < 10; i++) {
    await simulateMouseMovements(page);
    if (Math.random() > 0.7) {
      await page.mouse.click(Math.random() * 1000, Math.random() * 1000);
    }
  }

  // Simulate random keyboard input
  await page.keyboard.type('Hello World', {delay: 100 + Math.random() * 200});

  // Randomly navigate to a link and back
  const links = await page.$$('a');
  if (links.length > 0) {
    const randomLink = links[Math.floor(Math.random() * links.length)];
    await randomLink.click();
    await page.waitForNavigation({waitUntil: 'networkidle2'});
    await randomWait();
    await page.goBack();
  }
}

async function fillForm(page) {
  const formFields = [
    {selector: '#username', value: 'testuser' + Math.floor(Math.random() * 1000)},
    {selector: '#email', value: 'testuser' + Math.floor(Math.random() * 1000) + '@example.com'},
    {selector: '#password', value: 'P@ssw0rd' + Math.floor(Math.random() * 1000)},
  ];

  for (const field of formFields) {
    await page.waitForSelector(field.selector);
    await page.click(field.selector);
    await page.type(field.selector, field.value, {delay: 50 + Math.random() * 150});
    await page.waitForTimeout(Math.random() * 1000 + 500);
  }

  // Solve CAPTCHA if present (implementation required)
  await solveCaptcha(page);
}

async function solveCaptcha(page) {
  // Implement CAPTCHA solving logic here
  console.log("CAPTCHA solving would be implemented here");
}

async function submitForm(page) {
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({waitUntil: 'networkidle2'});
}

async function checkResult(page) {
  try {
    const successMessage = await page.$eval('.success-message', el => el.textContent);
    if (successMessage.includes('Registration successful')) {
      console.log('Registration was successful');
    } else {
      console.log('Registration failed');
    }
  } catch (error) {
    console.log('Could not find success message, registration might have failed');
  }
}

advancedStealthBot().catch(console.error);
