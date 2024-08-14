---
author: Aziz Dhaouadi
categories: ["Google Tag Manager", "Google Analytics 4", "Calendly"]
date: 05/14/2024
featured: false
image: ./images/calendly.png
title: Tracking Calendly Meeting Requests with Google Tag Manager
---

For multiple SaaS businesses especially in the B2B industry lead acquisition is an important pillar for marketing since it is used in the measurement of the success of the campaigns. Inbound leads, in particular, is the focus of the majority of efforts since the lead's intent is quite high. Calendly is one of the most commonly used tools for booking meetings. And, in today's tutorial we are going to see how you can track Calendly embedded calendars on your website;

## TLDR;

If you are interested just in the steps for the tracking, this TLDR; version is for that. Here are the steps:

1. Implement this code in Google Tag Manager through a Custom HTML

```js
function isCalendlyEvent(e) {
  return e.data.event && e.data.event.indexOf("calendly") === 0;
}

window.addEventListener("message", function (e) {
  if (isCalendlyEvent(e)) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: e.data.event,
    });
  }
});
```

2. Set the trigger to all page views.
3. Create a Google Analytics: GA4 Event Tag
4. In the Measurement ID, add your property's Measurement ID
5. For the event name, add {{Event}}
6. For the trigger, create a custom event trigger
7. In the event name input box, add **calendly.(profile_page_viewed|event_type_viewed|date_and_time_selected|event_scheduled)**
8. Check the Use regex matching checkbox
9. Save all changes
10. Publish workspace

## Tracking Code Breakdown

The tracking code, as you can see, is made out of two parts. The **isCalendlyEvent(e)** function and the message event listener. If you are unfamiliar with this type of listener,
[MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event) is the best resource to learn more about how this eventListener works.

Calendly's integrated scheduling page communicates key events in the booking process to the parent window. By subscribing to these events, we can monitor these notifications to trigger analytics events which in our case is dataLayer events. Events are transmitted to the parent window using window.postMessage(), hence the message eventListener.

## Function isCalendlyEvent(e)

This function checks if a message received from the message event listener is a Calendly-related event.

- **e.data.event**: This verifies that the event data includes an event property.
- **e.data.event.indexOf('calendly') === 0**: This checks if the event string starts with the word "calendly", indicating it's a Calendly event. If both conditions are true, the function returns true.

## Event Listener window.addEventListener('message', function(e))

This part of the code listens for message events on the window object. A message event is fired when the window receives a message from another origin or iframe, in this case, typically from an embedded Calendly widget.

- if (isCalendlyEvent(e)): When a message event is received, it checks if it's a Calendly event by calling the isCalendlyEvent function.
- window.dataLayer = window.dataLayer || []: This line ensures that the dataLayer array exists. If window.dataLayer is not already initialized, it initializes it as an empty array.
- dataLayer.push({ 'event': e.data.event }): This adds the Calendly event to the dataLayer. The dataLayer is used by Google Tag Manager to manage and deploy marketing and analytics tags on a website. The pushed object contains a single property event, which is set to the value of e.data.event, effectively recording the specific type of Calendly event that occurred.

## Reporting on Calendly's Booking Flow

Now that the tag is in place and the tracking is active, you can build a funnel report in Google Analytics 4 to understand where your prospects are dropping off which you can either retarget or build similar audiences to prospects that do book a meeting. Here's what the funnel looks like:

In the Add new condition , add the respective event name. So for Profile page viewed event, the event name is calendly.profile_page_viewed . Once the events are added, Apply the configuration and check how you inbound campaigns are performing.

## Conclusion

With the tracking code above as well as the funnel report in Google Analytics 4, you can be sure that your inbound campaigns performance is not only tracked but can be analyzed and later optimized to ensure that you are maximizing your Marketing ROI.
