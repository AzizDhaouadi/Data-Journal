---
author: Aziz Dhaouadi
categories: ["Google Tag Manager", "Google Analytics 4"]
date: 06/02/2024
featured: false
image: ./images/track-hubspot.png
title: How to Implement User ID Tracking in Google Analytics 4 with HubSpot Forms and Google Tag Manager
---

When working with Google Analytics 4, cross-platform and cross-device measurements are key to gain a good understanding of your users' journeys. and have more precise measurement over new / returning users. Google Analytics 4 allows for such measurements to happen through the user_id. However, the challenge with the user_id is that it was designed to be used with websites where users are able to login and logout. One of the main reasons why this feature is recommended to be used with such systems is because it allows analysts to set a unique identifier from a system they can trust such as a database ID. While it is understandable, this restricts multiple marketing websites from using this feature since users, usually, can neither log in nor log out on such websites. But, what these websites have is forms used for lead generation.

And, in this tutorial, we will discover how using said forms you can set up user ID tracking for your Google Analytics 4 property. In this guide, we will use Hubspot for our forms and Google Tag Manager for setting up the tracking.

## Pre-requisites

1. A Hubspot form; regardless of its nature
2. A Google Tag Manager account
3. Access to source code (optional)

## Setting up the user_id

As explained above, since marketing websites do not offer a way to generate a database-like user ID, we will need to get creative and find a system that allows us to get a similar result. To reiterate, the reason a database-like user ID is preferred is because it is unique for every user and remains the same for an identified user. This allows systems to precisely identify users without, or very minimal, risk of facing a mistake. So, if we want to have similar functionality, the goal would be to implement a one way hash that returns the same result for the same string and such a hash is the _MD5_. This algorithm allows us to create a unique hash for each user upon form submission. Once this hash is available, we are going to set it as the user_id.

## User ID Specifications

Before we dive into the technical implementation, let’s have a look at the limits of the user ID:

