---
author: Aziz Dhaouadi
categories: ["Google Analytics 4", "Segment"]
date: 03/02/2025
featured: true
title: Implementing Google Analytics 4 with Segment (Client Side)
---

In this tutorial, we will explore how we can deploy Google Analytics 4 using Segment. While not the most common method, using Segment for GA4 implementation is highly recommended for its flexibility and centralized tracking capabilities. If you are unfamiliar with Segment, we will cover basic concepts but you are highly encouraged to [explore](https://segment.com/) the tool.

## What is Segment?
Segment is a customer data platform that centralizes tracking using a single analytics library, then distributes the collected data to multiple integrated destinations. The platform also offers advanced features such as reverse ETL, data protocols for ensuring data quality, and the ability to build custom customer experiences through Twilio Engage.

### Segment's Analytics Library
Segment's library is analytics.js. Using this library you can collect data and send it to Segment's supported destinations including Google Analytics 4. We are going to explore two of the library's methods:
* Page
* Track
These are the equivalent of tracking page views and events using gtag.js or Google Tag Manager (GTM). If you are familiar with gtag's syntax, Segment's tracking calls will look very familiar.

#### Deploying analytics.js
As always deploying the tracking library is the first step. And just like with gtag.js or GTM, the code block will have to be added to every page you want to track. The code block in question looks like this:
```html
<script>
!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="YOUR_WRITE_KEY";;analytics.SNIPPET_VERSION="5.2.1";
analytics.load("YOUR_WRITE_KEY");
analytics.page();
}}();
</script>
```
Please note that this is the minified version of the code. Also, inside **analytics.load** replace *YOUR_WRITE_KEY* with your actual key. As you have noticed, the last line in the tracking code is `analytic.page()`. This method allows you to track page views on your site. This is what the result of said call is:
```json
{
  "type": "page",
  "originalTimestamp": "2025-03-02T06:44:32.427Z",
  "receivedAt": "2025-03-02T06:44:32.507Z",
  "sentAt": "2025-03-02T06:44:32.429Z",
  "context": {
    "page": {
      "path": "/implement-ga4-using-segment/",
      "referrer": "http://localhost:4321/implement-ga4-using-segment/",
      "search": "",
      "title": "Data Journal - Implementing Google Analytics 4 with Segment (Client Side)",
      "url": "https://datajournal.datakyu.co/implement-ga4-using-segment/"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "userAgentData": {
      "brands": [
        {
          "brand": "Chromium",
          "version": "133"
        },
        {
          "brand": "Not(A:Brand",
          "version": "99"
        }
      ],
      "mobile": false,
      "platform": "macOS"
    },
    "locale": "en-US",
    "library": {
      "name": "analytics.js",
      "version": "next-1.77.0"
    },
    "timezone": "America/Toronto",
    "ip": "70.24.179.160"
  },
  "anonymousId": "f860b2d2-37cf-462a-b3a1-c035df4fc192",
  "integrations": {
    "Actions Amplitude": {
      "session_id": 1740892234745
    }
  },
  "properties": {
    "path": "/implement-ga4-using-segment/",
    "referrer": "http://localhost:4321/implement-ga4-using-segment/",
    "search": "",
    "title": "Data Journal - Implementing Google Analytics 4 with Segment (Client Side)",
    "url": "https://datajournal.datakyu.co/implement-ga4-using-segment/"
  },
  "messageId": "ajs-next-1740897872427-f4a0a0e1-ed32-446f-bfae-a7761c97810f",
  "timestamp": "2025-03-02T06:44:32.505Z",
  "userId": "aziz@datakyu.co"
}
```

Segment collects additional context about the page with the default call `analytics.page` but you can send more details or override the default parameters collected. Segment adds the following information by default:
```js
analytics.page('Pricing', {
  title: 'Segment Pricing',
  url: 'https://segment.com/pricing',
  path: '/pricing',
  referrer: 'https://segment.com/warehouses'
});
```
We can override the title and page path with the new values. This translates to:
```js
analytics.page('Pricing', {
  title: 'My Overridden Title',
  url: 'https://segment.com/pricing',
  path: '/pricing/view',
  referrer: 'https://segment.com/warehouses'
});
```

This is an example of the flexibility of Segment's analytics library compared to gtag.js for instance. However, it is highly recommended that you do not override values as cause some unexpected results. As mentioned above, the main tracking script contains a page call. You can still call the page() tracking method for virtual pageviews.

#### Segment's track method
This method allows Segment to collect events. You can use this method to track button clicks, link clicks, scrolling behavior, form submissions and other events relevant to your website. A track method call has the following anatomy:
```js
analytics.track("Form Submitted", {
    "form_name": "form 1",
    "form_id": "contact us",
    "submission_page": "/contact/"
})
```
The only thing required for this call is the event name string. The properties object is optional, so you can write the code above as `analytics.track("Form Submitted")`.

### Deploying Google Analytics 4 using Segment.
Once you have added the initial script and tracked elements on your website, it is time to send that data to Google Analytics 4. Before doing that though, you must confirm that Segnent is receiving the data you are sending through Analytics.js.

##### Segment's Debugger
Inside your source (website source in Segment), next to the Overview section, you can find the **Debugger** section. This is the equivalent of GA4's DebugView but much better. As you are interacting with your website, post tracking implementation and everything was implemented correctly, you should be seeing your events populate. You can also use **Segment Inspector**, a browser extension that allows you to see what events are being sent to Segment. Please ensure to inspect the payload to make sure that even if the event is being sent, the metadata is also correct and no unexpected values are received. 

Now that we confirmed data is being successfully sent to Segment, it is time to work on sending that data to the right destination. The first step is to add Google Analytics 4 as a destination. In the destinations page, click on **Add Destination** and search for Google Analytics 4. The destination we will be adding is the *Web* one. Click add and pick the source for this destination. This dictates what kind of data the destination will be able to receive. In our case, since we have one source, we will pick that one.

The next step is to give the destination a name. We'll go with **Google Analytics 4 Main Website Instance**. Now, it's time to configure the destination.

#### Configuring the Google Analytics 4 Destination
1. **Adding the Measurement ID**
In the settings tab, paste the Measurement ID in the Basic Settings section.
2. **Disabling Default Pageviews**
If you scroll to the bottom of the settings page, you can disable Page Views. This prevents Segment's default snippet from automatically sending pageview events, allowing you to control them manually.
1. **Consent Mode**
You can turn on consent mode with Segment as well. This setting allows you to set the default consent for:
* Ads Storage
* Analytics Storage
* Ad User Data
* Ad Personalization
The setting will also allow you to set the **wait_for_update** parameter to indicate how to wait before the consent state update is sent. Use this parameter if the CMP you are using loads asynchronously to avoid race conditions.
##### Events Mappings
While the settings are important to configure, the real work (kinda) starts now. Before we dive deeper into this section, please familiarize yourself with the events payloads. You need to be able to read them comfortably and know how to traverse the object to get the right data you want.
##### Example of Traversing Objects
```js
const event = {
  type: "track",
  event: "Form Submitted",
  properties: {
    form_name: "Contact Us",
    form_id: "form_123",
    submission_page: "/contact/"
  }
};

// Accessing event properties dynamically
console.log(event.event); // "Form Submitted"
console.log(event.properties.form_name); // "Contact Us"
console.log(event.properties["submission_page"]); // "/contact/"
```
1. **Set configuration Fields**
This mapping is turned on by default and is the one resposible for tracking page views. You can also use this mapping to set a User ID, user properties and update the consent for your events. 
1. **Additional Mappingas**
To add a new mapping, click on *New Mapping*. Segment offers multiple pre-configured mappings such as **purchase**, **add to cart**, **refund**, **view cart**... It also offers a **Custom Event** mapping that allows you to map custom events from Segment to Google Analytics 4. This is the equivalent of setting custom events using Google Tag Manager or gtag.js. When you are mapping events, Segment allows you to use the different objects in the event payload to dynamically map their values to Google Analytics 4 parameters. This is why it is important for you to get comfotable traversing objects. Once you are done with your mappings, Segment offers a preview, so you can see what the data will look like when sent to Google Analytics 4.
#### Activating the integration
Once you are done mapping the events, go to the settings tab and at the very bottom turn on **Enable destination** so that Segment starts sending data to Google Analytics 4.