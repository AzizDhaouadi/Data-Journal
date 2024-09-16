---
author: Aziz Dhaouadi
categories: ["Google Ads", "Google Tag Manager"]
date: 09/15/2024
featured: true
image: ./images/data-viz.png
title: Set up Enhanced Conversions for Google Ads with Google Tag Manager
---

As tracking restrictions become tighter and tighter, enabling ad platforms with First-Party data has never been more important. In this tutorial, we will discuss how you can implement Google Ads' Enhanced Conversions with Google Tag Manager to provide Google Ads with the right data for your campaign optimizations.

## What is Enhanced Conversions?

Enhanced conversions is a feature that aims at improving the accuracy of conversion measurement. The feature supplements any existing conversion tags by sending hashed first-party data collected from the website while being privacy compliant. Enhanced Conversions uses a secure one-way hashing algorithm known as `SHA256` on your data before sending to Google. This ensures that customer data such as email addresses are protected. This hashed data is later matched with signed-in Google accounts to attribute your conversion to ad events, such as clicks or views.

<aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
💡 Conversions measured by importing <a href="https://support.google.com/google-ads/answer/2401634" target="_blank">Google Analytics</a> goals aren't supported for enhanced conversions. If you'd like to use enhanced conversions, consider setting up a new Google Ads conversion action with the Google tag or Google Tag Manager.

</aside>

## Implementation Pre-requisites

Before we dive into the implementation, it is recommended to review this list to ensure that the implementation goes as smoothly as possible:

- Know where the conversion tag fires. What is the conversion page URL? This can be a confirmation page URL.
- What is the conversion event trigger? How does the conversion tag fire? Is it a button click? Or is it a form submission? Or is it on a page view?
- Make sure that there is first-party customer data available on the conversion page. The available data should be email, full name and home address and/or phone number
- How is the conversion tracking set up? This setup requires an understanding of the conversion tracking setup and possibly code changes. So, make sure you have access to the code base or you have access to your developers to communicate requirements
- If your conversion tags are set using URLs, enhanced conversions can only be set using Javascript or CSS selectors options or automatic enhanced conversions
- The impact results in the conversion action table willƒ be seen about 30 days after implementing enhanced conversions successfully.

## Turning on Enhanced Conversions for Web

<aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
🚨 The following instructions are based on the new design of the Google Ads user experience.
</aside>

1. In your Google Ads account, click the **Goals** icon .
2. Click the **Conversions** drop down in the section menu.
3. Click **Settings**.
4. Expand the “Enhanced conversions” section.
5. Check “Turn on enhanced conversions for web”.
6. Review compliance statement. To enable enhanced conversions you must confirm that you'll comply with our [policies](https://support.google.com/adspolicy/answer/7475709) and that the [Google Ads Data Processing Terms](https://privacy.google.com/businesses/processorterms/) apply to your use of enhanced conversions. Click **Agree** **and continue** to acknowledge your acceptance of these terms.
7. Click the dropdown to choose a method for setting up and managing user-provided data. Select “Google Tag Manager”.
    
    <aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
    🚨 <b>Note</b>: If Google enhanced conversions data is collected in a way that’s different from Google Tag Manager, that data may not be processed. For instance, since we selected that we are going to send enhanced conversion data through Google Tag Manager and we try sending data through the Google Ads API, the data sent through API won’t be processed.
    </aside>
    
8. Click Go to **Google Tag Manager** and follow the instructions to complete the process in Google Tag Manager

## Setting up Enhanced Conversions in Google Tag Manager

There are 3 ways we can set up enhanced conversion in Google Tag Manager, and we will review them separately so you can choose the method that suits you best.

