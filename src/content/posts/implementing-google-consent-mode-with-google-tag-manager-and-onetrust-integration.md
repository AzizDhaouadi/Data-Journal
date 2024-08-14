---
author: Aziz Dhaouadi
categories: ["Cosent Mode", "Google Tag Manager", "OneTrust"]
date: 04/02/2024
featured: true
image: ./images/ga-consent.png
title: Implementing Google Consent Mode with Google Tag Manager and OneTrust
---

In previous posts we have discussed how you can implement [Consent Mode with Google Tag Manager and CookieYes](/implementing-google-consent-mode-using-cookieyes-integration/), as well as how you can implement [Consent Mode V2 with Google Tag Manager and CookieYes](/implementing-google-consent-mode-v2-using-cookieyes-integration/). In this tutorial, we will walk through how you can implement Google Consent Mode, including Consent Mode V2, with OneTrust and Google Tag Manager. We will discover how this can be done using two different methodologies which should give you enough options when deciding how to implement this integration.

## Implementation Prerequisites

Before we delve into the implementation, you would need to have the following at your disposal:

1. OneTrust account
2. Configured banner for your geolocation rule(s)
3. Google Tag Manager account
4. Consent Mode Activated

It is also recommended to have a basic understanding on JavaScript as well as the dataLayer. This is not mandatory, but it will make sure that you understand the steps in this tutorial faster. Also, keep in mind that the following tags are the following ones:

- Google Ads: this includes Google Ads Conversion Tracking and Re-marketing. Support for Phone Conversions is pending.
- Floodlight
- Google Analytics
- Conversion Linker

If you need to implement Consent Mode for other tags within Google Tag Manager, further configuration is required which we will go through later on in the tutorial.

**Google Consent Mode is no an alternative to script blocking.**

## Method One: Google Tag Manager + OneTrust Consent Mode Integration

For this method, we will be using OneTrust's UI as well as Google Tag Manager's UI. This implementation will not be code-heavy and is the faster of the two. Please note that everything discussed here can indeed be implemented through gtag.js. A future tutorial is going to discuss how to do that , but as far as this tutorial is concerned we will not be discussing gtag.js.

## Implementing Google Consent mode with OneTrust cookie consent

In this step, we will see how you can configure OneTrust's consent settings and sync them with Google's Consent Mode ensuring OneTrust's handling on the consent update command. This will come in handy as you wouldn't worry about adding custom dataLayer events to handle updates of consent which decreases tech debt. Here's how you can enable the integration between Google Tag Manager's Consent Mode and OneTrust's cookie consent:

1. On the Cookie Consent menu, select Geolocation Rules. The Geolocation Rule Groups screen appears.
2. Select a geolocation rule group from the list. The Geolocation Rule Group screen appears.
3. Select a rule to configure.
4. Click the Edit icon in the rule header to configure the rule.
5. Enable the Google Consent Mode setting.By default, the Performance category will be associated with analytics_storage and the Targeting category will be associated with ad_storage, ad_user_data, and ad_personalization. You can change categories to associate with each consent key setting and save the settings for the Geolocation Rule.
   **Please note that is recommended to associate the Targeting category with ad_storage, ad_user_data and ad_personalization**
