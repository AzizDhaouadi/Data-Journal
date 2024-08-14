---
author: Aziz Dhaouadi
categories: ["Google Ads", "Typeform"]
date: 05/20/2023
featured: false
image: ./images/track-hubspot.png
title: Typeform Google Ads Conversion Tracking Complete Guide
---

In this article, we will be discussing the how to add Google Ads Conversion Tracking for your successful Typeform submissions. To follow along, you will need:

- Your Google Ads Conversion ID
- Your Google Ads Conversion Label
- Google Tag Manager account
- Code editor

Make sure you have this information at hand before carrying on with the rest of the tutorial. If you have everything ready, let's proceed.

## Tracking Successful Typeform Submission

Before we can send the conversion data to Google Ads, you need to determine how your Typeform is embedded in your website. There two main methods to embed a Typeform in a web page the, first being through HTML embedding and the second being through Vanilla JavaScript embedding. There is also a way to embed the form through React, but that is beyond the scope of this article. If you need to learn more about this method, you can do so here.

## Tracking for the HTML Embed Method

HTML embedding is the easiest form to get your Typeform up and running. This form of embedding uses the CDN and it looks something like this:

```html
<button
  data-tf-popup="<form-id>"
  data-tf-on-submit="submit"
  data-tf-opacity="100"
  data-tf-size="100"
  data-tf-iframe-props="title=Political Poll (copy)"
  data-tf-transitive-search-params
  data-tf-medium="snippet"
>
  Try me!
</button>
<script src="//embed.typeform.com/next/embed.js"></script>
```

If this how you are adding a Typeform to your website then use the following code snippet to track successful submissions:

```html
<script>
  window.dataLayer = window.dataLayer || [];
  // this function needs to be available on global scope (window)
  function submit(formId) {
    window.dataLayer.push({
      event: "form_submit",
      form_id: `${formId}`,
    });
  }
</script>
```

Here's what everything looks like together:

