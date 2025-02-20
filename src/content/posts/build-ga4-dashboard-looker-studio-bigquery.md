---
author: Aziz Dhaouadi
categories: ["Google Analytics 4", "Looker Studio", "Looker Studio"]
date: 02/19/2025
featured: true
image: ./images/track-hubspot-submissions.png
title: Advanced Google Analytics 4 Dashboard Development in Looker Studio Using BigQuery
---

## Introduction

This tutorial delves into the advanced implementation of a Google Analytics 4 (GA4) dashboard in Looker Studio, leveraging BigQuery as the primary data source.

By the end of this guide, you will have constructed a robust acquisition dashboard to facilitate data-driven decision-making for stakeholders. If you are not yet familiar with GA4’s data export schema in BigQuery, it is highly advisable to review the official [Google Analytics 4 export schema documentation](https://support.google.com/analytics/answer/7029846?hl=en). This documentation provides crucial insights into column structures, expected values, and nested fields.

For instance, the `event_params` column consists of an array of records. Each record contains a `key` (parameter name) and a `value`, which is a struct that supports multiple data types such as `string_value`, `int_value`, and `double_value`.

Here is the [dashboard](https://lookerstudio.google.com/u/0/reporting/fb0c939c-dd51-4ac7-bc1f-f0adcff1edfd/page/rVYDD) that we will be constructing.

---

## Filters Ribbon

Filters enhance dashboard interactivity by enabling refined data views based on acquisition attributes. The primary filters included in this dashboard are:

- **Acquired Campaign**
- **Acquired Source**
- **Acquired Medium**
- **Date Range Picker**

### Available Dimensions and Metrics

Below is a comprehensive list of dimensions and metrics accessible via the BigQuery connector:

| Dimension | Type |
|-----------|------|
| Acquired Campaign | Text |
| Acquired Medium | Text |
| Acquired Source | Text |
| Advertising ID | Text |
| App ID | Text |
| App Install Source | Text |
| App Version | Text |
| City | Geo - City |
| Continent | Geo - Continent |
| Conversion | Boolean |
| Country | Geo - Country |
| Days Since First Touch | Number |
| Device Category | Text |
| Device Model (OS) | Text |
| Event Date | Date |
| Event Name | Text |
| Event Param Value | Number |
| Event Param Value (String) | Text |
| Event Previous Time | Date & Time |
| Event Time | Date & Time |
| Event Time Offset | Number |
| Event Value (USD) | Currency (USD - US Dollar ($)) |
| Firebase App ID | Text |
| First Touch Time | Date & Time |
| Language | Text |
| Limit Ad Tracking Enabled | Text |
| LTV Currency | Text |
| LTV Revenue | Currency (USD - US Dollar ($)) |
| Mobile Brand Name | Text |
| Mobile Model Name | Text |
| Mobile Marketing Name | Text |
| OS | Text |
| OS Version | Text |
| Platform | Text |
| Region | Country subdivision (1st level) |
| Stream ID | Text |
| Time Zone Offset | Number |
| User ID | Text |
| User Property Name | Text |
| User Property Value (Double) | Number |
| User Property Value (Integer) | Number |
| User Property Value (String) | Text |
| User Pseudo ID | Text |
| Event Count | Number |
| Unique Users | Number |



## User Overview Section

This section consists of:

- **Three scorecards:** Total Users, Active Users, and New Users
- **A time series chart** displaying these metrics over time

### Total Users

- **Metric:** Unique Users
- **To display percentage change**, enable the **Comparison Date Range** option and set it to **Previous Period**.

### Active Users

Since July 2023, Google Analytics 4 introduced the `is_active_user` field in BigQuery exports. If you are using this newer schema, simply apply a distinct count on `user_pseudo_id`. Otherwise, use the following filter combination:

**Filter Conditions:**

- `Event Param Name = engagement_time_msec` AND `Event Param Value > 0`
- OR `Event Param Name = session_engaged` AND `Event Param Value = 1`

**Metric:** COUNT DISTINCT on `user_pseudo_id`

### New Users

- **Metric:** Unique Users
- **Filter:** `Event Name = first_visit`

### Time Series Chart for Users

Since this chart contains multiple metrics, a **blended data source** is required, consisting of three tables:

- **Table 1:** Total Users (Unique Users)
- **Table 2:** Active Users (using the filters mentioned above)
- **Table 3:** New Users (using `first_visit` event filter)

**Join key:** Event Date  
**Join type:** Left Outer

## Sessions Overview Section

This section contains:

- **Three scorecards:** Sessions, Engaged Sessions, and Engagement Rate
- **A time series chart**

### Sessions

- **Metric:** Event Count
- **Filter:** `Event Name = session_start`

### Engaged Sessions

- **Metric:** Event Count
- **Filter:** `Event Param Name = session_engaged` AND `Event Param Value = 1`

### Engagement Rate

- **Formula:** Engaged Sessions / Sessions
- Use blended data sources with a **cross join** (no join key required).

## Events Overview

This section presents a tabular view of events and their respective event counts.

- **Dimension:** Event Name
- **Metric:** Event Count

## Pages Overview

This section analyzes **page views per page title**.

**Filters:**

- `Event Name = page_view`
- `Event Param Name = page_title`

**Metrics & Dimensions:**

- **Dimension:** `Event Param Value (String)` → Rename to **Page Title**
- **Metric:** `Event Count` → Rename to **Views**



## Performance Overview

This section visualizes key performance indicators across three charts:

### Sessions by Country

- **Chart Type:** Geo Chart
- **Geo Dimension:** Country
- **Metric:** Event Count
- **Filter:** `Event Name = session_start`
- **Zoom Area:** World

### Top 5 Countries (Sessions)

- **Chart Type:** Bar Chart
- **Data Source:** Duplicate *Sessions by Country*
- **Limit Bars to:** 5 (Descending order by Sessions)

### Sessions by Source / Medium

- **Metric:** Sessions (Event Count with `session_start` filter)
- **Custom Dimension:** `CONCAT(Acquired Source, " / ", Acquired Medium)`

## Conclusion

By following this structured approach, you have developed a dynamic acquisition dashboard in Looker Studio powered by BigQuery. Mastering the manipulation of Google Analytics 4 data in SQL enables advanced analysis, custom metrics development, and deeper insights into user behavior. Continue exploring the dataset to refine your dashboard further and extract meaningful business intelligence.
