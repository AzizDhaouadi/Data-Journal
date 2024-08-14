---
author: Aziz Dhaouadi
categories: ["studio tips"]
date: 04/22/2024
featured: false
image: ./images/ga4-6sense.png
title: Connecting Measurement Protocol Events to Client-Side Data
---

In this tutorial, we are going to be exploring how we can connect Measurement Protocol events to client-side data in order to build a better attribution for our conversions and have a better understanding of how everything connects together. Before we dive deeper into this tutorial, please familiarize yourself with the Measurement Protocol as it is quite crucial to understanding the whole process we are going to be describing here. We have covered the [Measurement Protocol](https://datajournal.datakyu.co/advanced-ga4-measurement-protocol-implementation/) in a previous post, so you can always start there.

## What is special about the Measurement Protocol

If you have worked with the Measurement Protocol before you may have noticed the following peculiarities:

- Most of your events implemented through MP get attributed to Unassigned
- An increase in total users
- An increase in Sessions
- Create / Modify events configurations do not work

These are some of the weird behaviours you may have noticed if you have MP implemented. The main reason behind these anomalies is that the Measurement Protocol is isolated from your client-side libraries be it gtag or GTM. But, wait, what does that mean? The best way to think about this is having two phones that allow you to speak to the same end user in this case the Google Analytics 4 servers, but these two phones do not carry each other's context. In other words, whatever you have said, requested, or created through one line, the GA4 servers will not be able to tie to whatever you are saying, requesting or creating through the other line.

But, if you have been following so far, you might ask yourself the question why are these systems separated?. And, that's a great question. Before we get to the answer though, let's quickly review the use cases for the Measurement Protocol. The following are some **use cases** where the use of the MP may be useful:

- Tie online to offline behaviour.
- Measure client-side and server-side interactions.
- Send events that happen outside standard user-interaction, like offline conversions.
- Send events from devices and apps where automatic collection isn't available, like kiosks and watches.

Are you noticing a pattern? If not, try again. The answer to our question lies in the uses cases. Still don't have the answer? Well, it's data enhancing or data enrichment. The Measurement Protocol was never intended to **replace** Google Tag Manager or gtag.js; it is merely meant to enhance the data collected from these methods. As such, no context is given to the Measurement Protocol, at least not automatically. Context will have to given manually in order for data to be stitched properly. In fact, here's how Google defines an overview of the Measurement Protocol.

[![App Platorm](https://developers.google.com/static/analytics/devguides/collection/protocol/ga4/img/mp_sequence_diagram.png)](https://developers.google.com/static/analytics/devguides/collection/protocol/ga4/img/mp_sequence_diagram.png)

As we can see, data sent from our servers to the collection endpoints will have to be manually sent. While event data or server data is quite evident, the client ID / App Instance ID is not. In fact, these IDs, along with other parameters, are the ones that carry the "context", allowing Google Analytics 4 to stitch the data together.

## Which parameters are required to stitch data together?

Now that we have a better understanding of the challenge in front of us, let's work on solving it. But where do we start? As with every problem, we start at the beginning; quite elementary.

To solve this issue, we know that we need to send identifiers, for the lack of a better term, in order for Google to stitch the data together. To confirm this, let's think about the concept of Server-to-Server tracking.

## What is server-to-server or server-side tracking?

Server-side tracking is a method of collecting and processing data where data is sent from a server to a tracking server, rather than being sent directly from a user's browser. This technique reduces browser load, and provides more control over the data sent to analytics platforms.

Based on this definition, we can state that this technique can be used to track user behaviour without having necessarily to comply with client-side consent settings, however misguidedly. After all, users do not know what is going on in the backend. However, this approach might not make much sense, would it? Therefore, we must ask ourselves: **Is there a way to connect client-side consent choices to Measurement Protocol events?** And the answer to that question is, hopefully to no ones's awe, yes. How? Well, it is the client_id.

Let's have a look at the [Privacy Settings](https://developers.google.com/analytics/devguides/collection/protocol/ga4#privacy_settings) inside the MP documentation. It is stated that the client_id (or the app_instance_id) are used to functionally adopt user privacy settings such as "non personalized ads" and "limit ad tracking". This statement confirms not only the need for identifiers, but also gives us the name of one those identifiers.

Now, the second part that we need to figure out is which other parameters can be sent in order for data to be properly stitched together. For that, we would need to go back to our list of inconsistencies mentioned above.

## Increased Sessions

This is perhaps one of the most commonly observed side-effects of implementing events through the Measurement Protocol. But why does this happen? The answer to that question lies in understanding how sessions are counted in Google Analytics 4.

### How are sessions calculated in Google Analytics 4?

At the start, GA4 measured sessions as the total count of the event session_start. However, this has changed to the following definition: Sessions are an estimate of the number of unique session IDs that occured on the site.

But, what does this mean? Well, what would an increased number of sessions and this method of count have in common? New session IDs. While the session_startevent is a reserved one, this must mean that when we send new session IDs that Google Analytics 4 does not recognize, a new session starts. As such, we can conclude that the second identifier we need to send for proper attribution is the session_id.

## Increased Total Users

This is the third most common observation made when working with events dispatched using the Measurement Protocol. While the answer to this issue has already been revealed above, we will reiterate it in this section to ensure that the problem is well understood. The issue stems from the client_id. How do you ask? Well, it's the stitching. In order for data to be fully connected, a match between what we have provided as a client_id must be matched with what has been collected prior to the ingestion of the Measurement Protocol event. When a new client_id is detected, a new user will be created. GA4 still uses cookies in order to identify users and, in this case, the cookie used is \_ga. While implementing the user_id can help with user deduplication if it is provided constantly across interactions with the website, it is recommended that you provide the client_id. If it is possible to send the client_id along with the user_id that would be ideal.

## Unassigned Attribution

If you have been following the tutorial so far, the answer to this problem should come to you naturally. If you started reading from this point, the answer is an unrecognized session_id and an unrecognized user_id. This is quite evident. If we look at acquisition in Google Analytics 4, it can be defined either from a user-perspective aka First-touch attribution or from a session perspective aka Last-touch attribution. Unassigned is the source of attribution Google assigns when no other grouping applies. In the case of the data sent through the Measurement Protocol, if the session_id and the client_id, Google Analytics 4 will not have any context about the acquisition source of the user and the session and thus will attribute the source to Unassigned. The best way to avoid such attribution is to provide GA4 with identifiers that would allow it to properly categorize the data you are sending.

## How to retrieve the session_id and the user_id

Now that we understand why it is important to provide identifiers to Google Analytics 4 when working with the Measurement Protocol, it is time to understand how to get them in order to send your events. There are two ways that this can be done; gtag.js and Google Tag Manager. For this tutorial, we will focus on Google Tag Manager.

### Defining \_ga and \_ga_measurementID

The first step step to capturing the session_id and the client_id is to define two new variables in Google Tag Manager as **1st Party Cookie**. These variables will later be used to get the actual value of the parameters. Here's how you can define a 1st Party Cookie variable in Google Tag Manager:

1. Click on variables side tab
2. In the User-Defined section, click on New
3. In the Variable Configuration section under Page Variables, choose 1st Party Cookie
4. Name the variable, and in the Cookie Name type **\_ga** and check the URI-decode cookie
5. Save the variable

Following the same steps, create a new variable but instead of _ga as a value, add \_ga_<your-measurement-id>. And so, if your measurement is G-PSW1MY7HB4, the cookie value should be \_ga_PSW1MY7HB4. Now that we have both of our variables in place, it is time to use the values in order to return the values we are looking for.

The next step to make this create two JavaScript variables that would extract the value of the parameters we need. In truth, both cookies carry more information than just the session_id or the client_id. As such, we would need to use an extraction technique that would get us what we need.

## Extracting the value of the session_id and the client_id.

### session_id

If we want to extract the value of the session_id from the cookie we just created, all we have to do is use RegExp to pull in the value we need. Here's the code:

```js
function returnSessionId() {

  var ga4SessionCookie = {{Your _ga_<measurement-id> variable name}};

  var regExp = /(?<=GS1\.1\.)\d+/gm

  var regExpMatch = ga4SessionCookie.match(regExp);

  return regExpMatch[0];

}
```

Using this function, we will be able to extract the session_id from the target variable we created in Google Tag Manager. To give your more context, this is what the value of the cookie would look like GS1.1.1713714404.20.1.1713714410.0.0.0. The part we need to extract from this string is 1713714404.

### client_id

For this parameter, we will be using a similar function to extract the value of the client_id out of the **ga** cookie. Here's the function we are going to use:

```js
function returnClientId() {

  var ga4ClientCookie = {{Your _ga cookie variable name}};

  var regExp = /(?<=GA1\.1\.)\d+\.\d+/gm

  var regExpMatch = ga4ClientCookie.match(regExp);

  return regExpMatch[0];

}
```

## Defining JavaScript Variable in Google Tag Manager

The next step is to define two variables in Google Tag Manager so we can capture the values we need to send the event. Once you have defined the variables, it's time to send the Measurement Protocol event. Here's the code that we will be using:

```js
const measurement_id = 'G-XXXXXXXXXX';
const api_secret = '<secret_value>';

fetch('https://www.google-analytics.com/mp/collect?measurement_id=' + measurement_id + '&api_secret=' + api_secret, {
  method: "POST",
  body: JSON.stringify({
    "client_id": {
      {
        your - variable - returning - the - clientID - value
      }
    },
    "events": [{
      "name": "campaign_details",
      "params": {
        "campaign_id": "google_1234",
        "campaign": "Summer_fun",
        "source": "google",
        "medium": "cpc",
        "term": "summer+travel",
        "content": "logolink",
        "session_id": {
          {
            your - variable - returning - the - sessionID - value
          }
        },
        "engagement_time_msec": "100"
      }
    }]

  })
});
```

Add this code to your workspace as a Custom HTML tag. For the triggering, it is up to you how this code will execute. You can define a trigger through Google Tag Manager whenever an action is triggered by the user. This is the recommended option if you are not familiar with JavaScript to edit or manipulate the code. If you are familiar with JavaScript, then you can edit the code above so that it fires whenever an event happens using the addEventListener or any other method you need.

## Validating Events & Testing the Implementation

The next step is to validate the events we are going to send and test the implementation to confirm that everything is working correctly.

## Validating Events

The easiest way to validate events for the Measurement Protocol is to send your payload to the debugging endpoint. Instead of sending the events to /mp/collect, you can send your payload to /debug\_/mp/collect. Here are the details of the validation:

#### Response

| Key                  | Type                                                                                                                                                              | Description                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `validationMessages` | Array&lt;[ValidationMessage](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events?client_type=gtag#validation_message)&gt; | An array of validation messages. |

#### ValidationMessage

| Key              | Type                                                                                                                                           | Description                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `fieldPath`      | string                                                                                                                                         | The path to the field that was invalid.         |
| `description`    | string                                                                                                                                         | A description of the error.                     |
| `validationCode` | [ValidationCode](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events?client_type=gtag#validation_code) | A ValidationCode that corresponds to the error. |

#### ValidationCode

| Value                   | Description                                                                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VALUE_INVALID`         | The value provided for a `fieldPath` was invalid. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations). |
| `VALUE_REQUIRED`        | A required value for a `fieldPath` was not provided.                                                                                                                       |
| `NAME_INVALID`          | The name provided was invalid. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations).                    |
| `NAME_RESERVED`         | The name provided was one of the reserved names. See [reserved names](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#reserved_names). |
| `VALUE_OUT_OF_BOUNDS`   | The value provided was too large. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations).                 |
| `EXCEEDED_MAX_ENTITIES` | There were too many parameters in the request. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations).    |
| `NAME_DUPLICATED`       | The same name was provided more than once in the request.                                                                                                                  |

The second method to validating your events is the Realtime report. If you payload is error free, you should be able to see the event inside the report which indicates that Google Analytics 4 servers successfully received the event.

## Takeaways

Using this method, you can now send data using the Measurement Protocol and stitch your data to the client-side in order to give your MP events context and build more robust reports.
