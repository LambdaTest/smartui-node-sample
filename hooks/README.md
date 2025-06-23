 <h1>Smart UI Testing With Selenium Node.JS</h1>

<img height="400" src="https://user-images.githubusercontent.com/126776938/232535511-8d51cf1b-1a33-48fc-825c-b13e7a9ec388.png">


<p align="center">
  <a href="https://www.lambdatest.com/blog/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Blog</a> 
  &nbsp; &#8901; &nbsp;
  <a href="https://www.lambdatest.com/support/docs/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Docs</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.lambdatest.com/learning-hub/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Learning Hub</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.lambdatest.com/newsletter/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Newsletter</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.lambdatest.com/certifications/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample" target="_bank">Certifications</a>
  &nbsp; &#8901; &nbsp;
  <a href="https://www.youtube.com/c/LambdaTest" target="_bank">YouTube</a>
</p>
&emsp;
&emsp;
&emsp;

*Learn the how to get started with Smart UI testing with Selenium Node.JS on the LambdaTest platform.*

[<img height="58" width="200" src="https://user-images.githubusercontent.com/70570645/171866795-52c11b49-0728-4229-b073-4b704209ddde.png">](https://accounts.lambdatest.com/register?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)


## Table of Contents:

* [Pre-requisites](#pre-requisites)
* [Running Your First Selenium Node JS Test](#running-your-first-selenium-node-js-test)
* [Examples For Different Use Cases](#examples-for-different-use-cases)
* [Configuring The Test Environment](#configuring-the-test-environment)
* [Setting Up GitHub App Integration With SmartUI](#setting-up-github-app-integration-with-smartui)

## Pre-requisites

1. To get started, you would require the Node version >=14.
  ```
  node --version
  ```

2. You can switch the Node version by running the below command:
  ```
  nvm install 12.0.0
  node --version
  ```
  
3. Create a `New Project` with the SmartUI Web Application.

## Configuring The Test Environment

Before executing your NodeJs test, you need to configure the `config.json` file. You can find the `config.json` file [here](https://github.com/keys-github/smartui-node-sample/blob/main/config.json). To add capabilities, visit our [capabilities generator](https://www.lambdatest.com/capabilities-generator/).

## Running Your First Selenium Node JS Test

1. In order to run your Smart UI tests with Selenium Python, you will need to set your LambdaTest username and access key in the environment variables. Click the **Access Key** button at the top-right of the Automation Dashboard to access it.

![Screenshot 2023-04-18 132921](https://user-images.githubusercontent.com/126776938/232711334-676f1895-d223-4ee2-9bff-d82837715520.png)

**Windows**

```js
set LT_USERNAME="YOUR_USERNAME" 
set LT_ACCESS_KEY="YOUR ACCESS KEY"
```

**macOS/Linux**

```js
export LT_USERNAME="YOUR_USERNAME" 
export LT_ACCESS_KEY="YOUR ACCESS KEY"
```

2. To create a `New Project` using the SmartUI Web Application, click the **New Project** button in the top-right corner of your dashboard. 

![Screenshot 2023-04-18 133652](https://user-images.githubusercontent.com/126776938/232756654-ad1f5594-06da-4a42-ac7d-709cefdff5b1.png)

3. Fill in the specifications such as **Platform**, **Project Name**, **Approvers**, and **Tags** as per your requirement and click **Create Project**.

![Screenshot 2023-04-18 134121](https://user-images.githubusercontent.com/126776938/232714262-56ae0be3-3ba3-4ba3-8e82-2f063657fcaf.png)

3. Clone the `smartui-node-sample` Repo.
  ```
  git clone https://github.com/LambdaTest/smartui-node-sample
  ```

4. Install the Dependencies.
  ```
  npm i
  ```


## Examples For Different Use Cases

We have many different examples revolving around different use cases. They are as follows:

### General Capability Change Test Cases

   * `index.js` - This Test is an example of all the **advanced funtionalities** possible with Smart UI.
  
      ```
      npm start
      ```
   * `general.js` - This Test is an example of all the **general test**
   
        ```
        npm start general
        ```
       
   * `errorSetting.js` - This Test is an example of how **error settings** can be modified.
   
      ```
      npm start error
      ```
      
   * `transparency.js` - This Test is to show how to **alter the opacity** of the comparison screenshot.
   
      ```
      npm start transparency
      ```
      
   * `BoundingBoxes.js` - This Test shows an example of comparing only a **certain area** in the screenshot.
   
      ```
      npm start boundingBoxes
      ```
      
   * `ignoredBoxes.js` - This test is for **excluding certain areas** in the screenshot for comparison.
   
      ```
      npm start ignoredBoxes
      ```
      
   * `ignoreAreasColoredWith.js` - This test is for **removing the colored content** from the comparison.
   
      ```
      npm start ignoreAreasColoredWith
      ```

### Execute Tests on Multiple URLs

To get started, first configure the `url.json` with the help of the code given below.

```bash
[
    {
        "screenshotName": "Lambdatest Landing Page",
        "url": "https://lambdatest.com"
    },
    {
        "screenshotName": "Amazon Home Page",
        "url": "https://amazon.com"
    }
]
```

Run the following command to execute tests on multiple URLs.

```bash
npm run multiple
```

Given below is the multiple URL tests sample.

```bash
const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const moment = require("moment");
const automationConfig = require("./config.json");
const smartUITests = require("./urls.json");

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME || "<Your_Username>";

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY || "<Your_Access_key>";

//connect to Lambdatest hub
const GRID_HOST = process.env.GRID_HOST || "@hub.lambdatest.com/wd/hub";

const gridUrl = "https://" + USERNAME + ":" + KEY + GRID_HOST;

// Selenium WebDriver Function

async function runSmartUIonLambdatest() {
  // Lambdatest Cloud Selenium Grid Connection

  // Printing the Lambdatest Cloud Information for the test

  console.log(
    "Please visit https://smartui.lambdatest.com to see your SmartUI - Visual Regression Tests"
  );

  try {
    automationConfig.forEach(async (...config) => {
      const driver = await new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(...config)
        .build();
      try {
        smartUITests.forEach((smartUITest) => {
          let smartUI_ScreenshotName = smartUITest.screenshotName;
          let smartUI_url = smartUITest.url;
          smartUISeleniumTest(driver, smartUI_url, smartUI_ScreenshotName);
        });
      } catch (err) {
        console.log(err);
      }
      // Closing the Browser Session
      await driver.executeScript("lambda-status=failed");
      await driver.quit();
    });
  } catch (err) {
    console.log(JSON.stringify(err));
    await driver.executeScript("lambda-status=failed");
  }
}

async function smartUISeleniumTest(driver, url, screenshotName) {
  await driver
    .get(url)
    .then(() => {
      // For Smartui TakeScreenshot
      console.log(
        `Capturing the Screenshot Name:  ${screenshotName} | URL: ${url}`
      );
      driver.manage().setTimeouts({ implicit: 10000 });
      let images = driver.findElements(webdriver.By.css("img.lazyload"));
      for (let i = 0; i < images.length; i++) {
        driver.executeScript("arguments[0].scrollIntoView();", images[i]);
        driver.wait(until.elementIsVisible(images[i]), 10000); // wait up to 10 seconds for image to appear

        let src = images[i].getAttribute("src");
        console.log(`Captured image source: ${src}`);
      }
      driver
        .executeScript(`smartui.takeFullPageScreenshot=${screenshotName}`)
        .then((result) => {
          console.log("Result :", result);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Executing the tests in parallel of multiple urls
runSmartUIonLambdatest();
```


      
### Execute Tests on Multiple Resolutions

If you want to execute Visual Regression tests on multiple resolutions, you need to add the capability `resolution` in capabilities option.
```
  let capabilities = {
      ...
      resolution = "1920x1080";
      ...
  }
```
Few common resolutions are:
- 1024x768
- 1280x800
- 1600x1200
- 1920x1080
- 2560x1440

Here is the code for all the commonly used resolutions:

#### Run Test on `1024x768` resolution 
```
$ node custom-resolutions.js 1024x768
```

#### Run Test on `1280x800` resolution 
```
$ node custom-resolutions.js 1280x800
```

#### Run Test on `1600x1200` resolution 
```
$ node custom-resolutions.js 1600x1200
```


#### Run Test on `1920x1080` resolution 
```
$ node custom-resolutions.js 1920x1080
```


#### Run Test on `2560x1440` resolution 
```
$ node custom-resolutions.js 2560x1440
```

## Setting Up Github App Integration with SmartUI

### Steps 1: Integrate the your Lambdatest Account with GitHub App. 

You can integrate your LambdaTest account with the GiHub application in the following ways:

- Using OAuth

![github-app-landing-92ef6e152a7302cb9ab88f5034b9ec0c](https://user-images.githubusercontent.com/126776938/232715867-f375b4df-1bc9-4e88-8340-44e986be2e9a.png)


### Step 2: Select your GitHub repository 

Go to your GitHub repository where you want to configure your SmartUI project. Check out our GitHub sample [here](https://github.com/LambdaTest/smartui-node-sample).

### Step 3: Configure your test suite

Add the `Github` capability to your current test configuration:

```bash
const capabilities: {
  platform: "Windows 10",
  browserName: "chrome",
  version: "latest",
  "smartUI.project": "Smart UI sample test",
   github: {
    "url": "https://api.github.com/repos/OWNER/REPO/statuses/commitId", // Mandatory
    "owner": "{OWNER}",  //Optional
    "repo": "{REPO}",  //Optional
    "commit": "{commitId}" //Optional
   }
}
```

### Step 4: Setting up your CI configuration

Setting up your CI workflow to execute on GitHub. Here is an example setup with `GitHub Actions`:

Go to `.github/workflows/<your_ci_file>.yml`.

```bash
    name: Execute SmartUI Test with Github App Integration
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1

    - name: Create commit status
      run: |
        API_HOST=https://api.github.com
        # Check out the PR branch
        git checkout $GITHUB_HEAD_REF
        # Get the commit ID of the last commit
        COMMIT_ID=$(git rev-parse HEAD)
        echo "Last commit ID of PR: $COMMIT_ID"
        GITHUB_URL=$API_HOST/repos/$GITHUB_REPOSITORY/statuses/$COMMIT_ID
        echo "GITHUB_URL: $GITHUB_URL"
        echo "GITHUB_URL=$GITHUB_URL" >> $GITHUB_ENV
```

### Step5: Execute your test suite with CI

After the setup is completed, you can now execute your test suite with the Continuos Integration (CI) pipeline with any tool of your choice.

**Please Note:** *On running the tests with this repository the user should be able to trigger the `GitHub Action` and execute the `SmartUI` tests for `Selenium`, `Cypress and CDP` frameworks excluding `StoryBook`.* 

### Step 6: Commit you changes over git on a branch and raise the PR to main branch.

### Step 7: Now you will see the `lambdatest-smartui-app` in the PR.

## Documentation & Resources :books:
      
Visit the following links to learn more about LambdaTest's features, setup and tutorials around test automation, mobile app testing, responsive testing, and manual testing.

* [LambdaTest Documentation](https://www.lambdatest.com/support/docs/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)
* [LambdaTest Blog](https://www.lambdatest.com/blog/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)
* [LambdaTest Learning Hub](https://www.lambdatest.com/learning-hub/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)    

## LambdaTest Community :busts_in_silhouette:

The [LambdaTest Community](https://community.lambdatest.com/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample) allows people to interact with tech enthusiasts. Connect, ask questions, and learn from tech-savvy people. Discuss best practises in web development, testing, and DevOps with professionals from across the globe 🌎

## What's New At LambdaTest ❓

To stay updated with the latest features and product add-ons, visit [Changelog](https://changelog.lambdatest.com/) 
      
## About LambdaTest

[LambdaTest](https://www.lambdatest.com?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample) is an intelligent unified digital experience testing cloud that helps businesses drastically reduce time to market through faster test execution, ensuring quality releases and accelerated digital transformation. The platforms allows you to perform both real time and automation testing across 3000+ environments and real mobile devices, making it a top choice among other cloud testing platforms. Over 10,000+ enterprise customers and 2+ million users across 130+ countries rely on LambdaTest for their testing needs. 

### Features

* Run Selenium, Cypress, Puppeteer, Playwright, and Appium automation tests across 3000+ real desktop and mobile environments.
* Real-time cross browser testing on 3000+ environments.
* Test on Real device cloud
* Blazing fast test automation with HyperExecute
* Accelerate testing, shorten job times and get faster feedback on code changes with Test At Scale.
* Smart Visual Regression Testing on cloud
* 120+ third-party integrations with your favorite tool for CI/CD, Project Management, Codeless Automation, and more.
* Automated Screenshot testing across multiple browsers in a single click.
* Local testing of web and mobile apps.
* Online Accessibility Testing across 3000+ desktop and mobile browsers, browser versions, and operating systems.
* Geolocation testing of web and mobile apps across 53+ countries.
* LT Browser - for responsive testing across 50+ pre-installed mobile, tablets, desktop, and laptop viewports
    
[<img height="58" width="200" src="https://user-images.githubusercontent.com/70570645/171866795-52c11b49-0728-4229-b073-4b704209ddde.png">](https://accounts.lambdatest.com/register?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)
      
## We are here to help you :headphones:

* Got a query? we are available 24x7 to help. [Contact Us](mailto:support@lambdatest.com)
* For more info, visit - [LambdaTest](https://www.lambdatest.com/?utm_source=github&utm_medium=repo&utm_campaign=playwright-sample)
