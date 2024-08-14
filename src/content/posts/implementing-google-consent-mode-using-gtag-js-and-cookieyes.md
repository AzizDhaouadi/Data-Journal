---
author: Aziz Dhaouadi
categories: ["CookieYes", "Consent Mode"]
date: 04/04/204
featured: false
image: ./images/ga-consent.png
title: Implementing Google Consent Mode using gtag.js and CookieYes
---

In this new article covering the Consent Mode (and, Consent Mode V2) we will be covering how you can implement Consent Mode using gtag.js and CookieYes. However, whatever we will discuss in this article can be used to implement Consent Mode with any other Consent Management Platform.

## Pre-requisites

Before we get started, there are only two things you need to get started with the implementation:

1. A CookieYes published script
2. Familiarity with JavaScript

We recommended familiarity with JavaScript in many of our articles, but for this tutorial it is highly recommended that you are familiar with JavaScript as we will be using the gtag.js library. In any case, here's a quick overview that provides the necessary details.

## gtag.js Refresher

gtag.js serves as a unified framework that allows websites to send data to Google Analytics, Google Ads, and Google Marketing Platform. It streamlines the integration of these services, enabling efficient tracking of user interactions, site analytics, and ad performance.

For Consent Mode implementation, gtag.js is crucial as it manages the consent states—what data can be collected and processed based on user consent. A clear understanding of gtag.js commands, especially related to consent ('consent', 'default', and 'consent', 'update'), is essential. These commands help in setting up the initial consent state and updating it as users modify their preferences.

## Why understanding gtag.js & JavaScript is important

The implementation of Consent Mode heavily relies on using JavaScript to manipulate the consent states within gtag.js. Here’s why understanding both is crucial:

- **JavaScript Fundamentals**: A good grasp of JavaScript basics, such as variables, functions, and event handling, is necessary to implement the consent logic effectively.
- **gtag.js Operations**: Understanding how gtag.js works, including its consent commands, helps in configuring and updating consent settings accurately in response to user interactions.

## The Consent Command

The first step in the implementation is going over the consent commands of the gtag.js library. These commands will allow us to set the default consent and update it as users change their preferences. Here's what a consent command looks like:

```js
gtag('consent', <default || update>, {
  <consent categories>
});

```

If this doesn't make sense, don't worry we will be looking into these commands in detail as the tutorial progresses.

## Setting Default Consent

Implementing Consent Mode (V1 or V2) can be summarized into 2 actions:

1. Set default consent state before the user grants consent
2. Update the consent state based on the user interactions with the consent settings
   So, let's explore how we can set the default consent. In this tutorial, we will deny consent by default for all the parameters. You can modify this to suit your implementation by switching whatever is set to denied to granted.

```js
// Match ad_storage and ad_user_data to ad_storage
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  personalization_storage: "denied",
  functionality_storage: "denied",
  security_storage: "granted", // These are necessary cookies so they are always set to granted by default
});
```

Let's break down each part of the command:

1. **gtag('consent', 'default', {...})**:
   1. gtag: This is the function call to Google's global site tag (gtag.js) library
   2. 'consent': This indicates that the command is related to user consent settings.
   3. 'default': This specifies that the provided settings should be applied as the default consent state for all types of storage and data handling.
2. **Inside the {...} are the specific consent configurations**:
   1. 'ad_storage': 'denied': Denies consent for storage related to advertising, like cookies that track users for advertising purposes.
   2. 'ad_user_data': 'denied': Denies consent for using user data in advertising, which might include demographic details, interests, and other ad-targeting information.
   3. 'ad_personalization': 'denied': Denies consent for personalizing ads based on user behavior and preferences.
   4. 'analytics_storage': 'denied': Denies consent for storing data related to analytics, like cookies that track user interactions with the website.
   5. 'personalization_storage': 'denied': Denies consent for storing data used for personalizing the user experience on the site.
   6. 'functionality_storage': 'denied': Denies consent for storing data necessary for certain website functionalities, like user preferences and settings.
   7. 'security_storage': 'granted': Grants consent for storage necessary for security purposes, like cookies used to authenticate users or protect against fraudulent activity. This is typically always granted as it's essential for the website's security functions.

