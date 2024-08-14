---
author: Aziz Dhaouadi
categories: ["Cosent Mode", "Googel Tag Manager", "CookieYes"]
date: 03/07/2024
featured: false
image: ./images/ga-consent.png
title: Implementing Google Consent Mode V2 with CookieYes
---

The deadline for implementing Google Consent mode V2 has passed and if you are advertising in the EU/EAA/UK, you will need this setting configured in order to continue ad personalization and remarketing capabilities for visitors from the mentioned reasons. If you fail to comply, you will lose access to these capabilities. If you are unsure where to start, in this article, we will walk through 2 ways you can implement Google Consent Mode V2 with CookieYes.

## What is Google Consent Mode V2? What's new?

Google's Consent Mode version 2 (v2) represents an advancement in the original Consent Mode, enhancing how website publishers and advertisers manage explicit user consent for web tracking in compliance with privacy laws like the GDPR.

The latest iteration of Consent Mode introduces significant updates for better compliance with privacy standards and to offer users more transparency and control over their data. Key enhancements include the introduction of two new parameters:

- ad_user_data: This parameter captures a user's consent decision regarding the sharing of their data with Google's advertising services. The consent can either be "granted" or "denied," as determined by the user's interaction with the site's cookie consent banner. A "denied" status means Google's advertising tags will not collect or transmit identifiable user information.
- ad_personalization: Reflecting a user's choice on ad personalization and remarketing, this parameter shows whether a user has agreed to or declined these features. Based on the user's consent, captured through the consent interface, a "denied" status will disable personalized advertisement functionalities, including remarketing and interest-based targeting.

## Pre-Requisites

Before we delve into the details of the implementation, it is important that you have a published Google Tag Manager container as well as a CookieYes account. If you have Consent Mode active, that's even better. If you not, you can refer to this [implementation guide](implementing-google-consent-mode-using-cookieyes-integration) to start your implementation.

## Implementing Consent Mode V2 with Google Tag Manger CMP Template

The easiest and most straightforward way to implement Consent Mode V2 is using the Google Tag Manager template offered through the integration between Google Tag Manager and CookieYes. To use this method however, you need to implement Consent Mode through the template. This will not work if you have implemented consent mode through the custom script that is gtag.js or through Google Tag Manager outside of the template. If you want to implement the consent mode through the Google Tag Manager template, here's the [official documentation](https://www.cookieyes.com/documentation/features/integrations/implementing-google-consent-mode-using-cookieyes/#Method_1_I_5) to get you started. Once your have configured Consent Mode through the template, all you have to do is to update the CMP template to use the two newly added parameters ad_personalization and ad_user_data.

After you have updated the template, you can publish your changes. With these changes live, you have successfully implemented the Consent Mode V2 using Cookieyes's CMP template in Google Tag Manager. Please do not forget to test your implementation. Also make sure to follow the instructions in the official documentation to make sure you have configured the template correctly before updating to use Consent Mode V2.

## Implementing Consent Mode V2 using Google Tag Manager outside the CPM template

If you followed our tutorial on how to implement Consent Mode using Google Tag Manager, you will notice that our implementation does not rely on the CMP template. The way consent was implemented using our methodology relies on:

1. Cookieyes's Cookie (stores user's current consent)
2. Consent Mode (Google tags)
3. Custom JS variables which return the user's consent mode
4. Cookieyes' GCM setting

Let's get into how you can update your set up to implement Consent Mode V2. First, log into your workspace and update the Consent Mode (Google tags) tag.

In this updated version of the tag, you see the two new parameters ad_personalization and ad_user_data. When you do update the tag, all consent settings will be set to denied. What you need to do is change the configuration so that each consent setting is mapped to the right custom JS variable that captures the user's consent choice for that category. In our linked tutorial, we do walk you through how you can create custom JavaScript variables that capture the user's current consent. For the two new parameters, map them to reflect the Advertising consent choice since they are indeed tied to advertising.

Once you have updated your the tag and mapped out the parameters, it's time to test the new implementation. Preview your workspace, and check the consent status of the different consent settings on the Consent call in your Debug window. The next step is to verify that our tags did not and did, indeed, respect our consent settings. After confirming that our tags are respecting the current consent settings, it is time to update the settings. This time will accept all cookies except Advertising ones to ensure that the new Consent Mode V2 parameters are mapped correctly to that setting. If your implementation is correct, only 3 consent types are still denied:

1. ad_storage
2. ad_user_data
3. ad_personalization

You can check to see if any tags related to analytics storage are now firing properly. After you are done confirming, it's time to update the ad_storage and see if everything works as expected. Head to your consent banner and accept advertising cookies. One final thing to confirm prior to publishing your container is if advertising tags are firing as expected. When you are done checking and are sure everything looks good, proceed to publishing your container. Congratulations, you have successfully implemented Google Consent Mode V2 using Google Tag Manager without using the CMP template.

## Conclusion

Google Consent Mode V2 is essential for advertisers in the EU/EAA/UK to maintain compliance with privacy laws and uphold user trust through transparent data practices. By implementing this advanced consent management tool, businesses can ensure their advertising strategies are both effective and privacy-compliant. The transition to Consent Mode V2, while technical, is a crucial step in aligning with legal standards and user expectations for data privacy. Stay proactive in adapting to these regulations to safeguard your advertising capabilities and foster a respectful relationship with your audience.
