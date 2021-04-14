const { assert, expect } = require("chai");
const {before, beforeEach, describe, it } = require('mocha');


const originalAppURL = "https://demo.applitools.com/hackathon.html";
const newAppURL = "https://demo.applitools.com/hackathonV2.html";



describe('Traditional Tests', function() {
    
    beforeEach(async () => {
        if(process.env.IsOriginalAppUrl==='true'){
               await browser.url(originalAppURL);
        }
        else{
              await browser.url(newAppURL);
        }
        
    })

    it('Validate Labels', async () => {
        let header = await $('.auth-header');
        let userLabel = await $('form > div:nth-child(1) > label');
        let passwordLabel = await $('form > div:nth-child(2) > label');
        let username = await $('#username');
        let password = await $('#password');
        let rememberMe = await $('.form-check-label');
        let login = await $('#log-in');

        
        // assert header of the page
        assert.equal('Login Form', await header.getText());
        assert.ok(await header.isDisplayed());
        

        // Assert Text of Username Label
        assert.equal('Username', await userLabel.getText());
        assert.ok(await userLabel.isDisplayed());

        // Assert text of Username Element
        assert.equal('Enter your username', await username.getAttribute("placeholder"));
        assert.ok(await username.isDisplayed()); 

        // Assert Text of Password Label
        assert.equal('Password', await passwordLabel.getText());
        assert.ok(await passwordLabel.isDisplayed());

        // Assert Text of Password Element
        assert.equal('Enter your password', await password.getAttribute("placeholder"));
        assert.ok(await password.isDisplayed()); 
      
        
        // Assert text of Login Element
        assert.equal('Log In', await login.getText());
        assert.ok(await login.isDisplayed());
    
        // Asssert Text of Remember Me Element
        assert.equal('Remember Me', await rememberMe.getText());   
        assert.ok(await rememberMe.isDisplayed()); 
    })
    it('Validate Images', async () =>{
        let logoIcon = await $('.logo-w>a>img');
        let userIcon = await $('.pre-icon.os-icon.os-icon-user-male-circle');
        let fingerprintIcon = await $('.pre-icon.os-icon.os-icon-fingerprint');
        let twitterIcon = await $('a:nth-child(1) > img'); 
        let facebookIcon = await $('a:nth-child(2) > img');
        let linkedInIcon = await $('a:nth-child(3) > img');
        // Assert Logo Icon is Visible
        assert.ok(await logoIcon.isDisplayed()); 

        // Assert User Icon is Visible
        assert.ok(await userIcon.isDisplayed()); 

        // Assert Fingerprint Icon is Visible
        assert.ok(await fingerprintIcon.isDisplayed()); 

        // Assert Twitter Icon is Visible
        assert.ok(await twitterIcon.isDisplayed()); 
        
        // Assert Facebook Icon is Visible
        assert.ok(await facebookIcon.isDisplayed()); 
        
        // Assert LinkedIn Icon is Visible
        assert.ok(await linkedInIcon.isDisplayed()); 
    })

    it('Validate Checkbox',async () => {
        let checkbox = await $('.form-check-input');
        assert.notOk(await checkbox.isSelected());
    })

    // Both username and pssword must be present
    it('Both Username and Password must be present', async () => {
        let errorLocator = await $('.alert.alert-warning');
        let login = await $('#log-in');
        // submit the form
        await login.click();
        assert.equal('Both Username and Password must be present', await errorLocator.getText());
        assert.ok(await errorLocator.isDisplayed());
    })

    // Password must be present
    it('Password must be present', async () => {
        let errorLocator = await $('.alert.alert-warning');
        let login = await $('#log-in');
        let username = await $('#username');
        
        
        await username.setValue("John Smith");
        // submit form
        await login.click();

        assert.equal('Password must be present', await errorLocator.getText())
        assert.ok(await errorLocator.isDisplayed());
    })

    // Username must be present
    it('Username must be present', async () => {
        let errorLocator = await $('.alert.alert-warning');
        let login = await $('#log-in');
        let password = await $('#password');

        await password.setValue("password");
        // submit form
        await login.click();

        assert.equal('Username must be present', await errorLocator.getText());
        assert.ok(await errorLocator.isDisplayed());
        
    })

    // Successful Login
    it('Successful Login', async () =>{
        let login = await $('#log-in')
        let username =await  $('#username')
        let password = await $('#password')
        

        await username.setValue("John Smith");
        await password.setValue("password");
        // submit form
        await login.click();
        // Now need assertions for the next page

    })
})