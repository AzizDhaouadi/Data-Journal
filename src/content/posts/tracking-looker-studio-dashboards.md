---
author: Aziz Dhaouadi
categories: ["Google Analytics 4", "Looker Studio"]
date: 02/29/2024
featured: false
image: ./images/track-looker-studio.png
title: Tracking Looker Studio Dashboards
---

We will explore how to track pageviews across your Looker Studio reports. This insight will help you understand how your data creations are utilized and how you can support stakeholders by making dashboards more accessible.

## Tracking prerequisites

Before proceeding with the tracking steps, ensure you have the following ready:

- The Looker Studio report(s) you want to track.
- The measurement ID from the Google Analytics 4 property where you plan to send the data. It is recommended to create a new property for this purpose.

## Step 1: Adding the measurement ID to Looker Studio

Once you have your measurement ID, the first step is to add it to the Looker Studio report(s) you wish to track. To do this:

1. Open the Looker Studio report you chose.
2. Click on "File" and select "Report settings".
3. In the "Google Analytics Measurement IDs" section, paste your measurement ID.

## Step 2: Configuring the Google Analytics 4 property

After adding the measurement ID to your Looker Studio report(s), the next step is to configure the destination:

- **Stream URL**: Ensure the protocol is https:// and the value equals lookerstudio.google.com.
- After saving the configuration, refresh your Looker Studio reports to initiate tracking.

## Verifying the implementation

To check if data is flowing correctly, navigate to the Realtime report of your property.

## Reporting on Looker Studio usage data

When reporting on Looker Studio usage data, consider the following:

- Pay close attention to the URL. If the page path includes /edit, it reflects activity from editing the dashboard by you or your collaborators. Use the Exploration feature to filter out these pages and focus on those used by dashboard users.
- For grouping pageviews per dashboard, use the RegExp (.\*?) › to create a custom field when importing data into Looker Studio.
- For pageviews per page, use the RegExp › (.\*?) for creating a custom field.
- To track the "Copy Report" action, especially for public templates, create a custom event in Google Analytics 4 with the event name form submit and form destination containing /copyReport.

## Conclusion

By following the steps outlined in this blog, you'll be able to track your Looker Studio dashboards and gain insights into how stakeholders use the insights presented. This data is invaluable for understanding how to improve data adoption within your organization.
