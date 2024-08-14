---
author: Aziz Dhaouadi
categories: ["Thinkific"]
date: 02/13/2023
featured: false
image: ./images/track-hubspot.png
title: Tracking Thinkific Events
---

Thinkific is one of the most commonly used platforms by creators to create their courses, monetize memberships and grow their online audience. As a creator, understanding your growth trends is crucial for your business and that's why today, we will talking about how you can track Thginkific events in order for you to have visibility over your students' interactions with your courses. That being said, the tracking we are going to implement will be through Google Tag Manager. Let's dive right in.

## Thinkific events

As any platform, Thinkific does offer a lot features for its users, but what we are interested in are the features that would help us set up our online measurement. The events we are going to review during the article are:

- Signup
- Purchase
- Course completion
- Content completion

These events constitute the most important interactions with your Thinkific-based site. If more tracking needs to be done, we are going to cover how to do that, so keep on reading. Beforewe begin make sure that you have your Google Tag Manager container ready. If don't have that ready yet, follow this link to set up your container.

## Thinkific's code & analytics

Once your container is set up, it's time to add its installation script to Thinkific. This is what is going to allow us to track the abovementioned events. Adding the installation code is a very straightforward task. First, proceed to copy your container's installation script. The script looks something like this:

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

You do not have to add the second section of the installation code. That part will not be necessary. The next step is to log into your Thinkific's account, click on Settings and then click on the Code & analytics tab inside the settings page. In the code & analytics section, you will see the following sections:

- Site footer code
- Order tracking code
- Signup tracking code

These are the section where we will be pasting our code to complete our events tracking. For our Google Tag Manager installation script, we will need to add it in the Site footer section ensuring that our container will load on every page which should allow us to track whatever we need.

## Tracking Thinkific Events

Once our container has been added to the Site footer, we can get started with out tracking. Since we on the Site footer, let's discuss the events we can track in this section.

### Content Completed

The first event we are going to track in this section is the module completed event. This event fire whenever a user click on the "Next" button and completes the lesson. To fire this event, we will be using the Course Player Event Hooks. Here's an example usage of the hooks:

```js
$(function () {
  if (typeof CoursePlayerV2 !== "undefined") {
    CoursePlayerV2.on("hooks:contentWasCompleted", function (data) {
      data["user"] = Thinkific.current_user;
      ThinkificAnalytics.track("Custom Content Completed", data);
    });
  }
});
```

That being said, here's the tracking code for firing a content completed event using the dataLayer:

```js
$(function () {
  if (typeof CoursePlayerV2 !== "undefined") {
    // EVENT HOOK: Content completed
    CoursePlayerV2.on("hooks:contentWasCompleted", function (data) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "Content Module Completed",
      });
    });
  }
});
```

The given code is a script written in jQuery that listens for the contentWasCompleted event fired by the CoursePlayerV2 object. If the CoursePlayerV2 object is defined, the script will push an event named "Content Module Completed" to the dataLayer when the contentWasCompleted event is fired. The dataLayer is a global JavaScript object used to store data that is passed to Google Tag Manager for tracking purposes. If your purpose is just to track the event then you are done. If you are interested in sending parameters along with the event then let's do just that. Based on Thinkific's documentation, we can see the event passes the following data:

```js
var data = {
  lesson: {} //object containing lesson attributes,
  chapter:  {} //object containing chapter attributes,
  course:  {} //object containing course attributes,
  enrollment:  {} //object containing enrollment attributes,
  user: {} //object containing student attributes
}
```

Here's what the content complete event would like with a full list of parameters being sent to the dataLayer:

```js
// Event = Completed Module and Course
$(function () {
  if (typeof CoursePlayerV2 !== "undefined") {
    // EVENT HOOK: Content completed
    CoursePlayerV2.on("hooks:contentWasCompleted", function (data) {
      console.log("Content Module Completed", data); //Optional this is for debugging
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "content_completed",

        //Lesson metadata
        lesson_name: data.lesson.name,
        lesson_slug: data.lesson.slug,
        lesson_position: data.lesson.position,
        lesson_chapter_id: data.lesson.chapter_id,
        lesson_id: data.lesson.id,

        //Chapter metadata
        chapter_name: data.chapter.name,
        chapter_course_id: data.chapter.course_id,
        chapter_id: data.chapter.id,

        //Course metadata
        course_name: data.course.name,
        course_slug: data.course.slug,
        course_landing_page_url: data.course.landing_page_url,
        course_video_completion_percentage:
          data.course.video_completion_percentage,
        course_product_id: data.course.product_id,
        course_id: data.course.id,

        //Enrollment metadata
        enrollment_percentage_completed: data.enrollment.percentage_completed,
        enrollment_activated_at: data.enrollment.activated_at,
        enrollment_created_at: data.enrollment.created_at,
        enrollment_date_started: data.enrollment.date_started,
        enrollment_course_id: data.encrollment.course_id,
        enrollment_id: data.enrollment.id,

        //User metadata
        user_id: data.user.id,
        user_created_at: data.user.created_at,
        user_last_sign_in_at: data.user.last_sign_in_at,
        user_number_courses_complete: data.user.number_courses_complete,
      });
    });
  }
});
```

