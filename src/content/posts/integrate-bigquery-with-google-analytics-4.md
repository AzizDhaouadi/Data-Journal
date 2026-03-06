---
author: Aziz Dhaouadi
categories: ["Google Analytics 4", "BigQuery"]
date: 12/24/2024
featured: true
image: ./images/ga-consent.png
title: "Link Google Analytics 4 to BigQuery: Data Export Setup Guide"
description: Set up the GA4 BigQuery data export link for raw event data access. Covers project setup, dataset configuration, export frequency, table schema, and cost management for daily and streaming exports.
---

In this tutorial, we will walk through the steps to integrate Google BigQuery with Google Analytics 4. In an upcoming article, we will show you how to visualize the data stored in BigQuery in Looker Studio. Before we get started, please make sure to have the following ready:

- Google Analytics 4 account
- Google Cloud account

## Why do you need to set up the integration between Google Analytics 4 and BigQuery?

- Extend data retention beyond the 2 to 14 months offered in the Google Analytics interface.
- Gain complete ownership of your analytics data.
- Seamlessly connect data to other platforms like Google Search Console and Google Ads.
- Create a cost-effective backup for your GA4 property.

## Setting up BigQuery Project

The first step is to create a project in Google Cloud Platform (GCP). We will create a Google-API-Console project and enable the BigQuery API. Follow these steps:

1. Log in to the [Google Cloud Console](https://console.cloud.google.com/?utm_source=support.google.com&utm_medium=referral&utm_campaign=ga4_bq_xsell_campaign&utm_content=from_page_GA4_Set_up_BigQuery_Export).
2. Create a new Google Cloud Console project. If you have an existing project, you can select it.
    1. If you are creating a project, click on the **NEW PROJECT** button.
    2. Give your project a name.
    3. Choose your Organization.
    4. Choose a location for your project.

### BigQuery Sandbox

The steps above assume that you have **Billing** set up within your Google Cloud Project (GCP). If you want to explore what BigQuery offers before committing to a paid account, the BigQuery sandbox is the perfect environment.

The BigQuery sandbox is an environment where you can explore BigQuery capabilities at no cost. The sandbox lets you experience the platform without a credit card or needing to create a billing account for your project.

### Start using the BigQuery Sandbox

1. Navigate to the **BigQuery** [page](https://console.cloud.google.com/bigquery) or enter the following URL in your browser [`https://console.cloud.google.com](https://console.cloud.google.com)/bigquery`.
2. Authenticate with your Google Account (or create a new one).
3. On the welcome page:
    1. Select your country.
    2. Accept the terms of service.
    3. Agree and continue.
4. Click **Create project**.
5. On the New Project page:
    1. Enter a name for your project.
    2. For **Organization**, select one or select **No organization** if this is individual.
    3. Select a location for your project.
    4. Click **Create**.
    5. You are automatically redirected to the **BigQuery** page in the Google Cloud console.

### Limitations of the sandbox environment

- All BigQuery [quotas and limits](https://cloud.google.com/bigquery/quotas) apply.
- You are granted the same free usage limits as the BigQuery [free tier](https://cloud.google.com/bigquery/pricing#free-tier), including 10 GB of active storage and 1 TB of processed query data each month.
- All BigQuery [datasets](https://cloud.google.com/bigquery/docs/datasets-intro) have a [default table expiration time](https://cloud.google.com/bigquery/docs/updating-datasets#table-expiration), and all [tables](https://cloud.google.com/bigquery/docs/tables-intro), [views](https://cloud.google.com/bigquery/docs/views-intro), and [partitions](https://cloud.google.com/bigquery/docs/partitioned-tables) automatically expire after 60 days.
- The BigQuery sandbox does not support several BigQuery features, including:
    - [Streaming data](https://cloud.google.com/bigquery/docs/write-api).
    - [Data manipulation language (DML) statements](https://cloud.google.com/bigquery/docs/data-manipulation-language).
    - [BigQuery Data Transfer Service](https://cloud.google.com/bigquery/docs/dts-introduction).

Whether you created a project with a billing account or a sandbox environment, the steps moving forward are the same. Here’s how to continue the setup:

1. Navigate to the APIs table.
    1. Under **Google Cloud APIs**, click **BigQuery API**.
    2. On the following page, click **Enable**.

After completing the steps above, it’s time to activate the BigQuery Export in Google Analytics 4 Admin. Here’s what you need to do:

1. In the Admin panel in Google Analytics 4, under **Product Links**, click **BigQuery Links**.
    
    **Note**:  
    - You must have Editor or above access at the property level to link the Analytics property to BigQuery.
    - You must use the same email address that has **OWNER** access to the BigQuery project.
  
2. Click **Link**.
3. Click **Choose a BigQuery project** to display a list of projects for which you have access.
4. Select a project from the list.
5. Click **Confirm**.
6. Select a location for the data.
7. Select **Configure data streams and events** to choose which data streams to include within the export. To exclude events, click **Add** to select from the list of existing events or click **Specify event by name**.
8. Click **Done**.
9. Select **Daily** if you are on **BigQuery sandbox**. If you have billing configured, you can select either Daily or **Streaming**.
10. Click **Next**.
11. Review your settings and click **Submit**.

## Verifying the Link between Google Analytics 4 and BigQuery

When you link Analytics and BigQuery, that process creates the following service account: `firebase-measurement@system.gserviceaccount.com`. Verify that the account has been added as a member of the project, and given the role of [BigQuery User (roles/bigquery.user)](https://cloud.google.com/iam/docs/understanding-roles?utm_source=support.google.com&utm_medium=referral&utm_campaign=ga4_bq_xsell_campaign&utm_content=from_page_GA4_Set_up_BigQuery_Export#bigquery-roles).

## When should you expect to start seeing data?

Once the linkage is complete, data should start flowing to your BigQuery project within 24 hours. If you enable daily export, one file will be exported each day containing the previous day’s data.

### Unlinking BigQuery

1. In the Admin section, under Product Links, click **BigQuery Links**.
2. Click the row of the link.
3. In the top right, click the vertical dots and then **Delete**.

## Conclusion

With these steps, your Google Analytics 4 data should live in BigQuery. You can now use BI tools like Looker Studio, Tableau, or Power BI to visualize your data or integrate it with other marketing data to build an enhanced reporting infrastructure.