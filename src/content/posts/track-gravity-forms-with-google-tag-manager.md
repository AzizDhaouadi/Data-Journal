---
author: Aziz Dhaouadi
categories: ["Google Tag Manager", "Gravity Forms"]
date: 07/30/2024
featured: false
image: ./images/gravity-forms.png
title: Track Gravity Forms with Google Tag Manager
---

## Introduction

Gravity Forms is one of the most widely used plugins for form creation on WordPress sites. And in this tutorial we will see how we can track these forms. Specifically, we will learn how we can track successful form submissions when the form shows a thank you message or redirects to a thank you page / third party URL.

## Tracking Form Submissions - Confirmation Message

When creating a Gravity Form, showing the user a thank you message is the default behaviour. Let's learn how to track this. Gravity Forms provides us with a default list of JavaScript Hooks that we can use in order to customize the way our form looks or interacts with the user based on specific conditions. One of said hooks is gform_completion_loaded. This hooks fires on AJAX-enabled forms when the confirmation message is displayed. You can read more about this hook in the official documentation.

## What are AJAX enabled forms

AJAX-enabled forms are web forms that use Asynchronous JavaScript and XML (AJAX) to submit form data to the server without requiring a full page refresh.

## Tracking code for Gravity Forms - Confirmation Message

Let's look at how to track successful form submissions when our gravity forms are programmed to show a confirmation message.

```js
jQuery(document).ready(function () {
  jQuery(document).bind("gform_confirmation_loaded", function (event) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "successful_form_submission",
    });
  });
});
```

You can customize the code above to track specific submissions based on which confirmation message is shown on the users' screens. Our code then would look something like the following

```js
jQuery(document).ready(function () {
  jQuery(document).bind("gform_confirmation_loaded", function (event, formID) {
    window.dataLayer = window.dataLayer || [];
    if (formID === 1) {
      window.dataLayer.push({
        event: "qualified_leads_form_submitted",
      });
    } else if (formID === 2) {
      window.dataLayer.push({
        event: "contact_us_form_submitted",
      });
    }
  });
});
```

You can use the check on the formID to customize other tracking flows if need be. Please note that in order for the tracking script to work, jQuery needs to be deployed on your side. If you are using Wordpress to build your website, jQuery is most likely already deployed. If you are deploying any of the code blocks above on Google Tag Manager, make sure the Custom HTML tag fires on all the pages where the Gravity Forms are deployed.

## Tracking Form Submission - Thank you URL & Third Party URL

The real challenge with Gravity forms is tracking form submissions when form redirects to a thank you page or a third party URL. The challenge is that Gravity forms do not offer any out-of-the-box JavaScript hooks that we can use to track successful form submissions. If you have a form that redirects to URL, using the above script will result in tacking failure. This is because the JavaScript hook above requires the form to use a confirmation message, not a URL redirect. In order to track these forms, we need a script that validates the forms, and then sends tracking data to the appropriate analytics tools. Here's the outline our script:

1. Interrupt Default Behaviour on Form Submission: Prevent the form from submitting in the traditional way.
2. Validate the Form: Check that all required fields have valid data (e.g., email is not empty).
3. If the Form Data is Valid, Send Tracking Data: Execute the tracking code to log the form submission event.
4. Resubmit the Form While Avoiding Recursion: Programmatically submit the form only if validation passes, and ensure the form doesn't enter a recursive submission loop.

## What is a recursive submission loop?

Before answering this question, let's look at what recursion is. Recursion is a process where a particular set of instructions reference themselves as such creating a loop where a process calls itself until the exit condition is met.

In the context of form submissions, a recursive submission loop represents a form programmatically submitted until an exit condition is met. This type of behaviour is dangerous as it could lead the form to be infinitely submitted if the checks are not set properly

## Tracking code for Gravity Forms - URL Redirect

Let's breakdown a script that validates a Gravity form redirecting to URL on successful form submission and sends an event to the dataLayer.

```js
jQuery(document).ready(function ($) {
  // Attach submit event to all Gravity Forms
  $(document).on("submit", ".gform_wrapper form", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    var form = $(this);
    var emailField = form.find('input[type="email"]');

    // Check if the form is already being submitted
    if (form.data("isSubmitting")) {
      return;
    }

    // Check if the email field is not empty and select field has a valid value
    if (emailField.length && emailField.val().trim() !== "") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "succesful_form_submission",
      });

      // Set a flag indicating the form is being submitted
      form.data("isSubmitting", true);

      // Remove the submit handler to avoid recursion
      $(document).off("submit", ".gform_wrapper form");

      // Submit the form programmatically
      form.submit();
    } else {
      console.error(
        "Form validation failed. Either email is empty or select value is not valid."
      );
    }
  });
});
```

- Document Ready: Ensures the enclosed code runs only after the DOM is fully loaded.
- Attach Submit Event: Attaches a submit event handler to all forms within elements that have the class gform_wrapper.
- Prevent Default Behaviour: Prevents the default form submission behaviour to allow for custom processing.
- Define Variables:form: Refers to the form that triggered the submit event.emailField: Finds the email input field within the form.
- Check Submission Flag: Checks if the form is already being submitted. If so, exits the function to prevent multiple submissions.
- Validate Fields: Checks if the email field is not empty.
- Push Event to Data Layer: Sends a tracking event to the dataLayer indicating a successful form submission.
- Set Submission Flag: Sets a flag (isSubmitting) on the form to indicate it is being submitted.
- Remove Submit Handler: Removes the submit handler from the document to avoid recursion.
- Programmatically Submit Form: Submits the form programmatically.
- Validation Failure: Logs an error message if the email field is empty or the select field value is invalid.

Even if your form redirects to a URL, you can still run conditional tracking based on the ID by grabbing the value during form submission. All you have to do is create a variable that captures the form ID and add an additional if statement before logging event data into the dataLayer.

## Conclusion

With these tracking scripts you should be able to track all Gravity forms whether they are showing users a confirmation message or redirecting them to a URL.