- **Automatic collection**: This method allows the tag to automatically detect and collect user-provided data on the page. This method is the easiest and quickest out of the three, but it is not as reliable as adding a code snippet or specifying CSS selectors or Javascript variables.
- **Code**: Add a code snippet on the website that sends hashed user-provided data for matching. This method is the most reliable as it ensures that you are consistently sending properly formatted data whenever the conversion tag fires. This method is the most suitable if you wish to enhance the accuracy of enhanced conversions.
- **Manual configuration**: Specify which CSS selectors or Javascript variable on the conversion page contain the relevant user-provided data. This method is more precise than the automatic collection, but it is not as reliable or consistent as adding code to the website. This method is not recommended is you frequently change the website’s code. The latter can create inconsistencies that may break enhanced conversion tracking. If you do consistently update your code base, it is recommended that you use dataLayer variable or add code to your website to capture user-provided data. To reiterate, if you frequently change the website formatting, this method is not recommended it could disrupt the CSS selector method event the Javascript method if you are creating your variables based on `querySelector` or `querySelectorAll`

<aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
💡 It is best practice to use the ID or data attributes to retrieve the value from a DOM element. IDs are unique and less likely to change over time. Data attributes are also less prone to change over time. Both of these attributes change less over time unlike properties such classes. 
</aside>

### Set up enhanced conversions using automatic collection in Google Tag Manager

Automatic collection can be set up using 2 different methods:

- **Standard automatic enhanced conversions**: this is the recommended method when user-provided data is available on the conversion event page. For instance, if your conversion event page is a purchase confirmation page and data present on the page includes the user details such as email, phone number or address, use this method.
- **Automatic enhanced conversions with the user-provided data event tag**: this is the recommended method when the customer data is not available on the conversion event page, but it is instead available on a previous page. For instance, if the conversion event page is the purchase confirmation page and user’s data is entered on a previous page prior to the confirmation page, use this method.

<aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
<b>Note</b>: If you use the user-provided data event tag method, first-party customer data will be automatically detected on pages that users visit before reaching the conversion page. With this setup, you authorize Google to use an ads cookie to collect hashed, first-party customer data on your behalf and to connect that data with subsequent conversion events occurring within the same user session on your behalf. All data not connected to a conversion is deleted. If you implement Consent Mode, the ads cookie will be subjected to the ad_storage consent status of the Consent Mode feature, where implemented.
</aside>

### Set up standard automatic enhanced conversions

1. Click **Workspace**, then click **Tags** from the navigation menu.
2. Select the Google Ads conversion tracking tag that you’d like to implement enhanced conversions with and edit that tag.
    - Make sure that this conversion action has the same conversion tracking ID and label as the conversion action that you enabled enhanced conversions for in your Google Ads account.
3. Click **Include user-provided data from your website**.
4. In the dropdown, select **New Variable** or use an existing variable if you’ve already set one up.
5. Select **Automatic collection**.
6. Click **Save** for the variable and then save the conversion tracking tag.

### Set up automatic enhanced conversions with user-provided data event tag

1. Click **Workspace**, then click **Tags** from the navigation menu.
2. Click **New** to create a new tag.
3. Click **Tag Configuration** and select **Google Ads User-Provided Data Event**.
4. Fill in your Google Ads Conversion Tracking ID.
    - Make sure that this conversion action has the same conversion tracking ID and label as the conversion action that you enabled enhanced conversions for in your Google Ads account.
5. In the dropdown, select **New Variable**.
6. Select **Automatic**.
7. Name the variable.
8. Click **Save**.
9. Click **Triggering** in the Google Ads User-Provided Data Event Tag. This is where you anticipate that the user data will be available.
10. Click the plus icon.
11. Click **Trigger Configuration**.
12. Click **Form Submission**.
13. Select **All Forms**.
14. Select **Save** and then save your new Google Ads User-Provided Data Event tag.

<aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
<b>Note</b>: You must select form submission for enhanced conversions to work properly
</aside>

### Set up conversions using manual configuration in Google Tag Manager

The first step in this method is to find which variables we are going to use to set up enhanced conversions.

1. Navigate to the page where user-provided data appears. This data may appear on the conversion page or on a previous page. Identify any customer data that is displayed on the page you want to send to Google. At least one of the following fields must be provided:
    1. Email (preferred)
    2. Address - First name, last name, postal code, and country are required
        1. Optional: Street address, city, and region as additional match keys
    3. A phone number can also be provided as a standalone match key but is recommended to be sent along with an email