Now that we have our command ready, it is time to wrap it inside a script tag which yields the following:

```html
<script type="text/javascript">
  // Define dataLayer and the gtag function.
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  // Set default consent to 'denied' as a placeholder
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    personalization_storage: "denied",
    functionality_storage: "denied",
    security_storage: "granted",
  });
</script>
```

## Optional: Handling asynchronous integrations with CMPs

When your banner loads asynchronously, there's a chance it won't execute before your Google tags. To manage these cases, use wait_for_update with a specified time in milliseconds to determine the delay before sending data.
For instance, if you want to default ad_storage to denied on a specific page, yet permit your Consent Management Platform (CMP) to modify the consent status, employ wait_for_update. In the code example below, analytics_storage is initially set to denied, and the consent tool has a 300-millisecond window to invoke **gtag('consent', 'update', ...)** prior to the activation of the tags:

```js
gtag("consent", "default", {
  analytics_storage: "denied",
  wait_for_update: 300,
});
```

## Updating Consent

Now that we know how to set the default consent, it is time to explore step 2 of implementing Consent Mode which using updating the consent status. We will explore how to update this in 2 steps. The first step is studying the consent update command and the second step we will see when to call this function based on the user's interactions with the CookieYes banner.

### gtag('consent', 'update' ...)

Say the user interacted with our banner and has accepted all the cookie categories, here's the command that we can use to update the consent status:

```js
gtag("consent", "update", {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
  personalization_storage: "granted",
  functionality_storage: "granted",
  security_storage: "granted",
});
```

Now, all data collection related to measurement and advertising can be fired as they user gave their consent for such tracking to be activated. While this command will work if you were to copy/paste it in the console, the code is not dynamic. What if the user were to change their consent preference again? This is where the CookieYes comes in. Using an event listener, we can fire the gtag('consent', 'update' ...) command whenever, wherever the user updates their consent preferences. Let's see how we can do that:

```js
// Update consent categories
document.addEventListener("cookieyes_consent_update", function (eventData) {
  const currentConsentDetails = eventData.detail;

  if (typeof currentConsentDetails === "undefined") {
    return;
  }

  const consentObject = {};
  const acceptedCookies = currentConsentDetails.accepted;
  const rejectedCookies = currentConsentDetails.rejected;

  acceptedCookies.forEach((cookieCategory) => {
    switch (cookieCategory) {
      case "analytics":
        consentObject.analytics_storage = "granted";
        consentObject.personalization_storage = "granted";
        break;
      case "advertisement":
        consentObject.ad_storage = "granted";
        consentObject.ad_user_data = "granted";
        consentObject.ad_personalization = "granted";
        break;
      case "functional":
        consentObject.functionality_storage = "granted";
        break;
    }
  });

  rejectedCookies.forEach((cookieCategory) => {
    switch (cookieCategory) {
      case "analytics":
        consentObject.analytics_storage = "denied";
        consentObject.personalization_storage = "denied";
        break;
      case "advertisement":
        consentObject.ad_storage = "denied";
        consentObject.ad_user_data = "denied";
        consentObject.ad_personalization = "denied";
        break;
      case "functional":
        consentObject.functionality_storage = "denied";
        break;
    }
  });

  gtag("consent", "update", consentObject);
});
```

Here's a breakdown of the code snippet:

1. Event Listener Registration:
   1. document.addEventListener("cookieyes_consent_update", function(eventData) {...}): Registers an event listener for the cookieyes_consent_update event, which triggers when there are updates to cookie consent preferences.
2. Handling Event Data:
   1. const currentConsentDetails = eventData.detail: Extracts the details of the consent update event, which includes information about accepted and rejected cookie categories.
   2. Checks if currentConsentDetails is undefined and exits the function if true, to handle cases where no consent details are provided.
