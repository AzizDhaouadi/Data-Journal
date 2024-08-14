---
author: Aziz Dhaouadi
categories: ["E-commerce", "Google Tag Manager", "Shopify"]
date: 07/26/2023
featured: false
image: ./images/track-ecommerce.png
title: Track E-commerce Events with Shopify's GA4 Integration
---

Shopify has released its integration with Google Analytics 4 making you E-commerce tracking seamless. But is it though? In today's post, we will be looking into how the integration works to see what is tracked out of the box as well as which events, if you want to track them, will have to be tracked manually through Google Tag Manager or gtag.js. Let's dive in.

## Shopify's Integration

First and foremost, please go ahead and read the [documentation](https://help.shopify.com/en/manual/reports-and-analytics/google-analytics/google-analytics-setup) by Shopify in order to get better context of what we are going to be doing. Essentially, this documentation will help you understand the requirements for this endeavour.

## Disabling Existing Tracking

Before you do anything else, there is one important task that needs to be done. And, that's disabling any current implementation that is sending data to Google Analytics 4. This is going to ensure that you are not sending the data twice to GA4. To do this, you must remove two things:

- The installation script from you theme.liquid file
- The purchase tracking from the order status page

Your installation script should look something like this if you installed GA4 through gtag.js:

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-PSW1MY7HB4"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-PSW1MY7HB4");
</script>
```

If you used Google Tag Manager then you would want to remove the following code snippets:

```html
<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-XXXXXXX");
</script>
<!-- End Google Tag Manager -->
```

```html
<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe
></noscript>
<!-- End Google Tag Manager (noscript) -->
```

For the purchase tracking code, follow these steps:

- From your Shopify admin, go to Settings > Checkout.
- In the Order status page section, go to the Additional scripts text box.
- In the box, locate either the Google Tag Manager or the gtag.js code for the purchase tracking and delete them.

> Make sure to create a copy of the existing code before removing any code.

If you are ensure of what to remove, please contact a developer to help with this. It is important not remove code that may affect the way your website works. That being said, once the code pieces have been removed, it is time to start the integration between Google Analytics 4 and Shopify.

## Intergrating Google Analytics 4 and Shopify

To integrate Shopify and GA4, all we need to do is to install the Google app for Shopify. If you have this app already installed in your shop, you can skip to the next step. If not, follow these steps:

- Log into you Shopify store, and search for the Google & Youtube app in Sales Channels (or you can click on this [link](https://apps.shopify.com/google))
- Install the app by clocking on Add app
- Once the app is installed, click Add sales channel
- Next, connect the app using the Google account used to set up Google Analytics 4.
- Auhtorize the app to access Google Analytics
- Click on Get started to set up Google Analytics 4
- Connect to your Google Analytics 4 property by selecting it from the dropdown
- Click connect once you have selected the right property
- If you seccessful, you should see a validation message confirming that the property is set up.

> If you encounter an error message, try to connect your property again.

## Validating the integration using Google Tag Manager and Debug View

Once you see the validation message, the next step is to test the integration to ensure that Google Analytics 4 is receiving the events. To do so, navigate you Google Tag Assistant by following this [link](https://tagassistant.google.com/), click on Add domain, enter your store's URL and click Connect.

Once the new window opens, proceed to mock a purchase. That is, select a product, add to the cart, checkout, enter the checkout information and make a purchase. If you look at the Google Tag Assistant tab, as you are firing the events, you will see the equivalent events logged into Google Analytics 4. You can also use the Debug View of Google Analytics to see the incoming events. If anything looks off, you can contact support and they will help you solve any issues.

If you are ensure which events you should be looking for, here's a list:
| Event name | Event description |
| ---------------- | ------------------------------------------------------ |
| **page_view** | A customer visited a page on your online store. |
| **search** | A customer searched for a product on your online store.|
| **view_item** | A customer viewed a product on your online store. |
| **add_to_cart** | A customer added a product to cart. |
| **begin_checkout** | A customer started the checkout process. |
| **add_payment_info** | A customer successfully entered payment information. |
| **purchase** | A customer completed their checkout. |

## Customizing the tracking

If you want to customize the tracking in place to add additional events, you can use Google Tag Manager or gtag.js to do so. Unfortunately, the event add_shipping_info would require Shopify Plus so you can edit the checkout file. Events like view_cart, view_item_list can be tracked using the above mentioned methods. However, to do so, a minimum knowledge of JS is required if you want to use gtag.js.

We have prepared a comprehensive [tutorial](./track-e-commerce-events-on-shopify/) on how you can track Shopify-related events. Check it out and feel free to reach out to us if you have any questions.

That's a wrap. And, as usual, happy tracking!