2. Once the customer data on the page is identified, you will need to copy the CSS selectors and enter those in Google Tag Manager. You can also data layer variables if they already exist. This allows enhanced conversion tags to know which pieces of data to hash and send to Google. It’s important to keep the conversion page open.
3. In a separate tab, open Google Tag Manager to set up manual enhanced conversions. This can be done in 2 different ways.
    1. **Standard manual enhanced conversions**: Use this method when user-provided data is available on the conversion event page.
    2. **Manual enhanced conversions with user-provided data event tag**: Use this method when user-provided data is not available on the conversion event page but is instead available on a previous page
    
    <aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
    <b>Note</b>: If you use the user-provided data event tag method, first-party customer data will be automatically detected on pages that users visit before reaching the conversion page. With this setup, you authorize Google to use an ads cookie to collect hashed, first-party customer data on your behalf and to connect that data with subsequent conversion events occurring within the same user session on your behalf. All data that is not connected to a conversion is deleted. If you implement Consent Mode, the ads cookie will be subjected to the ad_storage consent status of the Consent Mode feature, where implemented.
    </aside>
    

### Set up standard manual enhanced conversions

1. Click **Workspace**, then click **Tags** from the navigation menu.
2. Select the Google Ads conversion tracking tag that you’d like to implement enhanced conversions with and edit that tag.
    - Make sure that this conversion action has the same conversion tracking ID and label as the conversion action that you enabled enhanced conversions for in your Google Ads account.
3. Click **Include user-provided data from your website**.
4. In the dropdown, select **New Variable** or use an existing variable if you’ve already set one up.
5. Select **Manual configuration**.
    - You may also select “Code” if you'd like to use Custom Javascript or other data objects to send your data through Google Tag Manager. This method requires data to be formatted in a particular way, so if you’d like to do this, you can read the “Code” instructions below. Here you'll see “User provided data” at the top of the page, followed by all the pieces of customer data which you can include as part of your enhanced conversion tag.
6. For the relevant user data field that you'd like to provide via enhanced conversions, click on the dropdown menu and select **New Variable**.

<aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
<b>Note</b>: if you already have unhashed variables in the data layer, you can select those instead of creating new variable.
</aside>

1. In the “Variable Configuration” screen, select **Choose a variable type to begin setup**. In the “Choose Variable Type” screen, select **DOM Element**.
2. Back on the “Variable Configuration” screen, change “Selection Method” in the dropdown to “CSS Selector.”
3. Give your variable a title.
4. Enter the CSS selector that references your users’ data into the “Element selector” input field (see section below on how to find the CSS Selector). You can leave the “Attribute name” field blank (more on this below).
5. Click **Save** for the variable and then save the conversion tracking tag.

### Set up manual enhanced conversions with the user-provided data event tag

1. Click **New** to create a new tag.
2. Click **Tag Configuration** and select **Google Ads User-Provided Data Event**.
3. Fill in your Google Ads Conversion Tracking ID.
    - Make sure that this conversion action has the same conversion tracking ID and label as the conversion action that you enabled enhanced conversions for in your Google Ads account.
4. In the dropdown, select **New Variable**.
5. Select **Manual configuration**.
6. For the relevant user data field that you'd like to provide via enhanced conversions, click on the dropdown menu and select **New Variable**.
7. In the “Variable Configuration” screen, select **Choose a variable type to begin setup**. In the “Choose Variable Type” screen, select **DOM Element**.
8. Back on the “Variable Configuration” screen, change “Selection Method” in the dropdown to “CSS Selector.”
9. Give your variable a title.
10. Enter the CSS selector that references your users’ data into the “Element selector” input field (see section below on how to find the CSS Selector). You can leave the “Attribute name” field blank. (more on this below).
11. Click **Save**.
12. Click **Triggering** in the Google Ads User-Provided Data Event Tag. This is where you anticipate that the user data will be available.
13. Click the plus icon.
14. Click **Trigger Configuration**.
15. Click **Form Submission**.
16. Select **All Forms**
17. Select **Save** and then save your new Google Ads User-Provided Data Event tag

<aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
<b>Note</b>: You must select form submission for enhanced conversions to work properly
</aside>

### Identifying CSS Selectors and inputing them in Google Tag Manager

This section is for readers that are not familiar with CSS Selectors. If you are, you can skip ahead. This section will show you how to copy CSS Selectors from you conversion event page and paste them into enhanced conversions variables. If you already have data layer variables that capture the relevant data, you can use those instead of creating new variables.

1. Navigate to your website in a separate and keep (or open) a Google Tag Manager page
2. Identify the user-provided data you want to send with enhanced conversions. This data may be on the conversion page or on a previous page
3. Use your mouse to right-click on top of it and select **Inspect**
4. You will see the **Developer** **Tools** launch within your browser
5. Within the source code presented in the Developer Tools page, you will see highlighted code. This code is the page element where you need to extract CSS Selectors for the customer data your right-clicked
6. Depending on your browser, select **Copy Selector**
7. In the other tab, with Google Tag Manager open, paste that text in the **Element selector** field
    1. For reference, it should look something similar to but not exactly like this `tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > custEmail` 
8. Click **Save**
9. Repeat the steps above for all the user-provided data you want to send with enhanced conversions
10. In Google Tag Manager, click **Save**

## Set up enhanced conversions using Code in Google Tag Manager

### Identify and define enhanced conversions variables

In this step, the goal is to make sure the variables needed like email, address are available on the conversion page where the Google Ads conversion tag fires. If you are unsure which page this is, contact your developer. Once you have confirmed which information is available on the conversion event page, you will need to store this data inside a global Javascript variables. 

You can either send unhashed data, which Google will normalize and hash before the data reaches the servers. Or, you can normalize and hash data yourself. 

### Hashing and normalizing data

If you decide to normalize and hash the data yourself, follow these instructions:

### Normalization:

