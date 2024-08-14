---
author: Aziz Dhaouadi
categories: ["Google Analytics 4"]
date: 05/22/2023
featured: false
image: ./images/ga4-migration.png
title: The Ultimate Google Analytics 4 Migration Guide
---

It's 2023 and that means Google Universal Analytics is sun-setting soon; actually as soon as July 1st. So, if you are still relying on it, it is time to migrate to Google Analytics 4. Unfortunately, relying on UA is not option anymore. As of the indicated date, the tool will stop processing any hit. But what does this mean?

It means that any data you are sending to UA will not be processed and the data will be lost. This is including any data being sent using analytics.js. This is a very important note to keep in mind because if you are sending data to GA4 using the Collect Universal Analytics events setting, your property will not be receiving and processing data. Another important detail to keep in mind that this also includes any third party integration that relies on analytics.js like Shopify.

This being said, it's time to migrate GA4 and secure your web analytics against any data loss risks. If you are not sure where to get started or you are having trouble getting started, continue reading. We are going to outline everything you need to know to complete your migration to GA4.

We are going to highlight 3 methods to migrate to GA4 being gtag.js, Google Tag Manager, and Segment. To make things easier, here are 3 resources you can use to make the migration a lot easier:

- [GA4 Event Generator](https://www.datakyu.co/resources/sample-code-generator.html)
- [Google Tag Manager Container Templates](https://www.datakyu.co/resources/google-tag-manager-container-tempaltes.html)

## Pre-migration checklist

Before you start your migration to Google Analytics 4, there are some preliminary steps that you should take in order to ensure that you are set. Here is the list:

- Check the Universal Analytics property
- To understand which views to turn into audiences
- To understand which filters to migrate
- To understand which events to migrate

Once you have completed these items, continue reading to understand how to proceed with the migration. If you are having any trouble with the items above, we recommend that you do not proceed as the migration can become confusing. The items above will help you build your Google Analytics 4 account structure which is an important part of the migration. If things get very fuzzy, here are some pointers to help you out:

### Turning views into audiences

The loss of the views in the account structure is one of the biggest changes happening in Google Analytics 4. However, this does not necessarily mean that you cannot create something of equivalent purpose. For instance, if you are using views to view specific segments of users based on tracked events, location, language or specific page views, you can recreate this view but as an audience in Google Analytics 4. Briefly, audiences are the equivalent to segments in Universal Analytics. This is a great alternative since a lot of businesses relied on views. This alternative also works if you were segmenting your views based on subdomains. You can use the Hostname dimension in Google Analytics 4 to achieve the same result. Please keep in mind that not all views can be turned into audiences, if your view is using some advanced/custom filters, you may not be able to recreate it. But, you may be able to recreate your set up using GA 4’s [subproperties](https://support.google.com/analytics/answer/11525732?hl=en).

> 💡 Subproperties are only available if you are using Google Analytics 360

## Migrating using gtag.js

gtag.js is the analytics library used with the Google Tag. Using gtag.js, you can use a single tag with multiple Google products without having to add multiple tags. This is the first method we are going to review and this method requires a minimal knowledge of JavaScript. In order to complete the migration, you will have to manually install the tag and also all the events you want to migrate. If you are worried about messing things up, don’t worry, all you have to do is use the GA4 event generator tool linked above and you will be fine. This list should help you with the most important considerations before starting your migration. If things are still unclear, you can use communities to unblock yourself. But, if everything above made sense to you, keep on reading to understand how to migrate your events to Google Analytics 4.

> 💡 The tool will generate the event for you, but you still need to add in the appropriate way to your code base.

## Installing the Google Tag (gtag.js)

The first step in the migration is to add GA4 to your website. This is the simplest step in the migration and instructions are already provided by Google Analytics upon creating a Data Stream. To install the Google Tag (gtag.js) manually, you will need to paste a specific code block immediately after the `<head>` tag on every page you want to track. Please do not add more than one Google Tag on a page; this can cause some issues with your tracking. **You will need to replace the G-XXXXXXXXXX with your actual measurement ID.**

Installing gtag.js is one of the most important steps when migrating using this method. Essentially, a proper installation will ensure that everything that needs to be tracked is, in fact, tracked. An erroneous installation can cause data loss and incomplete data. It is worth mentioning that installing the tag requires access to your source code and the ability to change it. If you do not know how to change your source code or are afraid of causing an issue, please contact your developer and they will be able to take care of the next step. Since we have our code block, it is time to add it to our code base. We know that the code block needs to be added immediately after the `<head>` tag.

Now that our tag is installed correctly, we want to make sure that the snippet is installed on all the pages that we want to track; otherwise, as mentioned before, data loss may occur. To ensure that the Google Tag has been installed properly, type gtag in your browser’s console. If you do not see ReferenceError: gtag is not defined as an error message, your installation is correct. If you do see that message, then go back to your code and make sure the snippet is pasted in the correct spot. After ensuring that the tag is correctly installed, the next step is to migrate your Universal Analytics events. In this step, we will be working with the events that were identified in the pre-migration step.

## Migrating Universal Analytics Events with gtag.js

All right, now we are getting close to completing the migration to Google Analytics 4. Only one more step to go. Now that the Google Tag is installed, we want to use gtag.js to send events to GA4. But, how do we do that? First, we need to understand what is gtag.js?

### What is gtag.js?

Simply put, gtag.js is a JavaScript framework that allows us to add the Google tag to web pages. And some frameworks contain APIs that they can use to perform certain actions. And, gtag.js has an API we can use to send events to Google Analytics 4. In truth the gtag.js’ API can be used for more than sending events, but we will get to that later. For now, we just need to understand how to use the API to send events to Google Analytics 4.

#### gtag.js API Reference

The Google tag (gtag.js) API consists of a single function, gtag(), with the following syntax:

```js
gtag(<command>, <command parameters>);
```

Using this snippet, let’s send an event downgrade_account with the parameters plan and users_per_account:

```js
gtag("event", "downgrade_account", {
  plan: "Premium",
  user_per_account: 3,
});
```

That's it! We now have our account set up properly. However, it is important to note that if we paste this event in our page, the event will be sent whenever the page is loaded. Most of the events that you will be tracking happen on a user interaction, i.e. a button click or a link click, which means our code will need to be readjusted to allow us to track such interactions.

This part requires some knowledge of JavaScript, so pay closer attention. This is not to say what is coming is very difficult. On the contrary, the code used is just vanilla JS and requires only basic understanding of the language. Also, the code will be broken down so that it is clearer.

In order for us to track interactions, the element(s) to be tracked need to be identified and the addEventListener method needs to be used. Here's what this could look like:

```js
// Identifying the modal button
const modalButton = document.querySelector("div.row button.modal-button");

// Adding an event listener to fire the event every time the button is clicked
modalButton.addEventListener("click", (e) => {
  gtag("event", "modal_button_clicked", {
    cta: e.target.innerText,
  });
});
```

This code block is identifying the modal button element on the page by using the document.querySelector method to select the button element with the class "modal-button" that is a child of a div element with the class "row". Once the button element is selected, an event listener is added to it using the addEventListener method. This listener is set to trigger every time the button is clicked.

When the button is clicked, the gtag function is called with the parameters event, modal_button_clicked, and an object containing the property cta which is the inner text of the button element. This will send an event to Google Analytics with the event name modal_button_clicked and the value of the button's inner text as the cta property. This allows tracking how many times the modal button was clicked and with which text. If you are having trouble writing the event tracking code, you can use this [tool](https://www.datakyu.co/resources/sample-code-generator.html) to generate any custom event or default events.

If the tracking has been implemented correctly, you should be able to see the event in GA4’s real-time view. Let’s take a look at another example where we will track a form submission as this is a very common case. The idea is to be able to send an event every time the form is submitted. The event should have the form ID as a parameter to help identify the form. In this demo, we will assume that the form has been submitted correctly.

Here’s what the code will look like:

```js
// Identifying the form to be submitted
const myForm = document.querySelector("myForm");

// Adding an event listener to fire the event every time the form is submitted
myForm.addEventListener("submit", (e) => {
  gtag("event", "submitted_form", {
    form_id: e.target.id,
  });
});
```

1. The first line identifies the specific form that is being targeted by selecting it with the querySelector method and storing it in the variable myForm.
2. The next line adds an event listener to the form that is identified in the previous line. The event listener is listening for the submit event, which means it will fire every time the form is submitted.
3. The callback function within the event listener uses the gtag method, which is a Google Analytics tracking tool, to record an event labeled submitted_form and also includes a form_id property that is passed the ID of the form being submitted (e.target.id). This allows you to track which form on your website is being submitted and how often.

To test if you were successful in tracking, take a look at the Real-Time view and if you are able to see the event, then you are good to go.

By now, you should be able to know how to send events to GA4 using gtag.js. Let's now take a look at the last step in the migration, which is configuring Google Analytics 4.

Now that our events are being tracked and data is flowing in correctly, the last step of the migration is to configure the GA4 property. This step ensures that our conversions are being tracked and that all parameters sent along with the events are accessible during reporting.

> Note: Only move forward with this step if you are sure that data is flowing in correctly.

## Adding Custom Definitions

In this step, you will be defining the parameters sent along with events to make sure that they can be used in reporting inside of Google Analytics 4 or in Looker Studio. To do this, navigate to Admin > Custom Definitions. In this tab, you will be able to add custom dimensions or custom metrics. You can read more about about custom definitions [here](https://support.google.com/analytics/answer/10075209?hl=en).

Let’s add a custom definition for our cta parameter as well as the form_id one. We will be adding custom dimensions. To create a custom dimension, click on Create custom dimensions. In the new tab, add the **Dimension name**; this is the name that will be shown in reports. Next, add a description to help you remember what the dimension represents. You can also skip this as it is an optional field. The last part is to choose a parameter or property from the list or enter the name of a parameter or property you'll collect in the future.

Note that the custom dimensions we are creating are Event Scoped as the parameters are sent along events. So, to create our custom dimensions, we will enter the following information:

- cta parameter
- Dimension name: CTA Text
- Description: Returns the cta text of the clicked buttons
- Event parameter: cta
- form_id
- Dimension name: Form ID
- Description: Returns the ID of the submitted form
- Event parameter: form_id

Creating User Scoped parameters follows a similar method. But, instead of providing the event parameter a **user property** will need to be entered. A user property is sent as an event parameter, the only difference is that the parameter you are sending describes the state of the user instead of sending extra context about the tracked event. The syntax to send user properties is also a bit different. Instead of the event command, we will be using the set command. Let’s have a look at how this would look like:

```js
// Setting a user parameter for the account type when users login
gtag("set", "user_parameters", {
  subscription: "Free",
});
```

## Migrating Events with the dataLayer

To do this, let's go back to our gtag.js examples where we tracked the click of a button and the submission of a form. We are going to do the same thing but with the dataLayer. Here's what the tracking code looks like right now before adding the dataLayer:

```js
// Identifying the modal button
const modalButton = document.querySelector("div.row button.modal-button");

// Adding an event listener to fire the event every time the button is clicked
modalButton.addEventListener("click", (e) => {
  gtag("event", "modal_button_clicked", {
    cta: e.target.innerText,
  });
});

// Identifying the form to be submitted
const myForm = document.querySelector("#myForm");

// Adding an event listener to fire the event every time the form is submitted
myForm.addEventListener("submit", (e) => {
  gtag("event", "submitted_form", {
    form_id: e.target.id,
  });

  gtag("set", "user_parameters", {
    subscription: "Free",
  });
});
```

Here’s what we will be adding:

```js
// Sending the event data of the button click to the dataLayer
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "modal_button_clicked",
  cta: "hello",
});

// Sending the event data of the form submission to the dataLayer
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "submitted_form",
  form_id: "hello",
  subscription: "Free",
});
```

Here’s everything put together:

```js
// Identifying the modal button
const modalButton = document.querySelector("div.row button.modal-button");

// Adding an event listener to fire the event every time the button is clicked
modalButton.addEventListener("click", (e) => {
  gtag("event", "modal_button_clicked", {
    cta: e.target.innerText,
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "modal_button_clicked",
    cta: e.target.innerText,
  });
});

// Identifying the form to be submitted
const myForm = document.querySelector("#myForm");

// Adding an event listener to fire the event every time the form is submitted
myForm.addEventListener("submit", (e) => {
  // Preventing the form from reloading the page on submission
  e.preventDefault();

  gtag("event", "submitted_form", {
    form_id: e.target.id,
  });

  gtag("set", "user_parameters", {
    subscription: "Free",
  });

  // Sending the event data of the form submission to the dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "submitted_form",
    form_id: e.target.id,
    subscription: "Free",
  });
});
```

Now, let's look into how this code works:

1. The first line of the code block is used to identify the modal button on the webpage by selecting it with the querySelector method. The button is selected by its class name "modal-button" within a div with the class name "row".
2. The next line adds an event listener to the modal button that is identified in the previous line. The event listener is listening for the "click" event, which means it will fire every time the button is clicked.
3. The callback function within the event listener pushes an object to the dataLayer, which is an array that is used to store and pass information from the website to the GTM container. This object contains the event name "modal_button_clicked" and a property "cta" that is passed the inner text of the button that was clicked. This allows you to track when the button was clicked and the text of the button.
4. In the second part of the code block, the script is identifying the form to be submitted by using the querySelector method and storing it in the variable "myForm".
5. The next lines of code push an object to the dataLayer that contains an event name "submitted_form" and properties 'form_id' and 'subscription' that is passed the id of the form that was submitted and the status of the subscription respectively. This allows you to track when the form was submitted, the ID of the form, and the subscription status.

The data sent to the dataLayer can then be used to create custom tags, triggers, and variables in GTM, which can be used to track and analyze user behavior, providing valuable insights that can be used to refine marketing strategies and enhance the customer experience on the website.

To verify if the implementation has been successful, we can look at the dataLayer object. After completing an event, open the browser's console and type dataLayer. If the implementation has been successful, you should see something similar to this:

```js
Array(7) [ Arguments, Arguments, {…}, {…}, Arguments, Arguments, {…} ]
0: Arguments { 0: "js", 1: Date Fri Jan 13 2023 10:14:48 GMT-0500 (Eastern Standard Time), "gtm.uniqueEventId": 1, … }
1: Arguments { 0: "config", 1: "G-XXXXXXXXXX", … }
2: Object { event: "gtm.dom", "gtm.uniqueEventId": 3 }
3: Object { event: "gtm.load", "gtm.uniqueEventId": 4 }
4: Arguments { 0: "event", 1: "submitted_form", 2: {…}, … }
5: Arguments { 0: "set", 1: "user_parameters", 2: {…}, … }
6: Object { event: "submitted_form", form_id: "myForm", subscription: "Free", … }
```

You can see that the last item in our array is referring to the form submission event; Hooray!

**Please note that after each event, you should be retyping dataLayer in the console.**

Now that we know our events are properly logged into the dataLayer, let’s create the tags that will fire the events and send the data to our Google Analytics 4 property.

The first step will be creating some variables. Let’s navigate to Google Tag Manager and from there click on Variables. In theUser-Defined Variables section, click on New. In the Variable Configuration tab, choose Data Layer Variable. In the input field, we will need to enter the name of the variable we are insterested in. For the form ID, we will enter form_id, since that is the name of the variable, we are logging into the dataLayer. For the for cta, we will enter cta. Next, give a name for each of the variables and navigate to the Tags.

Once in tags section, click New, and then Choose Google Analytics: GA4 Event in the Choose tag type tab. In Tag Configuration, choose the Google Analytics 4 configuration tag created earlier for the Configuration Tag. Next, add the event name and the for the event parameters, add cta with the value referring to cta variable created and add form_id with the value referring to the form_id created earlier. Now, it’s time to configure the triggers.

Since we are working with the dataLayer, all of our triggers will be based on the events we are logging into the dataLayer. The reason behind this is that it makes it easier for troubleshooting. For instance, if the we create a tag that is supposed to send an event to GA4 when there is a submission based on a dataLayer event, but we are not seeing the event in real-time the first place we will investigate is the code block logging the event into the dataLayer. We will get to troubleshooting later, but this is one of the main benefits of working with the dataLayer.

That being said, let’s configure our tags to fire whenever our events are logged. Let’s navigate to Triggers, click on New, and select Custom Event under Other. In the Event name field, enter the same event name being logged to the dataLayer and leave the Use regex matching off for now. In our case, the first trigger we will create is for the form submission, so the event name will be submitted_form. The second trigger, the event name will be modal_button_clicked. That’s it. Now we are ready to test the implementation. Since, we already know that our events are being logged to the dataLayer, the focus of the test will be on the tags. To test the implementation, the preview feature will be used. Once debugging window loads, the next step will be to test the implementation by clicking on the button and submitting the form. If everything went well, the debug tab should show the tags as fired and which trigger fired them. And that’s a wrap on migrating events with the dataLayer. If you are having trouble writing the code for the events, you can checkout this [resource](https://www.datakyu.co/resources/sample-code-generator.html) where you simply configure the event and they will generate the code for you.

Now, let’s have a look at the traditional way of migrating events with the Google Tag Manager. Please note that it is not required to migrate your events with the dataLayer. It is only recommended to use this method because it offers great flexibility in tag management and also in troubleshooting.

## Migrating events with the Google Tag Manager (without the dataLayer)

The migration using Google Tag Manager without the dataLayer is very straightforward. This step only involves migrating the tags configurations. We will use the same triggers since we want our Google Analytics 4 data to match that of Universal Analytics. So, the first step is the know which tags are going to be migrated. Second, start by selecting a tag as to open its configuration tab. On the top right hand side, click on ⋮ and click Copy.

Start by renaming the tag, and the make sure to write down any configuration such as event category or event label Once you have the details writted down, click on Tag Type and change your tag to Google Analytics: GA4 Event. Your configuration tag should be the one created earlier, enter the name and then if you Universal Analytics tag had an event label and an event category, create 2 event parameters category and label In the value fields, enter the equivalent values. Review the configuration of your tag and if everything looks good, save it. After saving your tag, head over to Google Analytics 4 to create 2 custom definitions for the event parameters category and label. This will allow you to use these dimensions in your reports. If you do not know how to create custom definitions, we discussed the topic above, so scroll up!

That’s it. You have succesfully migrated your first event to Google Analytics 4 without the use of the dataLayer. Repeat this process until you are done with all of your Universal Analytics tags. To ensure the migration has been successful, use the Preview feature of Google Tag Manager and use the debug window to make sure all of the event triggers are firing both UA events and GA4 events. If everything looks good, publish your container and your job is done. Congratulations!

If you are interested in how to migrate to Google Analytics 4 using Segment as the basis, and learn more about the Measurement Protocol API as well as server-side migration just scroll down or keep on reading. We will talking about all these details in the upcoming section. Before we talk about Segment and the other details, here are some recommendations for the events naming conventions as well as the benefits of working with the dataLayer.

## Events Naming Convention for Google Analytics 4

- To choose a name for your new event, follow these rules:
- Event names are case sensitive. For example, my_event and My_Even are two distinct events.
- Event names must start with a letter. Use only letters, numbers, and underscores. Don't use spaces.
- Event names can include English and non-English words and letters.
- Do not use reserved prefixes and event names

## Reserved Prefixes

- \_ (underscore)
- firebase\_
- ga\_
- google\_
- gtag.

## Reserved Event names

- app_remove
- app_store_refund
- app_store_subscription_cancel
- app_store_subscription_convert
- app_store_subscription_renew
- first_open
- first_visit
- in_app_purchase
- session_start
- user_engagement

## Benefits of Working with the dataLayer

Here are some of the advantages of using the data layer in Google Tag Manager (GTM):

1. Improved data accuracy: The data layer allows for the storage and passing of information from the website to GTM in a standardized format, which improves the accuracy of the data collected.
2. Enhanced flexibility: The data layer enables marketers to collect and track any data they want, regardless of the type of tag or analytics tool being used. This allows for greater flexibility in tracking and analyzing data.
3. Simplified data management: The data layer eliminates the need for hard coding data into website tags, making it easier to manage and update data without the need for IT involvement.
4. Greater control over data collection: The data layer allows marketers to control which data is collected and when, providing greater control over data collection and analysis.
5. Enhanced data analysis: The data layer allows for the creation of custom tags, triggers, and variables in GTM, which can be used to track and analyze user behavior, providing valuable insights that can be used to refine marketing strategies.
6. Improved website performance: The data layer can be used to track website performance metrics, such as page load times and bounce rates, which can be used to improve the overall performance of the website.

## Migrating to Google Analytics 4 using Segment

If you have made it so far, thanks for reading. Also, you may be using Segment and you are wondering how to migrate to Google Analytics 4 using this tool. If that’s you, keep reading. If you are just curious about Segment and Google Analytics 4 and how you can use them together, keep on reading.

> 💡 Please note that this section does not explain how to install Segment or how to track and indentify users. It is considered that all the implementation has been made and is valid.

In this section, the concept will be explored to enable you to work with Segment and Google Analytics 4. The first concept we will explore is server-side tracking. The second concept is the Measurement Protocol API. These concepts are key to understanding how the migration to Google Analytics 4 will happen when working with Segment. Let's dive right in.

The first thing that needs to be known is the relationship between Segment and Google Analytics 4. Segment is a Customer Data Platform that helps with data standardization. Segment acts as a central repository for data collection and distribution, which allows marketers greater flexibility for data management. Google Analytics is a web analytics platform that allows for analysis of marketing and product data.

The goal of using Segment as the migration base is to avoid any extra work related to data collection. The question is: how can I use this tool that is already collecting data to migrate to GA4? The answer is to add Google Analytics 4 as a destination. But what does that even mean? If you are familiar with Segment, you will know that a destination acts as a data recipient. A data recipient will receive data from Segment or from another source like Hubspot, Stripe, or any other data-generating platform. Since Segment has the data we need, we are simply going to route it to Google Analytics 4. But how do we do that? Let's find out.

Now that we know how to work with gtag.js, Tag Manager, and the dataLayer, it is time to learn about the Measurement Protocol and server-side tracking. If you are in the digital marketing industry, especially since the iOS 14 update, you must have heard the term server-side tracking. It’s kind of a hot topic and also the source of a headache for many, but it’s not as complicated as it may seem.

Simply put, server-tracking is the ability to send data from non-web environments to analytics tools such as Google Analytics 4 so that we can analyze it and uncover insights. The non-web environments can be servers or mobile apps. This operation usually involves sending data through HTTP Requests from one server to another which avoids worries about browser blockers or data inaccuracies. There are some limitations to this operation, but they are tool-specific. We will dive into the limitations of server-side tracking with GA4 later.

But how can we send data to Google Analytics 4 through HTTP requests? This is where the Measurement Protocol gets involved. The Measurement Protocol is a feature that allows developers to send data directly to Google Analytics servers from non-web based environments, such as mobile apps or servers. This enables developers to track user interactions and collect data from devices, such as IoT (Internet of Things) devices, that are not typically tracked by web analytics tools. Developers use the Measurement Protocol to send data to Google Analytics using a simple HTTP request, similar to how web pages send data to Google Analytics.

So now that the Measurement Protocol and server-side tracking are a bit clearer, let’s dive into the migration. But, before we do so, you do not have to worry about doing much coding here, Segment will actually take care of the integration and work its magic in the background, all that is required to do is the data mapping which tells Segment how to translate its already collected data and send it to Google Analytics 4. Also, some configuration is required to activate the integration.

Let’s start with the configuration part. To configure the integration between Segment and Google Analytics 4, we will need a Measurement ID and a Measurement API secret key.

The Measurement ID Web stream details, and the Measurement API secret key needs to be generated. To generate one, navigate to the data stream you want to generate a key for, click on said stream and then click on Measurement Protocol API secrets. After reviewing and accepting the terms, click on create. Give the API secret a nickname such as Segment integration and click create to get your key.

It’s now time to navigate to Segment. Before getting started, Google Analytics 4 needs to be added as a destination. Here’s how to do that:

1. Go to the Segment web app and click on the "Catalog" button.
2. From the Destinations Catalog, search for "Google Analytics 4" and select it.
3. Click on the "Configure Google Analytics 4" button on the top-right corner of the screen.
4. Select the source that will send data to Google Analytics 4 and provide a name for the destination.
5. On the Settings tab, enter the Measurement ID and API Secret associated with your GA4 stream and click Save.

Once this has been configured, it is time to work on the mappings. Segment offers pre configured mappings and also the ability to build custom mappings.

> 💡 Please note that individual destination instances have support a maximum of 50 mappings.

Here’s a list of the configured mappings:

- Page View
- Select Promotion
- View Item List
- Begin Checkout
- Refund
- Add to Cart
- Add Payment Info
- Add to Wishlist
- View Item
- Sign Up
- Purchase
- View Promotion
- View Cart
- Login
- Custom Event
- Remove from Cart
- Search
- Select Item
- Generate Lead

If there is an event you want to migrate that does not match any of the events above, you can always create your own mapping. To create your mapping, proceed as follows:

1. Click on New Mapping
2. Choose Custom Event
3. For the event type, choose tracking
4. Add the event name. This is going to be an event name being sent to Segment. This setting will act as the trigger which when registered tells Segment to send an event to GA4
5. In the User Properties section, add any parameters to send with the event
6. In the Event Parameters section, add any parameters to send with the event
7. Test the mapping
8. If everything looks good, click Save

That's it! Using the preconfigured mappings and custom ones, you have successfully migrated to Google Analytics 4 using Segment as the basis.

Before we wrap things up, there is some information that needs clarification. This migration is only recommended if marketing data is not of utmost importance. While server-side migration offers high accuracy, it does not offer any insights on acquisition and traffic mediums, particularly for GA4's server-side migration. The Measurement Protocol does not offer any mappings for UTM parameters and other browser-level data.

> 💡Note: While the Measurement Protocol does not automatically map such data, it can still be sent as custom dimensions for analysis.

That being said, only consider this option if what is to be analyzed is purely product usage data where traffic and user acquisition is not of high importance. If you want to have access to marketing data, please consider one of the options above, which are the Google Tag Manager or gtag.js.

That's a wrap, folks. By this point, you should be able to migrate from Universal Analytics to Google Analytics 4 without any issues. If at any point you are facing any issues and you are unsure how to proceed, feel free to reach out.

PS: You can refer to this [page](https://gist.github.com/AzizDhaouadi/cc61191a46ef5d1d720153ff96dc74e0) if you want the full tracking code mentioned in the article
