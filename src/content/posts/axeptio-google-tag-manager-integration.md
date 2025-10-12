---
author: Aziz Dhaouadi
categories: ["Google Analytics 4", "Consent Management", "Axeptio"]
date: 10/12/2025
featured: true
title: How to Implement Axeptio with Google Tag Manager
---

With more and more regulations being introduced to safeguard users' data online, it has never been more important to ensure compliance and protect your visitors. From GDPR and CCPA to Google's consent enforcement, business owners must navigate complex regulations to ensure their data collection complies with privacy rules. Tools like Cookiebot, CookieYes, and OneTrust help you implement and manage consent to ensure your tracking works according to local regulations. We've previously covered implementing OneTrust and CookieYes with Google Tag Manager and gtag.js. In this tutorial, we'll explore how to implement Axeptio, an innovative consent management platform.

## Who is Axeptio
Axeptio is a French-based SaaS company that provides a **Consent Management Platform** (CMP) enabling websites and apps to collect, manage, and store user consent in compliance with privacy regulations such as the GDPR (EU), Law 25 (Quebec), CCPA (California), and others. Their platform is designed to be no-code, meaning non-technical teams can implement consent flows, customize consent banners, and synchronize with marketing stacks without in-depth development work. The company emphasizes offering a more engaging, “branded consent” experience turning the legal requirement into something that aligns with brand identity and user trust. As of recent data, Axeptio supports over **80,000 websites**, stores billions of consent records, and has expanded roles and presence in Europe, Canada, and Latin America.

## Implementing Axeptio
Implementing consent with Axeptio is straightforward. We are going to review two ways you can implement it through code and Google Tag Manager. We are going to mainly focus on Google Tag Manager but we will show how you can implement this through code just in case that you do not use Google Tag Manager.

### Implementation through Google Tag Manager
The first thing to do is to make your cookie configuration. In the banners section, Axeptio gives you the ability to create a custom configuration or a **Google Consent Mode v2 ready** configuration. For the sake of brevity, we are going to select the latter configuration.

After creating your cookie configuration, a new screen opens up that shows you a preview of your cookie banner (left hand side) and the configuration (right hand side). The configuration section is split into 6 sections:
* Steps
* Consent Mode V2
* Contextual Consent Wall
* Versions
* Advanced Configuration
* Collaborators

### Steps section
You can define different steps in this section. Each step will present the user with information regarding your cookies. By default, a welcome screen is added. The welcome screen provides a brief description on how and why cookies are used. It also shows 3 buttons for the user to reject, choose or accept the cookies. You can add an information screen. An information screen can be added to inform users without requiring a choice. It automatically progresses after a specified delay and is intended solely for displaying technical cookies. Avoid using this screen for audience measurement cookies or cookies that need explicit consent, like advertising and social media trackers. You can also add a "Here are our cookies" screen. This screen showcases your active cookies to your users. If you have a handful of cookies, it is a good idea to add this step so that your users have more information about which cookies are in use and their respective vendors. If you have a lot of cookies, it is better to first categorize them and then add a step for each category. These are the following category you can add:
* Analytics & stats
* User experience
* Targeted advertising
* Chat & support
* Customer relationship
* Emailing tools
* Marketing
* Performance & monitoring
* A/B testing
* Social network
* Other

### Consent Mode V2 section
In this section, the most important thing to do is to enable **Enable Consent Mode V2 (step)**. Doing so ensures that Axeptio sends the right signals to Google Tag Manager and update the consent based on the users' choices. This is important to ensure that your tags are behaving based on the users' latest consent. Also, this helps Google Tag Manager to receive the latest consent status without using external templates or code that updates the consent status. Once you have turned on the setting one thing to remember is to set default parameters to ensure Consent Mode V2 works appropriately.

### Versions
In this section, you get to give a name to your banner, pick a cookies versions (generally tied to region and language such as English Canada), the widget language. In our case, this is English-Canada. And you can also customize the About Axeptio text. This is the text that shows up when the user interacts with the mention on the banner.

### Advanced Configuration
In this section, you can edit every text inside the consent Widget including the button texts and so... you can also get the code to install the consent banner on your website. Since we are going to integrate Axeptio using Google Tag Manager, you do not have to worry about this for now. However, we will still show the code. The installation code looks as follows:
```js
window.axeptioSettings = {
  clientId: "<YOUR-CLIENT-ID>", // This is also your project ID
  cookiesVersion: "datajournal-en-CA",
  googleConsentMode: {
    default: {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500
    }
  }
};
 
(function(d, s) {
  var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
  e.async = true; e.src = "//static.axept.io/sdk.js";
  t.parentNode.insertBefore(e, t);
})(document, "script");

```
### Connecting Google Tag Manager and Axeptio

