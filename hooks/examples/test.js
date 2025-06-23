const webdriver = require("selenium-webdriver");
const By = webdriver.By;
var moment = require("moment");
var waitTime = 2 // 2 seconds

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME || "username";

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY || "accessKey";

// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = process.env.GRID_HOST || "@hub.lambdatest.com/wd/hub";    //connect to lambdatest hub

async function searchTextOnGoogle() {
  var keys = process.argv;
  console.log(keys);
  let parallelCount = keys[2] || 1;
  let tunnel = keys[3] || false;
  let platform = keys[4] || "Windows 10";
  let browserName = keys[5] || "chrome";
  let version = keys[6] || "latest";

  // Setup Input capabilities
  let capabilities = {
    platform: platform,
    browserName: browserName,
    version: version,
    queueTimeout: 300,
    visual: true,
    "user": USERNAME,
    "accessKey": KEY,
    name: "test session", // name of the test
    build: platform + browserName + version, // name of the build
    "LT:Options": {
      "smartUI.project": "smartuigithub",
      // will generate random smartUI build if not specified
      // "smartUI.build": "first", 
      "smartUI.options": {
        "output": {
          "errorColor": {
            "red": 200,
            "green": 0,
            "blue": 255
          },
          "errorType": "movement",
          "transparency": 0.3,
          "largeImageThreshold": 100,
          "useCrossOrigin": false,
          "outputDiff": true
        },
        "scaleToSameSize": true,
        "ignore": "antialiasing"
      }
    }
  };

  //add github app capabilities
  let githubURL = process.env.GITHUB_URL
  if (githubURL) {
    capabilities.github = {
      url: githubURL
    }
  }

  if (tunnel === "true") {
    capabilities.tunnel = true;
  }

  var gridUrl = "https://" + USERNAME + ":" + KEY + GRID_HOST;
  console.log(gridUrl);
  console.log(USERNAME);
  console.log(capabilities);
  console.log("Running " + parallelCount + " parallel tests ");
  let i = 1;
  for (i = 1; i <= parallelCount; i++) {
    startTest(gridUrl, capabilities, "Test " + i);
  }
}

searchTextOnGoogle();

