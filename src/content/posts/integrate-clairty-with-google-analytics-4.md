---
author: Aziz Dhaouadi
categories: ["Google Tag Manager", "Clarity", "Google Analytics 4"]
date: 09/08/2024
featured: false
image: ./images/track-hubspot-submissions.png
title: Integrate Micosoft Clarity with Google Analytics 4
---

If you are a web analyst working on optimizing your digital assets' User Experience (UX), using behavioral analytics tools offering session recordings and heatmaps can come in handy, especially when working with UI/UX designers.

In this tutorial, we will have a look at how we can integrate Google Analytics 4 and Microsoft's Clarity to get access to the playback URL of session recordings. With this integration in place, you will gain access to valuable information which will help you unlock insights on how users are using your application.

## Pre-requisites

Before getting started with the integration, you will need the following at the ready:

- Google Analytics 4 property
- Microsoft Clarity account
- Google Tag Manager account

You can also use `gtag.js` for this integration, but you will need to code the cookie capturing logic; more on that later.

## Capturing the sessionID and userID cookie

The first part of the integration is to capture Clarity's sessionID and userID cookie. These cookies are required to build the playback URL which we are going to be sending to Google Analytics 4. So, the first step is to fetch the value of both these cookies and store them in separate variables to be used later.

### Capturing the sessionID cookie

The cookie we are looking to capture is `_clsk`. And to do so, all we have to do is to create a `First-party Cookie` variable in Google Tag Manager. Here are the steps you need to take:

1. Click on the variables tab
2. Under `User-Defined Variables`, click on `New`
3. From the list, choose `1st Party Cookie`
4. Name your variable. In our case, we will use the name `var_cSessionID`
5. In the cookie name field, paste `_clsk`
6. Check the `URI-decode cookie`
7. Save your variable

### Capturing the userID cookie

For this section, the cookie we want to capture is `_clck`. Here are the steps you need to take to capture the value of this cookie:

1. Click on the variables tab
2. Under `User-Defined Variables`, click on `New`
3. From the list, choose `1st Party Cookie`
4. Name your variable. In our case, we will use the name `var_clarityUserID`
5. In the cookie name field, paste `_clck`
6. Check the `URI-decode cookie`
7. Save your variable

## Building the playback URL variable

Now that both cookies are captured and saved in Google Tag Manager variables, the next step is to build the playback URL. This URL will also be saved in a Google Tag Manager variable which is going to be used as the value of an event parameter sent to Google Analytics 4. This variable will be a `custom JavaScript variable` we will create. Here are the steps:

1. Click on the variables tab
2. Under `User-Defined Variables`, click on `New`
3. From the list, choose `Custom Javascript`
4. In the value field, paste the following code snippet

```jsx
function returnClarityPlaybackURL() {

  var projectID = '&lt;your-project-id&gt;'; // Replace this value with your actual Clarity project
  var rootURL = 'https://clarity.microsoft.com/player/';
  
  if(!{{var_cSessionID}} || !{{var_clarityUserID}}) {
    return {{Undefined}};
  }

  var sessionID = {{var_cSessionID}}.split("|")[0];
  var cUserID = {{var_clarityUserID}}.split("|")[0];
  var playbackURL = rootURL + projectID + "/" + cUserID + "/" + sessionID;

  return playbackURL;
  
}
```

5. Name your variable. In our case, we will name it `var_returnClarityPlaybackURL`.
6. Save the variable

## Google Analytics 4 Event

Now that the playback URL is constructed, the next step is to send this data along with an event to Google Analytics 4. Here is what you need to do:

1. Create a new Google Analytics: GA4 Event
2. In the `Measurement ID` field, enter your Google Analytics 4 Measurement ID
3. In the `Event Name` field, enter `clarity`
4. Add an Event Parameter with the name `claritydimension` and have its value set to `var_returnClarityPlaybackURL`
5. Set the trigger so the event fires on every page
6. Name your tag and then save it

## Next Steps

The next step is to test your implementation by previewing the workspace and make sure that the playback URL is properly being sent to Google Analytics 4.