6. Configure the categories
7. Once Google Consent Mode and all [other configurations](https://my.onetrust.com/s/article/UUID-1b60bb62-5260-6045-738b-09e4fa27c538) are ready, publish the domain script.For more information, see [Publishing and Implementing Cookie Consent Scripts](https://my.onetrust.com/s/article/UUID-7478d3b4-18eb-3ac0-a6fd-fb7ebff9f8dc).
8. Ensure you have implemented the gtag arguments for the default consent type settings across the domain on all pages. Remember that the default settings must be called before Google Tags or OneTrust loads.
   **The order of the code here is vital. If your consent code is called out of order, your consent defaults will not function as expected.**
   The OneTrust script will handle the update commands to the consent type settings in line with the configurations in the geolocation rules based on the user's consent.

## Google Consent Mode V2 with OneTrust's cookie consent

As you may have noticed, there are two new parameters in the Google Consent Mode being ad_personalization and ad_user_data. These two new parameters are the changes introduced in Consent Mode V2.

### Google Consent Mode V2 Updates

The European Commission announced that Google has been designated as a gatekeeper under the Digital Markets Act (DMA). The DMA is a new piece of legislation designed to harmonize platform regulation across the EU and ensure fair and open digital markets. To keep using measurement, ad personalization, and remarketing features, you must collect consent for use of personal data from end users based in the EEA and share consent signals with Google. To support you with collecting granular user consent, Google has updated the consent mode API to include two additional parameters:

- **ad_user_data**: Sets consent for sending user data related to advertising to Google.
- **ad_personalization**: Sets consent for personalized advertising.

See Implementing Google Consent Mode with OneTrust Cookie below to see how you can ensure the V2 updates are added to your OneTrust implementation.

Under the Digital Markets Act (DMA), Google has been designated as a gatekeeper by the European Commission. The Digital Markets Act (DMA) is a recent legislative initiative aimed at standardizing platform regulation throughout the European Union (EU) to promote fairness and openness in digital markets. To continue utilizing features like measurement, ad personalization, and remarketing, it's necessary to obtain consent for the use of personal data from end users located in the European Economic Area (EEA) and to communicate these consent signals to Google. To ensure that you can communicate these consent signals with them, Google has updated their consent API and introduced two new parameters **ad_user_data**
and **ad_personalization**.

**You must implement the 202311.1.0 script version or newer to support the new parameters.**

With the mapping of the new parameters, your implementation is now compliant with Google Consent Mode V2.

### Implementing consent defaults with OneTrust's CMP-GCM Template

It's time to move to Google Tag Manager. To add OneTrust's tag, navigate to your workspace, click 'Add a new Tag', and when prompted to choose the tag type, click on Discover more tag types in the Community Template Gallery, the search for OneTrust CMP. Once you've found the tag add it to you workspace and then it's time for some configuration.
Using this template, we can ensure that we set default consent for the different GCM categories and we can even customize the default settings per region if necessary. If you are introducing defaults per region, ensure that the country names follow ISO-3166 standards. The template will also allow you to link your OneTrust Category IDs with the Google consent mode storage types, enabling the default settings and updates of consent mode to automatically adjust according to user consent.
For the trigger, you can fire the tag on Consent Initialization. If you choose to fire the tag on a different trigger, please ensure that it needs to be fire prior to Google Tags and OneTrust loading, otherwise you risk non-compliance.

## Testing Google Consent Mode

Before we test if the implementation is working correctly, please ensure that you have published your OneTrust script so that everything is up to date. Next, publish you Google Tag Manager workspace.

To make sure everything is working as expected, we will be using the dataLayer command in the console. We will be looking for the consent event before and after the user interacted with the banner to give or revoke consent.
Open the console, and type in dataLayer prior to interacting the banner and give consent. You should see something similar to this:

```json
[
  {
    "gtm.start": 1712007295339,
    "event": "gtm.js"
  },
  {
    "0": "set",
    "1": "developer_id.dYWJhMj",
    "2": true
  },
  {
    "0": "consent",
    "1": "default",
    "2": {
      "ad_storage": "denied",
      "analytics_storage": "denied",
      "functionality_storage": "denied",
      "security_storage": "denied",
      "ad_user_data": "denied",
      "ad_personalization": "denied",
      "wait_for_update": 500
    }
  }
]
```

This indicates that our consent defaults have been successfully implemented. The next step is to interact with the banner and, say, accept all cookie categories. If we do so, your dataLayer should show something similar to this:

```json
{
  "0": "consent",
  "1": "update",
  "2": {
    "ad_storage": "granted",
    "analytics_storage": "granted",
    "functionality_storage": "granted",
    "security_storage": "granted",
    "ad_user_data": "granted",
    "ad_personalization": "granted",
    "region": ["CA-QC"]
  }
}
```

If you were able to see these two events in the dataLayer, or Google Tag Manager, if you are using the preview mode then your implementation is correct. You can also test further by refusing consent categories and ensuring the appropriate tags are not firing. If everything is working as expected, then congratulations you have successfully implemented Google Consent Mode (including the V2 udpate).

If your tags are not respecting user consent, please ensure that consent was configured properly in Google Tag Manager.

### Basic Consent Mode vs Advanced Consent Mode

When implementing the consent mode, it is important to know that there are two modes to the consent mode, basic and advanced. These two differ in their outcome and so is necessary to know which ones you want to implement. Here's a breakdown of both mode:

#### Basic Consent Mode

In the basic version of consent mode, Google tags are blocked from loading until the user engages with a consent banner. Before this interaction, no data is sent to Google. Once the user gives their consent, Google tags are activated and execute the consent mode APIs, sending consent states to Google in this sequence:

1. Transmit default consent states.
2. Update and send the consent states as necessary.

If the user does not provide consent, no data, including the consent status, is shared with Google; the Google tags remain inactive. In such cases, Ads' conversion modeling relies on a generic model.

#### Advanced Consent Mode

In the advanced version of consent mode, Google tags are initially loaded as soon as the website or app is accessed. These tags initiate the consent mode API and perform the following actions:

1. Establish default consent states, which are set to deny unless modified.
2. Send cookieless signals while consent is not granted.
3. Await user interaction with the consent banner to modify the consent states accordingly.
4. Transmit comprehensive measurement data only after consent for data collection is confirmed by the user.

This approach offers a more refined modeling process than the basic version, providing a model tailored to the advertiser instead of a generalized one.

## Overview

| Feature                             | Basic consent mode                                                            | Advanced consent mode                                                                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tag loading                         | Blocked until user interaction with a consent banner.                         | Loads with defaults set to denied, unless configured otherwise.                                                                                     |
| Data transmission                   | No data is sent before a user consents - not even the default consent status. | When consent is denied, consent state and cookieless pings are sent. When consent is granted, cookies are written and all measurement data is sent. |
| Consent states                      | Set after user interaction.                                                   | Defaults set to denied, unless configured otherwise; updates based on user choice.                                                                  |
| Tag behavior after user interaction | Loads and executes consent mode APIs only when a user grants consent.         | Adjusts tag behavior based on user consent choice.                                                                                                  |
| Conversion modeling                 | General model (less detailed modeling).                                       | Advertiser-specific model (more detailed modeling).                                                                                                 |

## Method Two: Google Tag Manager + OneTrustActiveGroups + Google Consent Tag

Now that we have covered the implementation with OneTrust's integration. It is time to cover the alternate method of implementing Consent Mode and Consent Mode V2 with OneTrust. For this method, we will be using a dataLayer Object from OneTrust, and the Google consent mode for setting the default and updating the consent status based on the user preferences. Please note that you will need to have OneTrust implemented outside of Google Tag Manager for this to work. If you are not sure how to do this, you can follow this OneTrust [implementation guide](https://handbook.gitlab.com/handbook/marketing/digital-experience/onetrust-cookie-consent/) to get everything sorted before continuing.

### OneTrustActiveGroups Definition

The first step of this implementation is to capture the OneTrustActiveGroups dataLayer variable. This is the variable we are going to use to determine the users' current consent status. There is a way to access this variable from a different window object which will briefly talk about later on in the article However, we will stick with the dataLayer for now.

To access this variable, define a new variable in Google Tag Manager and choose Data Layer variable as the variable type. Name the variable something easy to identify such as OneTrustActiveGroups. For the variable name to OneTrustActiveGroups and then save the your variable.

**Please note that the variable name needs to be OneTrustActiveGroups in order for the upcoming sections to work**

The next step is to preview your workspace and ensure that you see the variable.

### Google Consent tag for defaults and updates

The next step in the set up is to add the Consent Mode (Google tags) tag by Simo Ahava. To do so, follow these steps:

1. In the Tags tab, click on new
2. For the tag type, after clicking on tag configuration, click on Discover more tag types in the Community Template Gallery
3. Search for Consent Mode (Google tags)
4. Add the tag to the workspace

Now, it's time to configure the Default settings. For this tutorial, we will set all the consent categories to denied. You can change that depending on your use case.

Since we are configuring the default setting, choose consent command to be Default. The next step is to map the different consent categories to OneTrust's Consent IDs. If you have been reading this far, you know that in Method One, this can be done through UI dropdown fields. For this method though, it will require some JavaScript.
Here's the code ready for you to create 4 custom JavaScript variables each for consent category:

```js
function returnAnalyticsConsent() {

  var oneTrustActiveGroups = {{OneTrustActiveGroups}}; //Use the name of your data variable

  if(oneTrustActiveGroups.indexOf("C0002") !== -1) {
  	console.log("granted");
    return "granted";
  } else {
  	console.log("denied");
    return "denied";
  }

}

function returnNecessaryConsent() {

  var oneTrustActiveGroups = {{OneTrustActiveGroups}}; //Use the name of your data variable

  if(oneTrustActiveGroups.indexOf("C0001") !== -1) {
  	console.log("granted");
    return "granted";
  } else {
  	console.log("denied");
    return "denied";
  }

}

function returnFunctionalConsent() {

  var oneTrustActiveGroups = {{OneTrustActiveGroups}}; //Use the name of your data variable

  if(oneTrustActiveGroups.indexOf("C0003") !== -1) {
  	console.log("granted");
    return "granted";
  } else {
  	console.log("denied");
    return "denied";
  }

}

function returnTargetingConsent() {

  var oneTrustActiveGroups = {{OneTrustActiveGroups}}; //Use the name of your data variable

  if(oneTrustActiveGroups.indexOf("C0004") !== -1) {
  	console.log("granted");
    return "granted";
  } else {
  	console.log("denied");
    return "denied";
  }

}
```

**Please use one function per custom JavaScript variable.**

Now that our variables are ready, it's time to map the consent categories to the category IDs.

| Consent Category        | Category ID |
| ----------------------- | ----------- |
| ad_storage              | C0004       |
| analytics_storage       | C0002       |
| personalization_storage | C0003       |
| functionality_storage   | C0003       |
| security_storage        | C0001       |

### Google Consent Mode V2 Implementation

If you have skipped Method One, Google Consent Mode V2 introduced two new parameters that are required to continue using features such as remarketing, measurement and ad personalization in the European Economic Area (EEA). The two new parameters are:

- ad_personalization
- ad_user_data

For this mapping, we will map these parameters to the ad_storage and it is recommended that you do so. However, you can still map these parameters to another category, but is is highly not recommended.

With the mapping in place, your implementation is now compliant with the Google Consent Mode V2.

For the trigger, create a new trigger and select Consent Initialization - All Pages as the trigger type.

The next step is to configure the Update command. To do so, create a new tag, that is a Google Consent (Google tags) tag, and switch the consent command to update. For this tag, keep the mapping the same as the default tag. The next thing to change the trigger. For this tag, we will create a Custom Event trigger, and this event is OneTrustGroupsUpdated. This is the event that OneTrust logs into the dataLayer when the user updates their consent preferences. With this trigger, we can communicate to Google the consent as it changes ensuring the avoidance of custom workarounds.

### Blocking Triggers

This is an option that this configuration offers which acts a prevention methodology. Please note that this option **does not** replace Consent Mode. It is merely a method that acts
an alternative if you do not want to implement consent mode and still block tracking when consent is not given. To use blocking triggers, follow these steps:

1. Select the Triggers tab from the main menu. The Triggers screen appears.
2. Press New. The Trigger Configuration screen appears.
3. Create a new trigger and name it accordingly, e.g. Block Performance Cookies.
4. Press the Trigger Configuration and set the Trigger type to Custom Event.
5. Set the Event name to .\*. This event applies to all events and will allow the exception trigger to override the event that is in the firing trigger.
6. Set the Trigger to fire on Some Custom Events.
7. Select Some Customn Events and set the condition to:
   **OneTrustActiveGroups** [does not match RegEx] **,C0002,**
8. Save the Trigger.
9. Repeat this process for the remaining Cookie Categories.
10. Apply the Trigger to Tags as an Exception.

You can create blocking triggers for the different consent categories. To reiterate, this practice does not replace Google Consent Mode.

## Configuring the Consent Mode

The next step of the implementation is the configuration of the consent mode of the individual tags. To do so, follow these steps:

1. Enable the consent mode overview in your container. In the admin section, click on container settings and then check the Enable consent overview under Additional Settings
2. In the tags tab, click on the shield icon next to the new button to configure the consent for the different tags
3. Select the tags you would want to configure the consent for and then click on the shield icon with the gear. This will open a screen showing 3 consent options:
   1. Not set
   2. No additional consent required. Select this option to indicate that your tag does not need to check for additional consent in order to fire. You may choose to use this option to distinguish tags that you have decided need no additional consent from tags that you have not yet reviewed.
   3. Require additional consent for tag to fire. This tag will only fire if the status of all of the specified consent types is 'granted' when the tag is triggered.

Please note the the No additional consent required is recommended for tags that are "aware" of user consent such as the Google tags or Google Ads. For custom HTML, for instance, do require additional consent especially if cookies are going to be dropped.

## Testing the implementation

Now that everything has been configured, it is time to test the implementation. For this, we will be using the preview mode of Google Tag Manager to ensure that all the tags respect the user's consent.

Start by previewing the your workspace and alternate between allowing specific categories and refusing them. When you refuse a specific categories, the tags that do depend on said category need to fire but be blocked by consent. In fact, there is a section in the screen dedicated to said tags. Another thing to check is the default and updates of the consent.

Next to check for updates, look for the subsequent Consent event, and you should see the On-page Update column update with whatever the user has granted / denied. For instance, if the user accepts all categories, the On-page Update column should show Granted for all categories.

The other tool you can use to ensure that the implementation is working is the Network tab of the Developer Tools. Here's how to do it:

1. Visit the website that has implemented Google Consent Mode.
2. Use the browser's Developer Tools to monitor network activity.
3. Look for the network call to Google Analytics or Google Ads.
4. Check for the gcs= parameter on URLs for consent status. The gcs parameter has the following format: gcs=G1[ad_storage][analytics_storage].
5. Check for the correct gcs= parameter values based on the provided consent. The value for ad_storage and analytics_storage will be one of the following:
   | Value | Description |
   |---------|-----------------------------------------------------------------------------------------------|
   | **G100** | Consent for both ad_storage and analytics_storage is denied. |
   | **G110** | Consent is granted for ad_storage and denied for analytics_storage. |
   | **G101** | Consent is denied for ad_storage and granted for analytics_storage. |
   | **G111** | Consent for both ad_storage and analytics_storage is granted. |
   | **G1--** | The site did not require consent for ad_storage or analytics_storage. |

## Takeaways

If you have followed along this far you should know be equipped with enough knowledge to implement Google Consent Mode, and Consent Mode V2 using Google Tag Manager and OneTrust. Whether you implement this through the native integration or through the dataLayer and other custom tags, your website will be fully compliant and you should be able to take advantage of the cookieless pings with the Google products and see an uplift in your metrics thanks to Google's modelling.