You can use this data to enrich your tracking about user behaviour. For instance, using this metadata, you can know the % of your content users are completing after purchasing your courses. Once you have made your choice about adding the parameters, all you have to do is add the right code block into the footer section and you are done.

### Course Completed

Tracking this event is exactly like tracking the content completed event. Here's the event will its full list of parameters:

```js
// Event = Completed Module and Course
$(function () {
  if (typeof CoursePlayerV2 !== "undefined") {
    // EVENT HOOK: Content completed
    CoursePlayerV2.on("hooks:enrollmentWasCompleted", function (data) {
      console.log("Content Module Completed", data); //Optional this is for debugging
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "course_completed",

        //Lesson metadata
        lesson_name: data.lesson.name,
        lesson_slug: data.lesson.slug,
        lesson_position: data.lesson.position,
        lesson_chapter_id: data.lesson.chapter_id,
        lesson_id: data.lesson.id,

        //Chapter metadata
        chapter_name: data.chapter.name,
        chapter_course_id: data.chapter.course_id,
        chapter_id: data.chapter.id,

        //Course metadata
        course_name: data.course.name,
        course_slug: data.course.slug,
        course_landing_page_url: data.course.landing_page_url,
        course_video_completion_percentage:
          data.course.video_completion_percentage,
        course_product_id: data.course.product_id,
        course_id: data.course.id,

        //Enrollment metadata
        enrollment_percentage_completed: data.enrollment.percentage_completed,
        enrollment_activated_at: data.enrollment.activated_at,
        enrollment_created_at: data.enrollment.created_at,
        enrollment_date_started: data.enrollment.date_started,
        enrollment_course_id: data.encrollment.course_id,
        enrollment_id: data.enrollment.id,

        //User metadata
        user_id: data.user.id,
        user_created_at: data.user.created_at,
        user_last_sign_in_at: data.user.last_sign_in_at,
        user_number_courses_complete: data.user.number_courses_complete,
      });
    });
  }
});
```

If you want to track course completions and send the full list of parameters then simply add the script to the site footer and you will be good to go. If you do not need the parameters, simply delete them before pasting the event into the Site footer.

### Signups

For this section of tracking, we are going to be adding our tracking code to the Signup tracking code section. The signup tracking code is triggered when a user successfully signs up. Let's take a look at the tracking code for this event:

```js
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  event: "sign_up",
});
```

If you need to send parameters with the event, the following variables can be used:

- id
- first_name
- last_name
- full_name
- email
- create_at

To use the variable, used the following syntax {{variable_name}}. Next up is the purchase event.

### Purchase

To track the purchase event, we will be adding our code to the Order tracking section. This code will run on the thank you page when a purchase is completed. Let's have a look at the tracking code:

```js
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  ecommerce: null
}); // Clear the previous ecommerce object.
dataLayer.push({
  event: "purchase",
  ecommerce: {
    transaction_id: '{{ order_number }}',
    value: {{total_price}},
    currency: 'USD',
    items: [{
      item_name: '{{ product_name }}',
      quantity: 1,
      price: {{total_price}},
      currency: 'USD',
      affiliation: '{{referral_code}}'
    }]
  }
});
```

When a purchase is made, this code generates a "purchase" event with details of the transaction. The first two lines of the code block initialize the window.dataLayer array and clear any previous ecommerce data from the data layer. The dataLayer.push() function is then called to push a new event to the data layer with the event name of "purchase". The ecommerce object nested within the event contains details about the transaction, including the transaction ID, transaction value, and currency. The items array within the ecommerce object contains information about the specific products in the transaction, including the product name, quantity, and price. The affiliation field can be used to identify the referral code that led to the purchase. If you need more parameters sent, here's the full list:

- order_number
- order_name
- billing_name
- billing_email
- payment_method
- total_price_in_cents
- total_price
- referral_code
- product_id
- payment_provider
- buyer_identified

> If you are using these variables, please wrap them up inside {{ }}

## Tags Configuration in Google Tag Manager

After you have added the tracking codes to the right tracking sections, it is time to configure your tags in Google Tag Manager. When configuring the Google Analytics 4 event tags, use the {{Event}} variable for the event name. For the purchase event, enable the Send Ecommerce data setting under the More Settings dropdown. If you are using any parameters, make sure to create dataLayer variables in Google Tag Manager.

That's wrap folks! At this point, you should be able to track your Thinkific events using Google Tag Manager and the dataLayer.
