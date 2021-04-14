const {before, beforeEach, describe, it, after, afterEach} = require('mocha');
const {Eyes, Target, VisualGridRunner, BrowserType, RectangleSize, BatchInfo, Configuration, ClassicRunner, DeviceName,ScreenOrientation} = require('@applitools/eyes-webdriverio')
const originalAppURL = "https://demo.applitools.com/hackathon.html";
const newAppURL = "https://demo.applitools.com/hackathonV2.html";

let runner;

describe('Visual Tests', async function() {

    before(async() => {
        // initialize the batch
        batchInfo = new BatchInfo("WDIO Visual AI TESTS");
        // initialize the runner
        runner = new ClassicRunner();

    });
   
   
    beforeEach( async function() {
        if(process.env.IsOriginalAppUrl==='true'){
            await browser.url(originalAppURL);
        }
        else{
            await browser.url(newAppURL);
        }
        eyes = new Eyes(runner);

        let conf = new Configuration();
        conf.setBatch(batchInfo);
        conf.setApiKey(process.env.APPLITOOLS_API_KEY);
        eyes.setConfiguration(conf);   
        
        // yes.setServerUrl('SET_YOUR_DEDICATED_CLOUD_URL')
        await eyes.open(browser, "Login Page Demo Classic", this.currentTest.title, new RectangleSize(800, 600));
    })
    
    afterEach( async function() {
        try {
            // end the eyes test
            await eyes.closeAsync();
        } finally {
            // if tests were aborted before eyes.closeAsync() was called, this ends the test as aborted, if the test had been successfuly closed, this has no effect
            await eyes.abortAsync()
        }

    })
    it('Page View', async () => {
        // Add visual here replacing all 21 assertions in the following tests:
            // validateLabels
            // validateImages
            // validateCheckBox
        await eyes.check("Login Page", Target.window().fully()); 
        
    })

    it('Username and password not present', async () => {
        let login = await $('#log-in')
        // submit the form
        
        await login.click();
        await eyes.check("Username and password must be present", Target.window().fully());
    })

    it('Username must be present', async () => {
        let login = await $('#log-in')
        let username = await $('#username')
        await username.setValue("John Smith")
        // submit the form
        await login.click();
        await eyes.check("Username must be present", Target.window().fully());
    })
    
    it('Password must be present', async () => {
        let login = await $('#log-in')
        let password = await $('#password')
        await password.setValue("ABC$1@");
        // submit the form
        await login.click();
        await eyes.check("Password must be present", Target.window().fully());
    })

    it('Successful Login', async () => {
        let login = await $('#log-in')
        let username = await $('#username')
        let password = await $('#password')
        await username.setValue("John Smith");
        await password.setValue("ABC$1@");
        // submit the form
        await login.click();
        await eyes.check("Successful Login", Target.window().fully());

    })
    after(async () => {
        const results = await eyes.getRunner().getAllTestResults(false);
        console.log(results);
        console.log(results.getAllResults());
        
    })
   
})