- Remove leading or trailing whitespaces
- Convert the text to lowercase
- Format phone numbers according to the [E.164 strandard](https://en.wikipedia.org/wiki/E.164)

### Hashing

- Use hex [SHA256](https://support.google.com/google-ads/answer/9004655)

The following table lists more information about customer data variables. You can name the variables as you prefer and use the `Key Name` column to know how said variable should be referenced in the enhanced conversions tag. Please note, all data shoud be passed as `String` type variable.

| **Data Field** | **Key Name** | **Description** |
| --- | --- | --- |
| Email address | `email` | User email.
| Email address | `sha256_email_address` | Hashed user email.
| Phone number | `phone_number` | User phone number. Must be in [E.164 format](https://en.wikipedia.org/wiki/E.164), which means it must be 11 to 15 digits including a plus sign (+) prefix and country code with no dashes, parentheses, or spaces.
| Phone number | `sha256_phone_number` | Hashed user phone number.
| First name | `address.first_name` | User first name.
| First name | `address.sha256_first_name` | Hashed user first name.
| Surname | `address.last_name` | User last name.
| Surname | `address.sha256_last_name` | Hashed user last name.
| Street address | `address.street` | User street address. Example: '123 New Rd' |
| City | `address.city` | User city name. Example: `Southampton’ |
| Region | `address.region` | User province, state, or region. Example: `Hampshire’ |
| Postal code | `address.postal_code` | User post code. Example: 'SO99 9XX' |
| Country | `address.country` | User country code. Example: 'UK'. Use 2-letter country codes, per the ISO 3166-1 alpha-2 standard. |

The next steps will be to enable enhanced conversions in Google Tag Manager and reference the customer data variables. 

### Enable enhanced conversions in Google Tag Manager

1. Sign in to Google Tag Manager, click **Workspace** then click **Tags** from the navigation menu
2. Select the Google Ads conversion tracking tag and edit the tag
    1. If you have not set up your Google Ads conversion tracking tag, you can read more about that in [Google Ads conversions](https://support.google.com/tagmanager/answer/6105160)
    2. Make sure this conversion action has the same conversion tracking ID and label as the conversion as the conversion action you enabled enhanced conversions for in Google Ads
3. Click **Include user-provided data from your website**
4. Click **Select user-provided data variable**, the select **New Variable**
5. In the new `User Provided data variable` , select **Code** at the bottom
6. Under `Choose Variable Type` , select **Custom Javascript**
7. Copy the following code in the custom Javascript variable

```javascript
function () {

return {

"email": yourEmailVariable , // replace yourEmailVariable with variable name that captures your user’s email

"phone_number": yourPhoneVariable , // repeat for yourPhoneVariable and following variable names below

"address": {

"first_name": yourFirstNameVariable ,

"last_name": yourLastNameVariable ,

"street": yourStreetAddressVariable ,

"city": yourCityVariable ,

"region": yourRegionVariable ,

"postal_code": yourPostalCodeVariable ,

"country": yourCountryVariable

}

}

}
```

<aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
💡 <b>Note</b>: you can also hardcode the field with a string or use a function instead of using variables
</aside>

### Code sample for normalized and hashed variables

```javascript
gtag("set", "user_data", {
  sha256_email_address: yourNormalizedandHashedEmailVariable,
  sha256_phone_number: yourNormalizedandHashedPhoneVariable,
  address: {
    "address.sha256_first_name": yourNormalizedandHashedFirstNameVariable,
    "address.sha256_last_name": yourNormalizedandHashedLastNameVariable,
    city: yourCityVariable,
    region: yourRegionVariable,
    postal_code: yourPostalCodeVariable,
    country: yourCountryVariable,
  },
});
```

As mentioned above, the phone number must be in E.164 format, which means it must be 11 to 15 digits including a plus sign (+) prefix and country code with no dashes, brackets or spaces.

1. For each type of customer information in the code above, replace the placeholder variables with the name of the global Javascript variable containing the piece of customer data on the conversion page
    1. If your site does not collect a field,  remove the field entirely from the code rather than leaving it blank. For instance, if your website only collects emails, your Javascript variable would look like this:
    
    ```javascript
    function(){
    	return {
    		"email": yourEmailVariable 
    	}
    }
    ```
    
2. Click **Save**

The next step is validate that enhanced conversions is working properly. 

## Validate Enhanced Conversions Implementation

To verify your implementation, navigate the conversion page and follow the steps below. Please test your implementation as soon as you are done with your set up.

### Validate the implementation using Developer Tool

1. Rick click on your web page
2. Click **Inspect** and select the **Network** tab
3. Make sure Network activity is being recorded
4. Enter `google` in the search bar
5. Find the network request that is going to `googleadservices.com/pagead/conversion` or `google.com/pagead/1p-conversion` 
6. Click **Payload** to view the list of query string parameters
7. Look for a parameter `em` with a hashed string as the value. The value should start with `tv.1~em` followed by a long string of characters. If you see the `em` parameter, this means that the enhanced conversion tag is picking up and hashing the enhanced_conversion_data object

<aside style="background: #f1f1ef; width: 100%; border-radius: 4px; padding: 12px 16px 12px 12px">
💡 If you see the `em` parameter but you only see `tv.1~em` without a long hashed sting following it then you are sending the enhanced conversions parameter but it is empty. This may happen if user-provided data is not available at the time of conversion.
</aside>

### Review the Diagnostics report to confirm your implementation (after 48 hours)

After 48 hours of implementing enhanced conversions, you’ll be able to view the tag diagnostics report in Google Ads, which you can use to validate that the implementation is working properly. Follow these instructions to get there:

1. In the Google Ads account, click the Goals icon
2. Click the Conversions drop down in the section menu, then click Summary 
3. Click the conversion action that has enhanced conversions enabled
4. Select Diagnostics from the page menu at the top. You’ll be able to see your enhanced conversion tag diagnostics report and the metrics for your enhanced conversion in each section
5. Review the various health checks to make sure everything is working as expected
6. If the tag diagnostics report notified you that something may be wrong, follow the instructions in the notification and the Help Center to troubleshoot