```html
<button
  data-tf-popup="<form-id>"
  data-tf-on-submit="submit"
  data-tf-opacity="100"
  data-tf-size="100"
  data-tf-iframe-props="title=Google Ads Conversion Tracking with Typeform"
  data-tf-transitive-search-params
  data-tf-medium="snippet"
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

Essentially, what we are doing is invoking the submit function every time the form is successfully submitted. When the function is invoked, it pushes a new object to the dataLayer. This new object contains the event name which is form_submit and the the form_id which reflects the id of the form being submitted. The event name form_submit is going to be used to create the trigger for our Google Ads conversion in Google Tag Manager.

Now that we have the code snippet implemented, the next step is to test the code and make sure we are seeing the form_submit event being logged into the dataLayer, so we can proceed with the next step. For testing, you can paste the above code snippet in JSFiddle and simply replace <from-id> with your form id and you should be good to go.

Once you are done testing, the next step is to implement the code snippet in your code base. If you do not have access to the code base, do not worry. You can still deploy this solution using the custom HTML tag in Google Tag Manager. You can so following these steps:

1. Sign in to your Google Tag Manager account: Go to the Google Tag Manager website and log in using your Google account credentials.
2. Access your container: Once logged in, select the container in which you want to create the custom HTML tag. Containers are where you manage and deploy tags.
3. Go to "Tags" section: In the container dashboard, click on "Tags" in the left-hand sidebar to access the tags management section.
4. Create a new tag: Click on the "New" button to start creating a new tag.
5. Choose a tag configuration: In the tag creation interface, you'll need to choose the tag type. Since you want to create a custom HTML tag, select the "Custom HTML" option.
6. Configure the tag: Provide a name for the tag and specify the HTML code you want to include. Page the code snippet in the provided space.
7. Set the triggering options: For the trigger choose All Pages. You can also restrict this if you want to the script to be added for pages where you have your forms implemented.
8. Save the tag: Once you have configured the tag and its triggers, click on the "Save" button to save your changes.
9. Publish the container: After creating the tag, you'll need to publish the container to make the changes live on your website. Click on the "Submit" button in the upper-right corner and follow the prompts to publish the container.

Once our tag is live, we can continue with our implementation. Before we continue, make sure that you have your Google Ads conversion ID ready, as well as the Google Ads Conversion Label ready. You can find this information in your Google Ads account under "Tools & Settings" > "Measurement" > "Conversions". Once you have everything ready, please follow these steps:

1. Sign in to your Google Tag Manager account: Go to the Google Tag Manager website and log in using your Google account credentials.
2. Access your container: Once logged in, select the container in which you want to create the Google Ads Conversion Tracking tag.
3. Go to "Tags" section: In the container dashboard, click on "Tags" in the left-hand sidebar to access the tags management section.
4. Create a new tag: Click on the "New" button to start creating a new tag.
5. Choose a tag configuration: In the tag creation interface, click on the tag configuration area and search for "Google Ads Conversion Tracking" and select it.
6. Configure the tag: Provide a name for the tag and enter your Google Ads Conversion ID and Conversion Label. You can find this information in your Google Ads account under "Tools & Settings" > "Measurement" > "Conversions".
7. Set the triggering options: For the trigger, select the Custom Event trigger and in the event name field, type format_submit. This ensures that the Google Ads conversion will fire based on the event we are logging into the dataLayer using our code snippet.
8. Set additional tag options (optional): Depending on your specific requirements, you may have additional settings available to customize the tag behavior. These can include values for revenue tracking, conversion currency, and more.
9. Save the tag: Once you have configured the tag and its triggers, click on the "Save" button to save your changes.
10. Publish the container: After creating the tag, you'll need to publish the container to make the changes live on your website. Click on the "Submit" button in the upper-right corner and follow the prompts to publish the container.

Once you are done with the configuration, it is time for testing. As mentioned, please make sure to publish you Google Tag Manager. To test the implementation, all you have to do is submit your Typeform and use the Google Tag Assistant to understand if the conversion is working or not. If the conversion has fired successfully, you should see that the Google Ads Conversion Tracking tag has fired. Click on the tag and confirm that you are seeing the right conversion ID as well as the right conversion label. If everything looks good, you are done! That being said, if you want to learn how to track Typeforms embedded through Vanilla JavaScript then please continue reading. Else, happy tracking!

## Tracking for the Vanilla JavaScript Embed Method

This section of the article, we will see how we can implement the same level of tracking for Typeforms embedded through vanilla JavaScript. It is important to note that the only change we will see in this section is the tracking code. All the Google Tag Manager implementation remains **the same**.

That being said, the following code snippet shows how you can embed a Typeform using JavaScript.

```html
<button id="button">open form</button>
<script src="//embed.typeform.com/next/embed.js"></script>
<link rel="stylesheet" href="//embed.typeform.com/next/css/popup.css" />
<script>
  const { open, close, toggle, refresh } = window.tf.createPopup("<form-id>");
  document.querySelector("#button").onclick = toggle;
</script>
```

Now that the Typeform is implemented on your page, the next step is to simply implement the tracking code that allows us to log the form_submit into the dataLayer, so we can fire our Google Ads Conversion Tracking code. To do that, here's the snippet we need to add:

```html
<script>
  "use strict";
  window.dataLayer = window.dataLayer || [];
  const { open, close, toggle, refresh } = window.tf.createPopup("<form-id>", {
    onSubmit: ({ formId }) => {
      dataLayer.push({
        event: "form_submit",
        form_id: `${formId}`,
      });
    },
  });

  document.querySelector("#button").onclick = toggle;
</script>
```

Once you have implemented this code snippet, replace the <form-id> with your Tyepform's actual form ID. The next step is to test the implementation and see if you are able to see the form_submit event being logged into the dataLayer. If it is, the follow the steps mentioned above to set up your Google Ads Conversion Tracking code. And, if for some reason, you do not have access to your code base, this tracking script can also be added through Gooogle Tag Manager and we have the steps on how to do this above.

That's a wrap. At this point, you should be familiar with Typeforms embed methods, the different tracking snippets and how to set up Google Ads Conversion Tracking tag on Google Tag Manager based on successful form submissions.
