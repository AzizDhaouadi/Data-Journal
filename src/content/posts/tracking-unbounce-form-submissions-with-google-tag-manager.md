---
author: Aziz Dhaouadi
categories: ["Google Tag Manager", "Unbounce"]
date: 03/03/2024
featured: false
image: ./images/track-unbounce-submissions.png
title: Tracking Unbounce Form Submissions with Google Tag Manager
---

Unbounce is one of the most commonly used landing page builders for teams across the globe, and for good reason. If you are working with Unbounce, in this tutorial will walk through how you can track successful form submissions using Google Tag Manager and send that data to Google Analytics 4, Google Ads or any other destination.

## Pre-requisites

Before we get into the nitty gritty, make sure you have an active Unbounce account, and deployed Google Tag Manager container. Familiarity with JavaScript will be a plus for this tutorial. Following the instructions in this tutorial will get you will successfully track form submissions, however if you need to do any changes, knowledge of web development is required.

## Unbounce Window Object

In order to track successful form submission, we will be using two methods being `beforeFormSubmit` and `afterFromSubmit`. Here's the definition for each:

- beforeFormSubmit: Called after validation has passed, but before the lead has been recorded.
- afterFormSubmit: Called after the lead has been recorded.

beforeFormSubmit and afterFormSubmit are arrays accessible through the hooks object of window.ub, Unbounce's window object. To confirm you can access the arrays, you can type the following in your browser's console:

```js
window.ub.hooks;
```

When you press enter, this is the output you will get:

```js
window.ub.hooks;

Object { beforeFormSubmit: [], afterFormSubmit: (1) […] }
```

For this tutorial, we will be working with the **afterFormSubmit** array. The idea is to track form submissions and send this data to our target destinations and we want to do that after Unbounce has created the lead record. You can also use **beforeFormSubmit** if you choose to. Both will work just fine.

## Tracking Code

Now that we know which method we are going with it is time to write our code which will capture the data we need.

```html
<script>
  window.ub.hooks.afterFormSubmit.push(function () {
    window.dataLayer = window.dataLayer || [];

    dataLayer.push({
      event: "unbounce_successful_form_submission",
    });
  });
</script>
```

This script, when executed will log the event unbounce_successful_form_submission to the dataLayer. This event will later be used as a Custom Event trigger for to send the conversion event to Google Analytics 4, Google Ads and so on.

With this script, you should be able to successfully track your form submissions. However, there are no details in this event which enables us to do further analysis. So, let's add more details allowing us to do advanced analysis on our form submission event. For instance, we can add metadata to the event to answer the following questions:

1. How many conversion each landing page variant has?
2. What is the percentage of conversions that are main goals?
3. Which are the top conversion landing pages?
4. Which users had their conversion uncaptured?

Let's take a look at the new enhanced version of our event:

```js
window.ub.hooks.afterFormSubmit.push(function (args) {
  window.dataLayer = window.dataLayer || [];

  dataLayer.push({
    event: "unbounce_successful_form_submission",
    submission_details: {
      page_variant: window.ub.page.variantId,
      page_name: window.ub.page.name,
      isConversionGoal: args.isConversionGoal,
      visitor_id: window.ub.visitorId,
    },
  });
});
```

When this code executes, whenever a form is submitted, we will get the following details, for example:

- page_variant: l
- page_name: Sign up to my free course
- isConversionGoal: true
- visitor_id: d155ca98-3ccb-443a-a92a-a7c74dc3af18

These details can be pass then to your Google Analytics 4 event in order to enable advanced analysis for the form submit event. Do not forget to add page_variant, page_name, isConversionGoal as well as the visitor_id as custom event parameters in order to be able to use the in your reports, whether in the Explore section or Looker Studio.

If you are wondering how you can check which users had their conversions uncaptured, the answer lies in data export and cross-referencing. Firstly, head to Unbounce and export the list of leads for the specific time period you are interesting in investigating. The next step would be to build a report breaking down the form submission event by visitor ID. The last and final step is to cross reference the data and whoever is missing from the form submission report is a user that had you failed at capturing their submission data. That being said, please **do not** set the visitor_id as the user_id in Google Analytics 4 as this parameter is not eligible.

## Conclusion

In summary, this tutorial equips you with the necessary steps and code to effectively track form submissions from Unbounce using Google Tag Manager, enriching your data collection capabilities for Google Analytics 4, Google Ads, and other platforms. By following the instructions provided, you'll not only be able to monitor basic form submissions but also gather detailed insights for advanced analysis, enhancing your understanding of user behavior and conversion dynamics. It's crucial, however, to remain mindful of privacy and consent practices throughout this process to ensure compliance with data protection regulations.