Now that the configuration is complete, it is time to head to Google Tag Manager. At this point, please do not publish your banner just yet. We first need to connect Google Tag Manager to Axeptio. To do that, head to Google Tag Manager and add the **Axeptio CMP** tag. This tag can be found in the *Community Template Gallery*. Once you have added the tag, the next step is to add your project ID. As for the tag's trigger, choose Consent Initialization. You can find this in the your Axeptio account in the bottom left corner. The next and final step is to configure the default parameters as mentioned above. When you are configuring the Axeptio CMP Tag in the **Google Consent Mode V2** section, activate the consent mode v2 and add a row for the default setting. You do not have to add anything into the Region field. For our configuration, we set all the values set to denied by default. Once that's done we are ready for publishing and testing. 

### Testing the implementation
Head to Axeptio, save your configuration and hit the publish button. Once your consent configuration is published, head over to Google Tag Manager. We have a couple of things to do here before testing in preview mode. The first thing is to make sure that consent overview is activated in Google Tag Manager. In the Admin section, click on Container Settings and make sure that the Enable consent overview box is checked. Next, you will need a Google Analytics 4 or a Google Ads tag to test the implementation on. So, add a Google tag and under **Consent Settings** in the Advanced Settings section, select **No additional consent required**. The Google Tag by default has ad_storage, analytics_storage, ad_user_data and ad_personalization as built-in consent checks. This means that Google Tag Manager will check the value of said categories before firing the tag. Once you are done configuring the tag, it's time to test in preview mode. 

In preview mode, the first check we are going to do is ensure that the Axeptio CMP tag fired on the Consent Initialization event. Click on the event and in the **Tags Fired** section make sure that the tag is there. If you see the tag, it's time to check on two things. The first being the on-page default consent and then the consent on update. Remember that in an earlier step we did set the default consent to *denied*. In the list of Google Tag Manager events (right hand side in the preview), look for the event **Consent Default**. Once located, click on the Consent tab (right to the Tags tab) and you should see a table that looks like this:

| Type | On-page Default | On-page Update |
|------|-----------------|----------------|
| ad_storage | Denied | - |
| analytics_storage | Denied | - |
| ad_user_data | Denied | - |
| ad_personalization | Denied | - |

If you are seeing this on your screen, it means that so far the implementation is correct. Next up, we need to check on the On-page update consent. Since the user did not make a choice so far (we did not see the banner yet), the value should also be denied. That being said, if in the earlier step you set your default consent to be **Granted**, you should make sure that the values match that. Locate the **Consent Update** event and click on the Consent tab. Your table should look like this:

| Type | On-page Default | On-page Update |
|------|-----------------|----------------|
| ad_storage | Denied | Denied |
| analytics_storage | Denied | Denied |
| ad_user_data | Denied | Denied |
| ad_personalization | Denied | Denied |

You can also check the **axeptio_update** event. If you do you will see a third column in the table called **Current State** and the value there, to no surprise, will be Denied. Next, we need to head to our web page in preview mode. First thing to check is the cookie button. The default position is left bottom corner, so look there and you should see said button. Next, click it and open the consent banner. For the test, click on **Let me choose** (middle button) and toggle everything then save. Head back to the preview window in GTM and look for a new **axeptio_update** event. This time, our On-page update should have **Granted** as value across the board. The consent table should look like this:


| Type | On-page Default | On-page Update | Current State |
|------|-----------------|----------------|---------------|
| ad_storage | Denied | Granted | Granted |
| analytics_storage | Granted | Granted | Granted |
| ad_user_data | Granted | Granted | Granted |
| ad_personalization | Granted | Granted | Granted |

Next up, we are going to validate whether data sent to Google Analytics 4 (assuming that your Google Tag is configured with a GA4 property). In the preview window, switch from the Google Tag Manager tab to the Google Analytics tab. If your setup is minimal (just like ours in this tutorial), you should be seeing two events being **Page view** and **User Engagement**. You may be wondering why are we seeing a page view event while consent was denied? And that's a fantastic question. The answer is advanced Consent Mode. Earlier in the configuration, we did not require Google Tag Manager to check for additional consent which allows GTM to send data to Google Analytics 4 using **cookieless pings** when consent is denied. Let's check that. Click on the page view event, and in the new screen look for **Cookie Consent State**. Your value should be **G100**. If you toggle formatting on, you should see a table as follows:

| Storage Type | Consent State |
|--------------|---------------|
| ad_storage | Denied |
| analytics_storage | Denied |


What this means is that Google Analytics 4 received a page view event with consent signals indicating that both analytics and ad storage were denied. GA4, with these signals, will process the data accordingly. If we check on the user engagement event, the **Cookie Consent State**  value will be **G111**. This means that both analytics storage and ad storage were granted. As a side note, here's a table showing the different values for Cookie Consent Stage:

| Code | ad_storage | analytics_storage |
|------|------------|-------------------|
| G100 | Denied | Denied |
| G101 | Denied | Granted |
| G110 | Granted | Denied |
| G111 | Granted | Granted |

The final thing to do here is to run some further tests to make sure everything is working correctly. Reject ad consent and accept analytics then do the opposite and observe the behavior of your tags. Once you confirm everything works as expected, publish your Google Tag Manager container and you are set.