3. Consent Processing:
   1. Initializes an empty consentObject to store the updated consent settings.
   2. Iterates over acceptedCookies and rejectedCookies arrays from currentConsentDetails, categorizing cookies into analytics, advertisement, and functional.
4. Updating Consent Status:
   1. For each accepted cookie category, it sets the corresponding properties in consentObject to 'granted'.
   2. For each rejected cookie category, it sets the corresponding properties in consentObject to 'denied'.
5. Google Tag Update:
   1. Calls gtag('consent', 'update', consentObject) to update the Google tags' consent configuration based on the user's choices.

Please note that we did not check for personalization in the code snippet as it was mapped to the analytics_storage category. You can change this by mapping it to performance or any category of your choice. Here are the categories you can check against:

- necessary
- functional
- analytics
- performance
- advertisement
- other

**The event listener used is proper to CookieYes. If you are using a different CMP, please refer to their documentation to see window methods to use for updating consent.**

## Putting Everything Together

The order of the code here is vital. If your consent code is called out of order, consent defaults will not work. Depending on business requirements, specifics may vary, but in general, code should run in the following order:

1. Load the Google tag. This is your default snippet code. The default snippet should be updated to include a call to gtag('consent', 'default', ...).
2. Load your consent solution. If your consent solution loads asynchronously, use wait_for_update to make sure things happen in the correct order
3. If not handled by your consent solution, call gtag('consent', 'update', ...) after the user indicates consent.

```html
<script>
  // Define dataLayer and the gtag function.
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  // Set default consent to 'denied' as a placeholder
  // Determine actual values based on your own requirements
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    personalization_storage: "denied",
    functionality_storage: "denied",
    security_storage: "granted",
  });
</script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", "TAG_ID");
</script>

<!-- Create one update function for each consent parameter -->
<script>
  document.addEventListener("cookieyes_consent_update", function (eventData) {
    const currentConsentDetails = eventData.detail;

    if (typeof currentConsentDetails === "undefined") {
      return;
    }

    const consentObject = {};
    const acceptedCookies = currentConsentDetails.accepted;
    const rejectedCookies = currentConsentDetails.rejected;

    acceptedCookies.forEach((cookieCategory) => {
      switch (cookieCategory) {
        case "analytics":
          consentObject.analytics_storage = "granted";
          consentObject.personalization_storage = "granted";
          break;
        case "advertisement":
          consentObject.ad_storage = "granted";
          consentObject.ad_user_data = "granted";
          consentObject.ad_personalization = "granted";
          break;
        case "functional":
          consentObject.functionality_storage = "granted";
          break;
      }
    });

    rejectedCookies.forEach((cookieCategory) => {
      switch (cookieCategory) {
        case "analytics":
          consentObject.analytics_storage = "denied";
          consentObject.personalization_storage = "denied";
          break;
        case "advertisement":
          consentObject.ad_storage = "denied";
          consentObject.ad_user_data = "denied";
          consentObject.ad_personalization = "denied";
          break;
        case "functional":
          consentObject.functionality_storage = "denied";
          break;
      }
    });

    gtag("consent", "update", consentObject);
  });
</script>
```

Make sure to replace TAG_ID with your actual Measurement ID. You can load these on every page to make sure on every page in case the user consent does not persist.

## Best practices

It's advisable to tailor the default consent settings to the regions where consent banners are displayed to your visitors. This approach ensures that data collection complies with regional requirements, allowing Google tags to modify their behavior as needed. Moreover, it prevents the potential loss of data in areas where consent banners are not necessary or relevant.
The provided code sets the default consent settings universally, meaning it applies the same settings across all regions without tailoring them to specific areas where consent banners are displayed.

## Conclusion

With the code provided above, you should be able to implement Consent Mode using gtag.js and cookieyes giving you the flexibility of setting consent right from your source code.