- The User-ID feature is built for use with Google Analytics technologies. All implementations must comply with the [Analytics SDK / User-ID Feature Policy](https://developers.google.com/analytics/devguides/collection/app-web/policy).
- The user IDs you send to Google Analytics must be fewer than 256 characters long.
- Any data in your Analytics account collected and recorded prior to implementation won't be reprocessed and associated with a user ID.
- User-ID data collected in one property can't be shared or mixed with data in other properties.

## User ID Tracking

The first step to the tracking of the user ID is ensuring that we can track the forms where users can submit their emails. In this tutorial, we are going to be using Hubspot forms. If you are not using Hubspot for your forms, the logic remains the same.

### Tracking Hubpost Form

Here’s how we can track form submissions for Hubspot forms:

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

1. `window.addEventListener("message", function (event) { ... });`: This line adds an event listener for message events. These events are dispatched by the HubSpot forms when a form is submitted.
2. `if (event.data.type === "hsFormCallback" && event.data.eventName === "onFormSubmitted") { ... }`: This condition checks if the message event is of the type hsFormCallback and if the event name is onFormSubmitted, indicating a form submission.
3. `window.dataLayer.push({ event: "form_submitted", form_id: event.data.id, });`: If the condition is met, this code pushes an event to the dataLayer with the event name form_submitted and the form ID.

We need to modify this code to capture the submitted value of the email field.

```js
window.addEventListener("message", function (event) {
  if (
    event.data.type === "hsFormCallback" &&
    event.data.eventName === "onFormSubmitted"
  ) {
    window.dataLayer.push({
      event: "form_submitted",
      form_id: event.data.id,
      user_email: event.data.data.submissionValues.email,
    });
  }
});
```

`user_email: event.data.data.submissionValues.email`: This line extends the previous code by also capturing the submitted email value and adding it to the dataLayer event.

Here’s an example of the code’s output:

```json
{
  "event": "form_submitted",
  "form_id": "366c848d-26e5-4294-b185-9bab4cc661e6",
  "user_email": "example@email.com"
}
```

## Hashing Submitted Email Value

The next step is now to hash the user email in order to create our user ID. To do so, we will first need to add a piece of code that will allows us to hash the email

```js
!(function (n) {
  "use strict";
  function d(n, t) {
    var r = (65535 & n) + (65535 & t);
    return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
  }
  function f(n, t, r, e, o, u) {
    return d(((u = d(d(t, n), d(e, u))) << o) | (u >>> (32 - o)), r);
  }
  function l(n, t, r, e, o, u, c) {
    return f((t & r) | (~t & e), n, t, o, u, c);
  }
  function g(n, t, r, e, o, u, c) {
    return f((t & e) | (r & ~e), n, t, o, u, c);
  }
  function v(n, t, r, e, o, u, c) {
    return f(t ^ r ^ e, n, t, o, u, c);
  }
  function m(n, t, r, e, o, u, c) {
    return f(r ^ (t | ~e), n, t, o, u, c);
  }
  function c(n, t) {
    var r, e, o, u;
    (n[t >> 5] |= 128 << t % 32), (n[14 + (((t + 64) >>> 9) << 4)] = t);
    for (
      var c = 1732584193, f = -271733879, i = -1732584194, a = 271733878, h = 0;
      h < n.length;
      h += 16
    )
      (c = l((r = c), (e = f), (o = i), (u = a), n[h], 7, -680876936)),
        (a = l(a, c, f, i, n[h + 1], 12, -389564586)),
        (i = l(i, a, c, f, n[h + 2], 17, 606105819)),
        (f = l(f, i, a, c, n[h + 3], 22, -1044525330)),
        (c = l(c, f, i, a, n[h + 4], 7, -176418897)),
        (a = l(a, c, f, i, n[h + 5], 12, 1200080426)),
        (i = l(i, a, c, f, n[h + 6], 17, -1473231341)),
        (f = l(f, i, a, c, n[h + 7], 22, -45705983)),
        (c = l(c, f, i, a, n[h + 8], 7, 1770035416)),
        (a = l(a, c, f, i, n[h + 9], 12, -1958414417)),
        (i = l(i, a, c, f, n[h + 10], 17, -42063)),
        (f = l(f, i, a, c, n[h + 11], 22, -1990404162)),
        (c = l(c, f, i, a, n[h + 12], 7, 1804603682)),
        (a = l(a, c, f, i, n[h + 13], 12, -40341101)),
        (i = l(i, a, c, f, n[h + 14], 17, -1502002290)),
        (c = g(
          c,
          (f = l(f, i, a, c, n[h + 15], 22, 1236535329)),
          i,
          a,
          n[h + 1],
          5,
          -165796510
        )),
        (a = g(a, c, f, i, n[h + 6], 9, -1069501632)),
        (i = g(i, a, c, f, n[h + 11], 14, 643717713)),
        (f = g(f, i, a, c, n[h], 20, -373897302)),
        (c = g(c, f, i, a, n[h + 5], 5, -701558691)),
        (a = g(a, c, f, i, n[h + 10], 9, 38016083)),
        (i = g(i, a, c, f, n[h + 15], 14, -660478335)),
        (f = g(f, i, a, c, n[h + 4], 20, -405537848)),
        (c = g(c, f, i, a, n[h + 9], 5, 568446438)),
        (a = g(a, c, f, i, n[h + 14], 9, -1019803690)),
        (i = g(i, a, c, f, n[h + 3], 14, -187363961)),
        (f = g(f, i, a, c, n[h + 8], 20, 1163531501)),
        (c = g(c, f, i, a, n[h + 13], 5, -1444681467)),
        (a = g(a, c, f, i, n[h + 2], 9, -51403784)),
        (i = g(i, a, c, f, n[h + 7], 14, 1735328473)),
        (c = v(
          c,
          (f = g(f, i, a, c, n[h + 12], 20, -1926607734)),
          i,
          a,
          n[h + 5],
          4,
          -378558
        )),
        (a = v(a, c, f, i, n[h + 8], 11, -2022574463)),
        (i = v(i, a, c, f, n[h + 11], 16, 1839030562)),
        (f = v(f, i, a, c, n[h + 14], 23, -35309556)),
        (c = v(c, f, i, a, n[h + 1], 4, -1530992060)),
        (a = v(a, c, f, i, n[h + 4], 11, 1272893353)),
        (i = v(i, a, c, f, n[h + 7], 16, -155497632)),
        (f = v(f, i, a, c, n[h + 10], 23, -1094730640)),
        (c = v(c, f, i, a, n[h + 13], 4, 681279174)),
        (a = v(a, c, f, i, n[h], 11, -358537222)),
        (i = v(i, a, c, f, n[h + 3], 16, -722521979)),
        (f = v(f, i, a, c, n[h + 6], 23, 76029189)),
        (c = v(c, f, i, a, n[h + 9], 4, -640364487)),
        (a = v(a, c, f, i, n[h + 12], 11, -421815835)),
        (i = v(i, a, c, f, n[h + 15], 16, 530742520)),
        (c = m(
          c,
          (f = v(f, i, a, c, n[h + 2], 23, -995338651)),
          i,
          a,
          n[h],
          6,
          -198630844
        )),
        (a = m(a, c, f, i, n[h + 7], 10, 1126891415)),
        (i = m(i, a, c, f, n[h + 14], 15, -1416354905)),
        (f = m(f, i, a, c, n[h + 5], 21, -57434055)),
        (c = m(c, f, i, a, n[h + 12], 6, 1700485571)),
        (a = m(a, c, f, i, n[h + 3], 10, -1894986606)),
        (i = m(i, a, c, f, n[h + 10], 15, -1051523)),
        (f = m(f, i, a, c, n[h + 1], 21, -2054922799)),
        (c = m(c, f, i, a, n[h + 8], 6, 1873313359)),
        (a = m(a, c, f, i, n[h + 15], 10, -30611744)),
        (i = m(i, a, c, f, n[h + 6], 15, -1560198380)),
        (f = m(f, i, a, c, n[h + 13], 21, 1309151649)),
        (c = m(c, f, i, a, n[h + 4], 6, -145523070)),
        (a = m(a, c, f, i, n[h + 11], 10, -1120210379)),
        (i = m(i, a, c, f, n[h + 2], 15, 718787259)),
        (f = m(f, i, a, c, n[h + 9], 21, -343485551)),
        (c = d(c, r)),
        (f = d(f, e)),
        (i = d(i, o)),
        (a = d(a, u));
    return [c, f, i, a];
  }
  function i(n) {
    for (var t = "", r = 32 * n.length, e = 0; e < r; e += 8)
      t += String.fromCharCode((n[e >> 5] >>> e % 32) & 255);
    return t;
  }
  function a(n) {
    var t = [];
    for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1) t[e] = 0;
    for (var r = 8 * n.length, e = 0; e < r; e += 8)
      t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32;
    return t;
  }
  function e(n) {
    for (var t, r = "0123456789abcdef", e = "", o = 0; o < n.length; o += 1)
      (t = n.charCodeAt(o)), (e += r.charAt((t >>> 4) & 15) + r.charAt(15 & t));
    return e;
  }
  function r(n) {
    return unescape(encodeURIComponent(n));
  }
  function o(n) {
    return i(c(a((n = r(n))), 8 * n.length));
  }
  function u(n, t) {
    return (function (n, t) {
      var r,
        e = a(n),
        o = [],
        u = [];
      for (
        o[15] = u[15] = void 0,
          16 < e.length && (e = c(e, 8 * n.length)),
          r = 0;
        r < 16;
        r += 1
      )
        (o[r] = 909522486 ^ e[r]), (u[r] = 1549556828 ^ e[r]);
      return (
        (t = c(o.concat(a(t)), 512 + 8 * t.length)), i(c(u.concat(t), 640))
      );
    })(r(n), r(t));
  }
  function t(n, t, r) {
    return t ? (r ? u(t, n) : e(u(t, n))) : r ? o(n) : e(o(n));
  }
  "function" == typeof define && define.amd
    ? define(function () {
        return t;
      })
    : "object" == typeof module && module.exports
    ? (module.exports = t)
    : (n.md5 = t);
})(this);
```

1. **MD5 Implementation**: This function implements the MD5 hashing algorithm, which is used to generate a unique hash from the user's email. The detailed implementation is beyond the scope of this tutorial, but you can refer to MD5 documentation for more information.
2. **Usage**: This function is called later to hash the user's email.

And this is the output:

```json
{
  "event": "form_submitted",
  "form_id": "366c848d-26e5-4294-b185-9bab4cc661e6",
  "user_id": "9ad6c92b4795ffc23a27d805ad7421ef"
}
```

**You can add this code either as custom HTML tag in Google Tag Manager or directly within your code base.**

## Creating the Google Analytics 4 Tag

Using the following steps, we will create a GA4 Event tag that will track the form submission event and set the user id.

1. Create a New Tag:
   1. In your GTM workspace, click on Tags in the left-hand menu.
   2. Click on the New button to create a new tag.
2. Configure the Tag:
   1. Click on Tag Configuration.
   2. Select Google Analytics: GA4 Event.
3. Select GA4 Configuration Tag:
   1. Choose the GA4 Configuration Tag you have previously set up. If you haven't set one up, you'll need to create it by selecting New Tag, then Google Analytics: GA4 Configuration, and entering your GA4 Measurement ID.
4. Name Your Event:
   1. Enter the event name under Event Name. The value you should enter is {{Event}} . This will capture the event parameter’s value in the dataLayer. In our case, the value is form_submitted
5. Add Event Parameters:
   1. Click on Add Parameter , then enter form_id and in the Value field, enter {{DLV - Form ID}} .
   2. Again click on Add Parameter , then enter user_id and in the Value field, enter {{DLV - User ID}} .
6. Set Up Triggers:
   1. Click on Triggering to select when the tag should fire.
   2. Create a custom event trigger and in the event name enter form_submitted
7. Save the Tag:
   1. After configuring the tag and trigger, click Save.

**Note: you still need to create 2 dataLayer variables with the name DLV - Form ID and DLV - User ID with their respective values being form_id and user_id**

Don’t forget to create a user-level custom dimension with the same value as the Google Tag which in our case would be hashed_user_id.

After configuring the tag don’t forget to save and publish your workspace.

## Conclusion

With these additions, you are now able to track your users’ journey across platforms and devices through generating a unique ID using the MD5 algorithm.
