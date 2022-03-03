/**************************************************************************************************
 *                          Demo For Test Setting Option - Ignored Boxes
 * 
 * While we specify the test settings in capabilities under 'SMARTUI.OPTIONS' we specify the type of error 
 * and what color to display that color in.
 * 
 * Example :  
            let capabilities = {
            ...
                "smartUI.options": {
                ...
                     ignoredBox: box,
                ...
                }
            ...
            }
 

 *                                             How to run this test
    * First go to your Smart Ui project and create a new project.(eg name="ignoredBoxesTest")
    * Next, Update value of "smartUI.project": "ignoredBoxesTest".
    * Then, Run the test by using command 'node ignoredBoxes.js' on line 70 . This will run your first build and create the first screenshot
      which will be BASELINE Screenshot by default.

    * To run the comparison test you need to Update the value of 'waitTime=4' on line 38.  
***************************************************************************************************/

const webdriver = require("selenium-webdriver");
var moment = require("moment");
var waitTime = 2

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME || "username";

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY || "accessKey";

// gridUrl: gridUrl can be found at automation dashboard
//const GRID_HOST = process.env.GRID_HOST || "@hub.sushobhit.dev.lambdatest.io/wd/hub";    //dev
const GRID_HOST =
process.env.GRID_HOST || "@beta-smartui-hub.lambdatest.com/wd/hub";    //connect to beta hub

async function boundingBoxesSearchGoogle(){
    var keys = process.argv;
    let parallelCount = keys[2] || 1;
    let tunnel = keys[3] || false;
    let platform = keys[4] || "Windows 10";
    let browserName = keys[5] || "chrome";
    let version = keys[6] || "latest";

    const box1={
        left: 100,
        top: 200,
        right: 200,
        bottom: 600
    }

    const box2={
        left: 200,
        top: 200,
        right: 200,
        bottom: 600
    }
  
    // Setup Input capabilities
    let capabilities = {
      platform: platform,
      browserName: browserName,
      version: version,
      queueTimeout: 300,
      visual: true,
      "user": USERNAME,
      "accessKey": KEY,
      name: browserName + platform + version, // name of the test
      build: platform + browserName + version, // name of the build
      "smartUI.project": "ignoredBoxesTest",  //******* NOTE - You need to replace this with your newly created project name. *****/
  
      "smartUI.options": {
        "output": {
          "errorColor": {   // Specifies the error Color in it.
            "red": 255,
            "green": 0,
            "blue": 0 
          },
          "errorType": "movement",  
          "transparency": 0.5,
          "largeImageThreshold": 100,
          "useCrossOrigin": false,
          "outputDiff": true
        },
        "scaleToSameSize": true,
        "ignore": "antialiasing",
        "ignoredBox" : [box1,box2],  // Here we can provide a single box or an array pf boxes.
      }
    };
  
    var gridUrl = "https://" + USERNAME + ":" + KEY + GRID_HOST;
    console.log(gridUrl);
    console.log(capabilities);
    console.log("Running " + parallelCount + " parallel tests ");
    let i = 1;
    for (i = 1; i <= parallelCount; i++) {
      startTest(gridUrl, capabilities, "Test " + i);
    }
}

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
  let url = "https://www.lambdatest.com";
  console.log(url);


  await driver
    .get(url)
    .then(function () {
      const session = driver.getSession();

      // For Smartui TakeScreenshot
      setTimeout(function () {
        console.log("taking screenshot ...")
        driver.executeScript("smartui.takeScreenshot").then(out => {
          console.log("RESPONSE :", out)
          return;
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

boundingBoxesSearchGoogle();