async function startTest(gridUrl, capabilities, name) {
  const caps = capabilities;
  var start_date = moment();

  const driver = await new webdriver.Builder()
    .usingServer(gridUrl)
    .withCapabilities(caps)
    .build();

  var end_date = moment();
  var duration = moment.duration(end_date.diff(start_date));
  console.log(caps.name, " : Setup Time :", duration.asSeconds());

  // navigate to a url
  let url = "https://devci.worksonlocal.dev/tests/player-dynamic/#/testbed?manifest=visual-regression-multiple-choice";


  console.log(url);
  try {
    await driver.get(url);
    console.log("URL loaded successfully");

    // Wait for the document ready state to be 'complete'
    let readyState = '';
    for (let i = 0; i < 20; i++) { // up to 10 seconds
      readyState = await driver.executeScript('return document.readyState');
      if (readyState === 'complete') break;
      await driver.sleep(500);
    }
    console.log('Document readyState:', readyState);
    
    // Wait for the page to load and add some debugging
    await driver.sleep(2000); // Wait 2 seconds for page to load
    
    // Try to find the element and wait for it to be present
    const startAssessmentElement = await driver.wait(
      webdriver.until.elementLocated(By.css("[data-cy='startAssessment']")),
      10000 // Wait up to 10 seconds
    );
    
    await startAssessmentElement.click();
    console.log("Clicked startAssessment button");

    // Take screenshot after startAssessment click
    console.log("taking screenshot after startAssessment click...");
    let config1 = {
      screenshotName: "screenshot-1"
    };
    const screenshotResult1 = await driver.executeScript("smartui.takeScreenshot", config1);
    console.log("RESPONSE :", screenshotResult1);
    await driver.sleep(25000); // Wait 25 seconds before checking status
    const status1 = await driver.executeScript("smartui.fetchScreenshotStatus=screenshot-1");
    console.log("Screenshot 1 Status:", status1);

    // Wait for the second element and click it
    const choiceElement = await driver.wait(
      webdriver.until.elementLocated(By.css("[data-cy-choice='1']")),
      10000 // Wait up to 10 seconds
    );
    await choiceElement.click();
    console.log("Clicked choice 1 button");

    // Wait for the header element and click it
    const headerElement = await driver.wait(
      webdriver.until.elementLocated(By.css("[data-cy='header']")),
      10000 // Wait up to 10 seconds
    );
    await headerElement.click();
    console.log("Clicked header element");

    // Take screenshot after header click
    console.log("taking screenshot after header click...");
    let config2 = {
      screenshotName: "screenshot-2"
    };
    const screenshotResult2 = await driver.executeScript("smartui.takeScreenshot", config2);
    console.log("RESPONSE :", screenshotResult2);
    await driver.sleep(25000); // Wait 25 seconds before checking status
    const status2 = await driver.executeScript("smartui.fetchScreenshotStatus=screenshot-2");
    console.log("Screenshot 2 Status:", status2);

    // Wait for the second choice element and click it
    const choice2Element = await driver.wait(
      webdriver.until.elementLocated(By.css("[data-cy-choice='2']")),
      10000 // Wait up to 10 seconds
    );
    await choice2Element.click();
    console.log("Clicked choice 2 button");

    // Click on header element again
    const headerElement2 = await driver.wait(
      webdriver.until.elementLocated(By.css("[data-cy='header']")),
      10000 // Wait up to 10 seconds
    );
    await headerElement2.click();
    console.log("Clicked header element again");

    // Take screenshot after second header click
    console.log("taking screenshot after second header click...");
    let config3 = {
      screenshotName: "screenshot-3"
    };
    const screenshotResult3 = await driver.executeScript("smartui.takeScreenshot", config3);
    console.log("RESPONSE :", screenshotResult3);
    await driver.sleep(25000); // Wait 25 seconds before checking status
    const status3 = await driver.executeScript("smartui.fetchScreenshotStatus=screenshot-3");
    console.log("Screenshot 3 Status:", status3);

    // Take additional screenshot after step 5
    console.log("taking additional screenshot after step 5...");
    let config4 = {
      screenshotName: "screenshot-4"
    };
    const screenshotResult4 = await driver.executeScript("smartui.takeScreenshot", config4);
    console.log("RESPONSE :", screenshotResult4);
    await driver.sleep(25000); // Wait 25 seconds before checking status
    const status4 = await driver.executeScript("smartui.fetchScreenshotStatus=screenshot-4");
    console.log("Screenshot 4 Status:", status4);

    // Wait for the footer next button and click it
    const footerNextElement = await driver.wait(
      webdriver.until.elementLocated(By.css("[data-cy='footer-next-button']")),
      10000 // Wait up to 10 seconds
    );
    await footerNextElement.click();
    console.log("Clicked footer next button");

    // Wait for the footer back button and click it
    const footerBackElement = await driver.wait(
      webdriver.until.elementLocated(By.css("[data-cy='footer-back-button']")),
      10000 // Wait up to 10 seconds
    );
    await footerBackElement.click();
    console.log("Clicked footer back button");

    // Click on choice 2 again
    const choice2ElementAgain = await driver.wait(
      webdriver.until.elementLocated(By.css("[data-cy-choice='2']")),
      10000 // Wait up to 10 seconds
    );
    await choice2ElementAgain.click();
    console.log("Clicked choice 2 button again");

    // Click on header element again
    const headerElement3 = await driver.wait(
      webdriver.until.elementLocated(By.css("[data-cy='header']")),
      10000 // Wait up to 10 seconds
    );
    await headerElement3.click();
    console.log("Clicked header element again");

    // Take screenshot after third header click
    console.log("taking screenshot after third header click...");
    let config5 = {
      screenshotName: "screenshot-5"
    };
    const screenshotResult5 = await driver.executeScript("smartui.takeScreenshot", config5);
    console.log("RESPONSE :", screenshotResult5);
    await driver.sleep(25000); // Wait 25 seconds before checking status
    const status5 = await driver.executeScript("smartui.fetchScreenshotStatus=screenshot-5");
    console.log("Screenshot 5 Status:", status5);

    console.log("All test steps completed successfully!");
    
    // Mark test as passed and quit driver
    try {
      await driver.executeScript("lambda-status=passed");
      console.log("Test marked as passed");
    } catch (statusErr) {
      console.log("Could not set lambda status:", statusErr);
    }
    
    // Quit driver with proper error handling
    try {
      await driver.quit();
      console.log("Driver quit successfully");
    } catch (quitErr) {
      console.log("Driver quit error (this is normal):", quitErr.message);
    }
  } catch (err) {
    error = JSON.stringify(err);
    console.log(error);
    console.log("test failed with reason " + err);
    
    // Try to get page source for debugging
    try {
      const pageSource = await driver.getPageSource();
      console.log("Page source preview:", pageSource.substring(0, 1000));
    } catch (sourceErr) {
      console.log("Could not get page source:", sourceErr);
    }
    
    // Mark test as failed and quit driver with proper error handling
    try {
      await driver.executeScript("lambda-status=failed");
      console.log("Test marked as failed");
    } catch (statusErr) {
      console.log("Could not set lambda status:", statusErr);
    }
    
    try {
      await driver.quit();
      console.log("Driver quit successfully after error");
    } catch (quitErr) {
      console.log("Driver quit error after failure (this is normal):", quitErr.message);
    }
  }

  console.log(url);
  await driver
    .get(url)
    .then(function () {
      const session = driver.getSession();
     
      // For Smartui TakeScreenshot
      setTimeout(function () {
        console.log("taking screenshot ...")
        let config = {
          screenshotName: "web-page"
        };
        driver.executeScript("smartui.takeScreenshot", config).then(out => {
          console.log("RESPONSE :", out)
          return
        });
      }, waitTime * 1000);


      driver.getTitle().then(function (title) {
        setTimeout(function () {
          driver.executeScript("lambda-status=passed");
          driver.quit();
        }, 15000);
      });
    })
    .catch(function (err) {
      error = JSON.stringify(err);
      console.log(error);
      console.log("test failed with reason " + err);
      driver.executeScript("lambda-status=failed");
      driver.quit();
    });
}