### Implementing Axeptio using Code
In this section, we will explore how you can implement Axeptio using code instead of Google Tag Manager. First of all, please make sure you choose **one and only one** implementation method. Loading the Axeptio SDK with more than one method can cause errors in consent and will raise the error `Axeptio SDK is already loaded`. Just like any other script, you can load this in the **head** tag or, as recommended, in the foot of your pages that is before the end of the **body** tag. Head over to your favorite code editor, open your code base and add the installation script. Here's what the script looks like:

```js
window.axeptioSettings = {
  clientId: "<YOUR-CLIENT-ID>",
  cookiesVersion: "datajournal-en-CA",
  googleConsentMode: {
    default: {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500
    }
  }
};
 
(function(d, s) {
  var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
  e.async = true; e.src = "//static.axept.io/sdk.js";
  t.parentNode.insertBefore(e, t);
})(document, "script");
```

Once you have added the code, save your changes and preview the changes on your local machine or dev/staging environment. At this point, the only thing we want to check for is the presence of the same events we saw earlier in the dataLayer. The events are **Consent Default** and **Consent Update**. You can search for **axeptio_update** as well. Your dataLayer should include the events:

```json
[
    {
        "0": "consent",
        "1": "default",
        "2": {
            "wait_for_update": 500
        }
    },
    {
        "0": "consent",
        "1": "update",
        "2": {
            "analytics_storage": "granted",
            "ad_storage": "granted",
            "ad_user_data": "granted",
            "ad_personalization": "granted"
        }
    },
    {
        "event": "axeptio_update",
        "axeptio_authorized_vendors": [],
        "consent_mode": {
            "version": 2,
            "analytics_storage": "granted",
            "ad_storage": "granted",
            "ad_user_data": "granted",
            "ad_personalization": "granted"
        }
    }
]
```

Next, you will want to conduct the same tests we did in the earlier step. The only difference is that in this section we implemented Axeptio with code instead of the Axeptio CMP tag. That said, please do not add said tag. What you should do is activate the consent setting in Google Tag Manager, configure consent checks on your tags and test their behavior. Again, we are assuming that tags are configured in Google Tag Manager. If you do not use Google Tag Manager and you have implemented Google Analytics 4 and/or Google Ads using gtag.js, your implementation and testing will be a bit different. 

### Implementation through gtag.js
This is going to be a more demanding implementation technique as you would have to decide on how your code behaves based on the current consent status. There are two ways you can do this, at least for Google Analytics and said suite of tools. The first is to update your status consent and send data as is. This is the equivalent of Advanced Mode. Google will collect data and anonymize it if the consent settings are set to denied. The second is the more traditional way of preventing code from firing beacons if consent is denied. For the latter you will need to save your consent in a global variable that you can easily access and update. In order to fetch the latest consent, we will use the [Javascript SDK events](https://support.axeptio.eu/en/articles/274035-listen-to-sdk-events) and then we can update the consent. The following code block will fetch the current consent status after a user confirmed their choice and then send consent update beacons to Google Analytics 4. Please do not copy paste this code directly. This is for illustrative purposes.

```js
axeptioSDK.on('cookies:complete', function(choices){
    console.log(choices.$$googleConsentMode) // This gets the latest consent status from Google Consent Mode
    if(!choices.$$googleConsentMode){
        console.error("Could not fetch latest consent status");
        return;
    }
    let currentConsentStatus = choices.$$googleConsentMode;
    let {version, ...globalConsent} = currentConsentStatus;
    // updating consent with gtag
    gtag("consent", "update", globalConsent);
});
```
Please make sure to customize the code block to fit your code base and programming patterns. If you want to implement the traditional consent behavior, you can adjust the code to check for analytics and ad storage consent before firing the tracking event.

```js
axeptioSDK.on('cookies:complete', function(choices){
    console.log(choices.$$googleConsentMode)
    
    if(!choices.$$googleConsentMode){
        console.error("Could not fetch latest consent status");
        return;
    }
    let currentConsentStatus = choices.$$googleConsentMode;
    const {version, ...globalConsent} = currentConsentStatus;
    // updating consent with gtag 
    gtag("consent", "update", globalConsent);
    if(globalConsent.analytics_storage && globalConsent.ad_storage){
        gtag("event", "we_can_track", {
            "feeling": "happy"
        });
    }
});
```
You'll notice that here we added a check to see if analytics storage as well as ads storage were granted before firing a tracking event. Both methods will work and ultimately it depends on which you are most comfortable with. For other tools such as Amplitude, Mixpanel or Segment you can use the second code block as the basis to ensure that the tools are not collecting data when they are not supposed to.

## Conclusion
If you have followed through the tutorial, congratulations you have successfully implemented Axeptio and your website/application is now compliant with data regulation rules. You learned two implementation methods, with one being more advanced than the other of implementing the solution. If you have any questions or run into issues, feel free to reach out to the Axeptio support team.