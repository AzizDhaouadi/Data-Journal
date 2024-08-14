---
author: Aziz Dhaouadi
categories: ["Google Tag Manager", "Hubspot"]
date: 04/30/2024
featured: false
image: ./images/track-hubspot-submissions.png
title: Tracking Hubspot Form Submissions with Hubspot's Global Events and Google Tag Manager
---

HubSpot is an indispensable tool for marketing teams, renowned for its versatility in executing diverse marketing initiatives ranging from campaign management to the creation of landing pages. One of the platform's pivotal features is its form-building capability that enables the capture of essential lead data on marketing websites. Mastery of tracking form submissions is crucial, as it plays a significant role in understanding and enhancing user interactions and behavior analytics. This guide delves into how to effectively use HubSpot's global form events to monitor these submissions and integrate them with Google Analytics. By doing so, you can refine your strategies and achieve a deeper insight into customer engagement, thereby driving improved outcomes for campaigns.

## Hubspot Global Form Events

Hubspot forms emit global events when submitted which can be used to trigger custom JavaScript. Before getting into the tracking code, it is important to note:

- These global events are non-blocking so they cannot be used to prevent a form submission
- These events cannot be used to change form submission data

## OnBeforeFormInit

This event is called before the Hubspot form has been inserted into the DOM. This is what the event will output:

```json
{
  "type": "hsFormCallback",
  "eventName": "onBeforeFormInit",
  "id": "Form submitted ID",
  "data": {}
}
```

## OnFormReady

This event is called when the form has been inserted into the DOM. You can use this event to build a funnel that starts with the funnel loading. The following code snippet will log an event into the dataLayer indicating that the form was loaded:

```js
window.addEventListener("message", function (event) {
  if (
    event.data.type === "hsFormCallback" &&
    event.data.eventName === "onFormReady"
  ) {
    window.dataLayer.push({
      event: "form_loaded",
      form_id: event.data.id,
    });
  }
});
```

## onBeforeFormSubmit

This is event is called at the start of the form submission but before the submission has been persisted. This event returns an array that contains the form data. This code snippet will log an event into the dataLayer indicating that the form has been submitted

```js
window.addEventListener("message", function (event) {
  if (
    event.data.type === "hsFormCallback" &&
    event.data.eventName === "onBeforeFormSubmit"
  ) {
    window.dataLayer.push({
      event: "form_submitted",
      form_id: event.data.id,
    });
  }
});
```

## onFormSubmitted

This event is called when the form has been submitted and the submission has been persisted. This is the event that you want to use in order to track successful form submissions.

```js
window.addEventListener("message", function (event) {
  if (
    event.data.type === "hsFormCallback" &&
    event.data.eventName === "onFormSubmitted"
  ) {
    window.dataLayer.push({
      event: "form_submitted",
      form_id: event.data.id,
    });
  }
});
```

## Next steps

After logging your event of choice into the dataLayer, the next step is to create a Google Analytics: GA4 Event tag. In the `Measurement ID`, enter your property's Measurement ID. In the Event Name field, event {{Event}}. This refers to the custom Event variable in Google Tag Manager. Before using the variable, make sure it is defined in workspace. In the Event Parameter section, click on the Add parameter button. In the Event Parameter input field, type in `form_id` and in the value enter `{{DLV - form_id}`.

This refers to a custom dataLayer variable with the name DLV - form_id so make sure it is defined before using it.

## Conclusion

Using the above mentioned Global events emitted from the Hubspot forms, you can track successful form submissions and send data to Google Analytics 4 or even Google Ads or any other analytics library.
