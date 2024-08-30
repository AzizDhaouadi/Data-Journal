---
author: Aziz Dhaouadi
categories: ["6sense", "Google Analytics 4", "Google Tag Manager"]
date: 07/06/2024
featured: false
image: ./images/ga4-6sense.png
title: Integrate 6sense and Google Analytics 4
---

When working with anonymous website traffic, categorizing the data to establish patterns, especially to determine intent, can be quite confusing and fruitless. Another challenge with website data is its incompatibility with account-based marketing. Website data tends to be anonymized, and at best, user-focused which is far from o the groupings required for account-based marketing. One of the most common tools used for ABM is 6sense. In this tutorial, we will walkthrough how to integrate 6sense with Google Analytics 4 using Google Tag Manager and gtag.js

## Get 6sense API Token & Response Codes

Before starting the integration, it is important to understand the response codes for the 6sense Company Identification API. This API (previously known as Company Details API) identifies anonymous website visitors by taking an IP address and matching it to an account. The returned data includes company firmographics, segments, and score data associated with that IP and company.

When queried the API returns one of the following status codes:
| Code | Definition |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| 200 | **OK**<br>Successfully returned response. The response message varies, depending on the request method/endpoint and the requested data. |
| OTHERS | **Other common HTTP response codes**<br>Please see [HTTP Response Codes](https://api.6sense.com/docs/#http-response-codes) to know more codes. |

Now that we have an understanding of status codes, let's look at how we can generate the 6sense API token. A 6sense API token is an alphanumeric 40 character long key phrase randomly generated that gives you access to the APIs you purchased. 6sense recommends that customers create unique API tokens per use case or integration to help track usage. To get your API token, follow these steps:

- You can go to the [API Token Management](https://abm.6sense.com/login?redirect=%2Fsettings%2Fintegration%2Fapitokenmanagement) page in the 6sense ABM Platform and find your API tokens.
- Copy your API Token

If you need to generate a new token, reach out to support@6sense.com

==This is what a 6sense API Token looks like: aa2e25wd1rrg6fa828fdc32ftahb3461e99f22ec==

## Integrating 6sense using Google Tag Manager

Once you have your API at the ready, it is time to start coding! We need a custom script that will query the 6sense API and then log and event into the dataLayer indicating that the data was received. We will this event to set user properties, enriching the collected data. The script to query Company Identification API looks like this:

```js
window.dataLayer = window.dataLayer || [];

async function fetch6senseData() {
  try {
    var request = await fetch("https://epsilon.6sense.com/v3/company/details", {
      headers: {
        Authorization: "<Your Authorization Token>",
      },
    });
    if (request.ok) {
      var parsedRequestData = await request.json();
      dataLayer.push({
        event: "6sense_data_ready",
        company_details: parsedRequestData,
      });
    } else {
      console.error("Request failed with status:", request.status);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetch6senseData();
```

> Please note that the authorization token should include the word 'Token' in it.

The next step is to create a Google Analytics 4 event to set the user properties. The first step is to create a Custom Event trigger on which our event will fire. Based on the code above, the custom event name will be 6sense_data_ready. Next, configure custom variables for all the user properties you want to set in Google Analytics 4. The piece of code above logs the return data object into the dataLayer. Here's what that object looks like:

```json
{
  "company": {
    "company_match": "Match",
    "additional_comment": "Company name or domain match was found",
    "domain": "g.ucla.edu",
    "name": "UCLA",
    "region": "Northern America",
    "country": "United States",
    "state": "California",
    "city": "Los Angeles",
    "industry": "Education",
    "country_iso_code": "US",
    "address": "308 Charles E. Young Drive North A210 Fowler Building/Box 951510",
    "zip": "90095",
    "phone": "(310) 825-4321",
    "employee_range": "10,000+",
    "revenue_range": "$5B+",
    "employee_count": "22000",
    "annual_revenue": "7449000000",
    "is_blacklisted": false,
    "is_6qa": true,
    "geoIP_country": "United States",
    "geoIP_state": "California",
    "geoIP_city": "San Jose",
    "state_code": "CA",
    "industry_v2": [
      {
        "industry": "Education",
        "subindustry": "Colleges & Universities"
      }
    ],
    "sic_description": "",
    "sic": "",
    "naics": "6113",
    "naics_description": "Colleges, Universities, and Professional Schools"
  },
  "scores": [
    {
      "is_6qa": true,
      "product": "6sense",
      "product_display_name": "6sense",
      "intent_score": 63,
      "buying_stage": "Consideration",
      "profile_score": 9,
      "profile_fit": "Weak"
    }
  ],
  "segments": {
    "ids": [4713, 28237, 218915, 53685],
    "names": [
      "Net New Logo Website Engagement Last 30 Days",
      "6s for 6s: Keyword_Sales Intelligence",
      "Cvent: Researching Virtual Events",
      "EY - Enterprise Accounts (DemandGen)"
    ],
    "list": [
      {
        "name": "Net New Logo Website Engagement Last 30 Days",
        "id": 4713
      },
      {
        "name": "6s for 6s: Keyword_Sales Intelligence",
        "id": 28237
      },
      {
        "name": "Cvent: Researching Virtual Events",
        "id": 218915
      },
      {
        "name": "EY - Enterprise Accounts (DemandGen)",
        "id": 53685
      }
    ]
  },
  "confidence": "Very High"
}
```

For the sake of this tutorial, we will set five user properties: company name, industry, company country, company annual revenue, and profile data confidence.
In Google Tag Manager, go to the variables menu. Under the User-Defined Variables section, click on the New button. For the variable type, select Data Layer Variable, and in the Data Layer Variable Name enter the following:

- company.name to capture the company name
- company.industry_v2[0].industry to capture the company industry
- company.country to capture the company country
- company.annual_revenue to capture the company annual revenue

Make sure you create 5 dataLayer variables, each capturing one of the dimensions we are interested in.

Now that we have our trigger created as well as our custom variables, it is time to create our Google Analytics 4 tag to add our user properties. To create the tag, follow these steps:

1. Head to the tags section in Google Tag Manager
2. Click the New button
3. For the tag configuration, choose Google Analytics and then Google Analytics: GA4 Event
4. In the Measurement ID field, enter your Google Analytics 4 Measurement ID
5. In the event name, enter {{Event}}. This ensures that the event name reflects the one captured based on the trigger. In our case, the event name will be 6sense_data_ready. You can also enter the event name manually.
6. Expand the User Properties dropdown section and click on Add Row.
7. In each row, enter the user property name you would like see reflected in your reporting and then enter the name of its respective dataLayer variable. For instance:
   1. Property Name: company_name
   2. Value: {{DLV - company_name}}
8. Repeat step 7 until you have added all of your user properties
9. For the trigger, choose the one we created above for the 6sense_data_ready custom event

== Make sure that the value of your user properties reflect the variables you have created. ==

Name the tag you just created and then test the implementation by previewing the changes. If everything was correctly implemented, you would be able to see the event being captured along with the user properties in the preview mode in Google Analytics 4. If everything was captured correctly, do not forget to publish your workspace.

## Integrating 6sense using gtag.js

This integration will rely on the gtag.js library so make sure that you are using gtag.js and not Google Tag Manager; otherwise, this will fail.

## Check if gtag.js is deployed on your website

Before starting the integration work, checking if gtag.js is deployed is a must. This is easy to do. In your console, type gtag and if gtag is deployed you should see the following:

`ƒ gtag(){dataLayer.push(arguments);}`

If you do not see the above, please make sure to deploy the library.

Once the library is deployed and the check returns positive, it is time to work on the integration. Here's the full code to integrate 6sense data into GA4 as user properties:

```js
async function fetch6senseData() {
  try {
    var request = await fetch("https://epsilon.6sense.com/v3/company/details", {
      headers: {
        Authorization: "<Your API Token>",
      },
    });
    if (request.ok) {
      const parsedRequestData = await request.json();
      return parsedRequestData?.company;
    } else {
      console.error("Request failed with status:", request.status);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const log6senseDataToGA4 = (companyMetaData) => {
  if (typeof gtag === "undefined") {
    console.error("gtag is not defined");
    return;
  }

  gtag("event", "6sense_data_ready", {
    user_properties: {
      company_name: companyMetaData?.name,
      industry: companyMetaData?.industry_v2[0].industry,
      country: companyMetaData?.country,
      annual_revenue: companyMetaData?.annual_revenue,
    },
  });
};

async function enhanceUserProperties() {
  const companyData = await fetch6senseData();
  console.log(companyData);
  log6senseDataToGA4(companyData);
}

window.addEventListener("load", enhanceUserProperties);
```

Let's breakdown the different functions.

### fetch6senseData()

This function is responsible for fetching data from the 6sense API.

```js
async function fetch6senseData() {
  try {
    const request = await fetch(
      "https://epsilon.6sense.com/v3/company/details",
      {
        headers: {
          Authorization: "Token YOUR_SECURELY_STORED_TOKEN",
        },
      },
    );
    if (request.ok) {
      const parsedRequestData = await request.json();
      return parsedRequestData?.company;
    } else {
      console.error(
        "Request failed with status:",
        request.status,
        request.statusText,
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
```

- Purpose: Fetches company details from the 6sense API.
- Async/Await: Utilizes async and await for handling asynchronous operations.
- Error Handling: Uses try...catch to handle any errors during the fetch operation.
- Response Handling: Checks if the request was successful (request.ok) and logs any errors if the request fails.

## log6senseDataToGA4()

This function logs the fetched data to Google Analytics 4 (GA4).

```js
const log6senseDataToGA4 = (companyMetaData) => {
  if (typeof gtag === "undefined") {
    console.error("gtag is not defined");
    return;
  }

  gtag("event", "6sense_data_ready", {
    user_properties: {
      company_name: companyMetaData?.name,
      industry: companyMetaData?.industry_v2[0]?.industry,
      country: companyMetaData?.country,
      annual_revenue: companyMetaData?.annual_revenue,
    },
  });
};
```

- Purpose: Sends an event to GA4 with user properties based on the 6sense company data.
- Safety Check: Checks if gtag is defined using typeof gtag === 'undefined' to avoid reference errors.
- Optional Chaining: Uses optional chaining (?.) to safely access nested properties of companyMetaData.

### enhanceUserProperties()

This function orchestrates the fetching of 6sense data and logging it to GA4.

```js
async function enhanceUserProperties() {
  const companyData = await fetch6senseData();
  if (companyData) {
    console.log("6sense Company Data:", companyData);
    log6senseDataToGA4(companyData);
  }
}
```

- Purpose: Fetches the company data and logs it to GA4.
- Async/Await: Handles asynchronous operations by awaiting the result of fetch6senseData().
- Logging: Logs the fetched company data to the console for debugging purposes.
- Conditional Check: Ensures that the companyData exists before attempting to log it to GA4.

### Event Listener

This line sets up the function to run when the window finishes loading.
`window.addEventListener('load', enhanceUserProperties);`

- Purpose: Adds an event listener to the window object to call enhanceUserProperties when the window's load event fires.
- Load Event: Ensures that the function runs only after all resources (like images and scripts) have fully loaded, ensuring that all necessary elements are available and the page is fully ready.

The last step is to add the code above to your website and the data will start following into Google Analytics 4.

## Conclusion

With these steps, you should be able to integrate 6sense's Identify API with Google Analytics 4, enhancing your data collection with account-based insights for advanced reporting.
