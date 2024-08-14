---
author: Aziz Dhaouadi
categories: ["Google Tag Manager", "Typeform", "Google Analytics 4"]
date: 03/29/2023
featured: true
image: ./images/track-hubspot.png
title: Track Typeform Forms with Google Tag Manager & Google Analytics 4
---

Tracking user interactions with online forms is essential to optimize for your forms' submission as well as conversion rate. If you're using Typeform to create forms for your website or application, you may know that it is not that straighforward to track form submissions and dropoffs outsite of the integration Typeform has with Google Analytics 4.

In this blog article, we'll show you how to track Typeform forms using Google Tag Manager (GTM) and Google Analytics 4 (GA4). With this setup, you can easily capture form events and send them to GA4 for analysis and reporting. By the end, you'll have a comprehensive understanding of how to track Typeform forms and you can this methodology to send conversiond data to Google Ads and other platforms, if needed. Let's dig right in.

## Current Tracking Challenges

If you have worked with Typeform before, you would have noticed that it is not very straightforward to track form interactions in Google Analytics outside of the integrations that Typeform offers. The main reason behind this is that Typeform is embedded as an iframe. Iframes are not very friendly when it comes to tracking particularly tracking using Google Tag Manager which is commonly user especially with Google Analytics 4.

That being said, outside the methods we will be showing today, tracking is still possible throught the use of the postMessage() method in JavaScript. However, this method requires quite an advanced knowledge of JS. Another challenge to this tracking method is cross-browser compatibility. All this said, you can still proceed with this method should you choose to. If you need any help generating the tracking code using the dataLayer, check out our free [Google Analytics 4 tracking code generator](https://www.datakyu.co/resources/sample-code-generator.html).

## Tracking Form Interactions

### Tracking Form Interactions for HTML Embeds

There are two main ways to add a Typeform form to your website and that is using HTML or using JavaScript. This being said we will look at how you can track form interactions for both methods, so whatever you end choosing you can track your froms without problems.

To kick things off, we will look at tracking form interactions with HTML embeds which is the default method of including Typeform forms on your website. To get started, after building your form and publishing it, click on the share button in the top menu and then select the Embed on a web page option in the left side panel. Then choose the format of the embed and click on Start Embedding. At this stage, a pop up window should appear with the header Embed your typeform with followed by:

- Wordpress
- Squarespace
- Webflow
- Shopify
- General Embeds

We are going to select General Embeds, but you can select whatever option you would like. This will not affect the upcoming steps. Here's what the embedding code will look like for a standard embed:

```html
<button
  data-tf-popup="<form-id>"
  data-tf-opacity="100"
  data-tf-size="100"
  data-tf-iframe-props="title=Political Poll (copy)"
  data-tf-transitive-search-params
  data-tf-medium="snippet"
  style="all:unset;font-family:Helvetica,Arial,sans-serif;display:inline-block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background-color:#0445AF;color:#fff;font-size:20px;border-radius:25px;padding:0 33px;font-weight:bold;height:50px;cursor:pointer;line-height:50px;text-align:center;margin:0;text-decoration:none;"
>
  Try me!
</button>
<script src="//embed.typeform.com/next/embed.js"></script>
```

Firstly, if you are copy pasting this code snippet, please do not forget to replace the <form-id> with your actual form id otherwise the proceeding steps will not work. For the next step, we will be changing the code snippet by adding data-tf-on-submit="submit" to our button element. It should look like this:

```html
<button
  data-tf-popup="<form-id>"
  data-tf-on-submit="submit"
  data-tf-opacity="100"
  data-tf-size="100"
  data-tf-iframe-props="title=Political Poll (copy)"
  data-tf-transitive-search-params
  data-tf-medium="snippet"
  style="all:unset;font-family:Helvetica,Arial,sans-serif;display:inline-block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background-color:#0445AF;color:#fff;font-size:20px;border-radius:25px;padding:0 33px;font-weight:bold;height:50px;cursor:pointer;line-height:50px;text-align:center;margin:0;text-decoration:none;"
>
  Try me!
</button>
```

Once we have this in place, it is time to add the JS code snippet that will be executed once the form is successfully submitted. To log our event into the dataLayer, we will be using the onSubmit callback function. The onSubmit function fires when a user successfully submits the typeform by clicking the "Submit" button. Let's take a have a look at how to do this:

```html
<script>
  // this function needs to be available on global scope (window)
  function submit(formId) {
    console.log(`Form ${formId} submitted`);
  }
</script>
```

Let's put everything together:

```html
<button
  data-tf-popup="<form-id>"
  data-tf-on-submit="submit"
  data-tf-opacity="100"
  data-tf-size="100"
  data-tf-iframe-props="title=Political Poll (copy)"
  data-tf-transitive-search-params
  data-tf-medium="snippet"
  style="all:unset;font-family:Helvetica,Arial,sans-serif;display:inline-block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background-color:#0445AF;color:#fff;font-size:20px;border-radius:25px;padding:0 33px;font-weight:bold;height:50px;cursor:pointer;line-height:50px;text-align:center;margin:0;text-decoration:none;"
>
  Try me!
</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  // this function needs to be available on global scope (window)
  function submit(formId) {
    console.log(`Form ${formId} submitted`);
  }
</script>
```

Here's a breakdown of the different parts of the code:

The button is created using HTML markup, and includes several data attributes that are used to configure the Typeform popup. These attributes include:

- data-tf-popup: the ID of the Typeform form to display in the popup
- data-tf-opacity: the opacity of the popup (in this case, set to 100%)
- data-tf-size: the size of the popup (in this case, set to 100%)
- data-tf-iframe-props: a list of properties to apply to the popup's iframe element
- data-tf-medium: the medium used to embed the form (in this case, set to "snippet")
- style: a list of CSS styles to apply to the buttonThe button also includes the text "Try me!".
- The first script tag includes the Typeform embed.js script, which is required to create the Typeform popup.
- The second script tag defines a JavaScript function named submit(), which logs a message to the console indicating that the specified Typeform form has been submitted. The function takes an object with a single property formId that specifies the ID of the submitted form.

When a user clicks the button, the Typeform popup is displayed, allowing them to fill out and submit the specified form. When the user submits the form, the submit() function is called with the ID of the submitted form, and a message is logged to the console indicating that the form has been submitted.

All right! Time to add Google Tag Manager into the mix. To send our form submit event to GTM, we will need to use the dataLayer. The dataLayer is a JavaScript object that is used to pass information from your website to your Tag Manager container. This information can be used by tags to fire events, send data to other services, or update the DOM. To send our event to Google Tag Manager, the following addition needs to be added to our code.

```html
<button
  data-tf-popup="<form-id>"
  data-tf-on-submit="submit"
  data-tf-opacity="100"
  data-tf-size="100"
  data-tf-iframe-props="title=Political Poll (copy)"
  data-tf-transitive-search-params
  data-tf-medium="snippet"
  style="all:unset;font-family:Helvetica,Arial,sans-serif;display:inline-block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background-color:#0445AF;color:#fff;font-size:20px;border-radius:25px;padding:0 33px;font-weight:bold;height:50px;cursor:pointer;line-height:50px;text-align:center;margin:0;text-decoration:none;"
>
  Try me!
</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  // this function needs to be available on global scope (window)
  function submit({ formId }) {
    window.dataLayer.push({
      event: "form_submit",
      form_id: `${formId}`,
    });
  }
</script>
```

You will notice two changes in the above code snippet:

1. The addition of window.dataLayer = window.dataLayer || []. This line intitializes Google Tag Manager's dataLayer. The line reads if the dataLayer exists then use it. Else, it will be defined as an empty array.
2. The addition of:

```javascript
window.dataLayer.push({
  event: "form_submit",
  form_id: `${formId}`,
});
```

This line logs the form submit to the dataLayer along with the id of the submitted form. This additional event parameter will help you identify which form has been submitted.

Now that our form submit is logged into the dataLayer, we will need to configure a Google Analytics 4 event on Tag Manager to send this data to Google Analytics 4, but more on that later on. For now, let's continue our tracking. Since, our form submissions are being tracked, the next steps to have a proper funnely analysis is to track form initiations as well as questions changes. Using these events you can have precise measurements on your form interactions. Let's do jump in.

To track these events, we are going to be adding two data attributes and defining two new JS functions. These functions will execute the code we need to log the events whenever the form initiates or a question changes. Let's have a look at our new code:

```html
<button
  data-tf-popup="HRzdvnfw"
  data-tf-on-ready="ready"
  data-tf-on-question-changed="changed"
  data-tf-on-submit="submit"
  data-tf-opacity="100"
  data-tf-size="100"
  data-tf-iframe-props="title=Political Poll (copy)"
  data-tf-transitive-search-params
  data-tf-medium="snippet"
  style="all:unset;font-family:Helvetica,Arial,sans-serif;display:inline-block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background-color:#0445AF;color:#fff;font-size:20px;border-radius:25px;padding:0 33px;font-weight:bold;height:50px;cursor:pointer;line-height:50px;text-align:center;margin:0;text-decoration:none;"
>
  Try me!
</button>
<script src="//embed.typeform.com/next/embed.js"></script>

<script>
  window.dataLayer = window.dataLayer || [];
  // this function needs to be available on global scope (window)
  function submit({ formId }) {
    window.dataLayer.push({
      event: "form_submit",
      form_id: `${formId}`,
    });
  }

  function ready({ formId }) {
    window.dataLayer.push({
      event: "form_start",
      form_id: `${formId}`,
    });
  }

  function changed({ formId, ref }) {
    window.dataLayer.push({
      event: "question_changed",
      form_id: `${formId}`,
      questions_id: `${ref}`,
    });
  }
</script>
```

Let's start with the data attributes, shall we? We have added two new data attributes being data-tf-on-ready="ready" and data-tf-on-question-changed="changed". These attributes will basically execute the function ready when the form completely loads and the function changed whenever a question changes on the form, respectively. Let's breakdown the new JavaScript functions:

```js
function ready({ formId }) {
  window.dataLayer.push({
    event: "form_start",
    form_id: `${formId}`,
  });
}

function changed({ formId, ref }) {
  window.dataLayer.push({
    event: "question_changed",
    form_id: `${formId}`,
    questions_id: `${ref}`,
  });
}
```

The ready() function is called when the form is loaded. It pushes an event to the data layer with the event name form_start and the form ID. The changed() function is called when a question in the form is changed. It pushes an event to the data layer with the event name question_changed, the form ID, and the question ID. Now that we have the events we need logged into the dataLayer, it is time to configure our Google Analytics 4 event tag in Google Tag Manager. To do so, follow these steps:

- **Step 1**: Go to your Google Tag Manager account
- **Step 2**: Click the "Tags" tab.
- **Step 3**: Click the "New" button.
- **Step 4**: Select "Google Analytics: GA4 Event".
- **Step 5**: In the "Configuration" section, enter your Google Analytics 4 tracking ID.
- **Step 6**: In the Event Name field, use the {{Event}} variable
- **Step 7**: In the Event Parameters, enter form_id in the first row with its value set to {{DLV - form_id}}. In the second row, enter question_id with its value set to {{DLV - question_id}}. We will define those values later.
- **Step 8**: In the "Triggering" section, create a new trigger. Name the trigger whatever you please, we suggest something representative such as Typeform Form Interactions. For the tigger type, select Custom Event. In the Event name field, type form\_(start|submit)|question_changed. Make sure to check the Use regex matching option.
- **Step 9**: Save your trigger and tag.
- **Step 10**: It's time to create the dataLayer variables we used as values in our Event parameters. Head to the variables tab, and in the User-Defined Variables, click on Create. Choose Data Layer Variable as the varibale type and in the input field enter form_id. As for the variable name enter DLV - form_id. If you named the varibale differently in the Event Parameters, use the same name. Save the variable and repeat the same process to create the question_id variable. When you create this variable, use question_id as the value and DLV - question_id as the variable name.
- **Step 11**: Click the "Save" button, preview and test your changes.

## Tracking Form Interactions for Vanilla JS Embeds

Now that we have everything configured for HTML embedded elements, let's have a look at how we can track forms that have been embedded through JS. Embedding forms through JavaScript gives you more control over the forms and allows for the addition of custom behaviour. Let's look at how we can embed a form through JavaScript.

```html
<button id="button">open form</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<link rel="stylesheet" href="//embed.typeform.com/next/css/popup.css" />
<script>
  const { open, close, toggle, refresh } = window.tf.createPopup("<form-id>");
  document.querySelector("#button").onclick = toggle;
</script>
```

When we click the open form button, our form will load; pretty cool! As mentioned above, please do not forget to replace the <form-id> placeholder with your Typeform form's ID. Next up, we will add the tracking for the same events as the HTML embed forms. Let's have a look at how that looks like:

```html
<script>
  "use strict";
  window.dataLayer = window.dataLayer || [];
  const { open, close, toggle, refresh } = window.tf.createPopup("HRzdvnfw", {
    onReady: ({ formId }) => {
      console.log(`Form ${formId} is ready`);
      dataLayer.push({
        event: "form_start",
        form_id: `${formId}`,
      });
    },
    onQuestionChanged: ({ formId, ref }) => {
      dataLayer.push({
        event: "question_change",
        question: `${ref}`,
      });
    },
    onSubmit: ({ formId }) => {
      dataLayer.push({
        event: "form_submit",
        form_id: `${formId}`,
      });
    },
    onEndingButtonClick: ({ formId }) => {
      dataLayer.push({
        event: "form_close",
        form_id: `${formId}`,
      });
    },
  });

  document.querySelector("#button").onclick = toggle;
</script>
```

The script works as follows:

1. The script initializes the data layer.
2. The script creates a popup form.
3. The script adds an event listener to the "button" element.
4. When the "button" element is clicked, the script opens the popup form.
5. the popup form is opened, the script fires the "form_start" event.
6. When a question in the form is changed, the script fires the "question_change" event.
7. When the form is submitted, the script fires the "form_submit" event.
8. When the "Ending Button" is clicked, the script closes the popup form and fires the "form_close" event.

As you can see, we added a new event for these embedded forms, but feel free to modify the provided code to track form interactions that are important to you. As for sending the events to Google Analytics 4 using Google Tag Manager, please follow the same steps highlighted above.

That's folks! If you follow the steps highlighted above, you will be able to track the interactions on your Typeform forms using Google Tag Manager and Google Analytics.
