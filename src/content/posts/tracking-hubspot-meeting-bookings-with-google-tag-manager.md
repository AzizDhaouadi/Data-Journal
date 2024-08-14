---
author: Aziz Dhaouadi
categories: ["Google Tag Manager", "Hubspot"]
date: 05/06/2024
featured: false
image: ./images/track-hubspot.png
title: Tracking Hubspot Meeting Bookings with Google Tag Manager
---

In a previous post, we have covered how you can track different Hubspot form interactions, from loading to submission. In this post, we will cover one of the most used features of Hubpost being. their free meeting scheduler. Whether it’s your marketing or sales team using this for leads acquisition, it is important that these forms are properly tracked to measure the success of your marketing campaigns.

## Tracking Hubspot Meeting Requests

Unlike form tracking, we will only be tracking a single event which is **meetingBookSucceeded**. This is the actual event name Hubspot exposes on the window object when a meeting is successfully booked on their tool. With this event, we will able to send details to analytics tools like Google Analytics 4 that will enrich event making it easier to make informative decisions. Here are the properties we will send in the payload or in this case log into the dataLayer:

- url
- formID
- paidMeeting
- linkType
- offline

Here’s what the full tracking code looks like:

```js
window.addEventListener("message", function (event) {
  if (event.data.meetingBookSucceeded) {
    window.dataLayer.push({
      event: "hubspot_meeting_booked",
      url: window.location.href,
      formID: event.data.meetingPayload.formGuid,
      paidMeeting: event.data.meetingPayload.isPaidMeeting,
      linkType: event.data.meetingPayload.linkType,
      offline: event.data.meetingPayload.offline,
    });
  }
});
```

## Where to add the tracking code?

Now that we have the tracking code logging the event hubspot_meeting_booked into the dataLayer, we have to figure where to put this code. Well, there are two ways we can do this:

1. Google Tag Manager using the Custom HTML
2. Source code

## Adding Tracking Code using Google Tag Manager

To create a custom HTML tag in Google Tag Manager, follow these steps:

- **Step 1: Open Google Tag Manager**
  - Log into your Google Tag Manager account.
  - Select the appropriate container for your website.
- **Step 2: Create a New Tag**
  - Navigate to the Tags section on the left sidebar.
  - Click on New to start creating a new tag.
- **Step 3: Configure the Tag**
  - Click on Tag Configuration.
  - Select Custom HTML as the tag type.
  - Enter the code above. Ensure it is enclosed in <script> tags.
- **Step 4: Set up Triggering**
  - Click on Triggering to decide when this tag should fire.
  - Choose from the existing triggers or create a new one by clicking on New.
  - Choose the All Pages trigger
- **Step 5: Save and Test Your Tag**
  - Click on Save to save the tag.
  - Enable Preview mode to test your tag on your site.
  - Check the GTM debug panel to ensure the tag fires correctly.

## Adding Tracking Code in the Source Code

If you want to add the tracking code to your source code, please share the code above with your developer team and they will implement it.

## Next Steps

The next step is to create tags to send data to different platforms such as Google Analytics 4, Facebook Ads, Google Ads and so on.

## Conclusion

With this tracking code allowing to track successful meeting bookings, you should be able to measure the success of your lead generating campaigns and measure the growth of your business.
