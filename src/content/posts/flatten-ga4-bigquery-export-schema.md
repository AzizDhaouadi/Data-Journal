---
author: Aziz Dhaouadi
categories: ["Google BigQuery", "Google Analytics 4"]
date: 07/26/2025
featured: true
image: ./images/data-viz.png
title: "Flatten GA4 BigQuery Export Schema: UNNEST and Pivot SQL Guide"
description: Flatten the nested GA4 BigQuery export schema using SQL. Covers UNNEST for event_params and user_properties, MAX with PIVOT aggregation, repeated fields, and ready-to-use query templates.
---

If you have your Google Analytics 4 data exported to BigQuery, you would have noticed that the schema is quite complicated to work with. Many of the available dimensions are nested in structure and building reports based on said composition can lead to multiple subqueries and ctes being used which increases the difficulty quite a bit.

In order to avoid said complexity, we can modify the original exported table in order to make data extraction and manipulation much easier. This will be done though a process known as "**flattening**". In this exercise, we will be taking the original table and modifying it into a structure that is flat where aggregation can be easier to handle.

## The Original Export Schema

The GA4 export schema primarily refers to the structure of data when exported to Google BigQuery. This export allows for detailed analysis and custom reporting beyond the standard GA4 interface. 

### Key aspects of the GA4 BigQuery export schema
#### Events Table:
The core of the GA4 export is the *events_YYYYMMDD* table, which contains daily event data. If streaming export is enabled, an events_intraday_YYYYMMDD table is also available for near real-time data.

#### Schema Structure:
The schema within these tables defines the fields (columns) and their data types. It includes fields for:
* event_name: The name of the event (e.g., page_view, purchase).
* event_params: A nested record containing key-value pairs for event parameters.
* user_pseudo_id: A pseudonymous ID for tracking users.
* event_timestamp: The timestamp of the event.
* geo: A nested record with geographical information (e.g., country, region).
#### Nested and Repeated Fields:
The GA4 BigQuery schema utilizes nested and repeated fields (records). This structure allows for storing complex data within a single row, such as multiple event parameters or multiple items in a purchase.
#### Data Types:
Fields have specific data types, including STRING, INTEGER, RECORD, and REPEATED RECORD.
#### User Data (Optional):
If user export is enabled and user IDs are collected, additional tables like synonymous_users or users might be included in the export.
Understanding this schema is crucial for effectively querying and analyzing GA4 data within BigQuery, especially when dealing with nested and repeated fields, which require specific querying techniques.


## Flattening the table
```sql

WITH events_flattened AS (
  SELECT
    event_date,
    event_name,
    event_timestamp,
    event_previous_timestamp,
    event_value_in_usd,
    event_bundle_sequence_id,
    event_server_timestamp_offset,
    privacy_info.analytics_storage,
    privacy_info.ads_storage,
    privacy_info.uses_transient_token,
    geo.city AS city,
    geo.country AS country,
    device.category AS device_category,
    user_id,
    user_pseudo_id,
    user_first_touch_timestamp,
    traffic_source.name AS traffic_name,
    traffic_source.medium AS traffic_medium,
    traffic_source.source AS traffic_source,
    stream_id,
    platform,
    event_dimensions.hostname AS hostname,
    collected_traffic_source.manual_campaign_id,
    collected_traffic_source.manual_campaign_name,
    collected_traffic_source.manual_source,
    collected_traffic_source.manual_medium,
    collected_traffic_source.manual_term,
    collected_traffic_source.manual_content,
    collected_traffic_source.manual_source_platform,
    collected_traffic_source.manual_creative_format,
    collected_traffic_source.manual_marketing_tactic,
    collected_traffic_source.gclid,
    collected_traffic_source.dclid,
    collected_traffic_source.srsltid,
    is_active_user,
    batch_event_index,
    batch_page_id,
    batch_ordering_id,
    -- Session Attribution
    session_traffic_source_last_click.manual_campaign.campaign_id AS session_manual_campaign_id,
    session_traffic_source_last_click.manual_campaign.campaign_name AS session_manual_campaign_name,
    session_traffic_source_last_click.manual_campaign.source AS session_manual_source,
    session_traffic_source_last_click.manual_campaign.medium AS session_manual_medium,
    session_traffic_source_last_click.manual_campaign.content AS session_manual_content,
    session_traffic_source_last_click.manual_campaign.source_platform AS session_manual_source_platform,
    session_traffic_source_last_click.manual_campaign.creative_format AS session_manual_creative_format,
    session_traffic_source_last_click.manual_campaign.marketing_tactic AS session_manual_marketing_tactic,
    -- Cross Channel Attribution
    session_traffic_source_last_click.cross_channel_campaign.campaign_id AS cross_channel_campaign_id,
    session_traffic_source_last_click.cross_channel_campaign.campaign_name AS cross_channel_campaign_name,
    session_traffic_source_last_click.cross_channel_campaign.source AS cross_channel_source,
    session_traffic_source_last_click.cross_channel_campaign.medium AS cross_channel_medium,
    session_traffic_source_last_click.cross_channel_campaign.source_platform AS cross_channel_source_platform,
    session_traffic_source_last_click.cross_channel_campaign.default_channel_group AS cross_channel_default_channel_group,
    session_traffic_source_last_click.cross_channel_campaign.primary_channel_group AS cross_channel_default_primary_channel_group,
    -- Flattening event parameters
    COALESCE(event_params.key, '') AS param_key,
    COALESCE(event_params.value.string_value, 
             CAST(event_params.value.int_value AS STRING), 
             CAST(event_params.value.double_value AS STRING), 
             '') AS param_value
  FROM `<your- -query-project>.events_2024*`,
  UNNEST(event_params) AS event_params
),


final_flat AS (
  SELECT *
  FROM events_flattened
  PIVOT(
    MAX(param_value) FOR param_key IN (
      'term' AS term,
      'ga_session_id' AS ga_session_id,
      'source' AS source,
      'form_destination' AS form_destination,
      'form_length' AS form_length,
      'engagement_time_msec' AS engagement_time_msec,
      'batch_ordering_id' AS batch_ordering_id,
      'entrances' AS entrances,
      'error_url' AS error_url,
      'error_message' AS error_message,
      'page_title' AS page_title,
      'campaign' AS campaign,
      'medium' AS medium,
      'link_domain' AS link_domain,
      'ga_session_number' AS ga_session_number,
      'batch_page_id' AS batch_page_id,
      'synthetic_bundle' AS synthetic_bundle,
      'session_engaged' AS session_engaged,
      'ignore_referrer' AS ignore_referrer,
      'outbound' AS outbound,
      'error_line' AS error_line,
      'form_id' AS form_id,
      'page_location' AS page_location,
      'page_referrer' AS page_referrer,
      'engaged_session_event' AS engaged_session_event,
      'percent_scrolled' AS percent_scrolled,
      'debug_mode' AS debug_mode,
    ))
  ORDER BY event_date, event_name DESC
)

SELECT * FROM final_flat ORDER BY 1 DESC, 2 DESC;

```

The following query flattens the schema and allows you to interact with the table as a regular (traditional) table. Let's explore it.

### Read & Unnest (events_flattened CTE)

```sql
WITH events_flattened AS (
  SELECT
    -- Top‑level event fields
    event_date,
    event_name,
    event_timestamp,
    event_previous_timestamp,
    event_value_in_usd,
    event_bundle_sequence_id,
    event_server_timestamp_offset,

    -- Privacy flags
    privacy_info.analytics_storage,
    privacy_info.ads_storage,
    privacy_info.uses_transient_token,

    -- Geo & device
    geo.city        AS city,
    geo.country     AS country,
    device.category AS device_category,

    -- User identifiers
    user_id,
    user_pseudo_id,
    user_first_touch_timestamp,

    -- Hit‑level traffic source (last non‑direct click)
    traffic_source.name   AS traffic_name,
    traffic_source.medium AS traffic_medium,
    traffic_source.source AS traffic_source,

    -- Stream & platform
    stream_id,
    platform,

    -- Hostname & manual campaign fields
    event_dimensions.hostname,
    collected_traffic_source.*,

    -- “Active user” flag and batch indices
    is_active_user,
    batch_event_index,
    batch_page_id,
    batch_ordering_id,

    -- Session Attribution (last-click UTM tags)
    session_traffic_source_last_click.manual_campaign.*,

    -- Cross‑Channel Attribution (GA4’s channel buckets)
    session_traffic_source_last_click.cross_channel_campaign.*,

    -- Turn each event_param into its own row
    COALESCE(event_params.key, '') AS param_key,
    COALESCE(
      event_params.value.string_value,
      CAST(event_params.value.int_value   AS STRING),
      CAST(event_params.value.double_value AS STRING),
      ''
    ) AS param_value

  FROM
    `<your-project>.<your-dataset>.events_2024*`,
    UNNEST(event_params) AS event_params
)
```

1. Top‑level fields: pulls out every piece of context you need (timestamps, user IDs, geo, device, privacy).

2. collected_traffic_source.*: any manual UTM‑style fields you passed in with your tags.

3. Session attribution: under session_traffic_source_last_click.manual_campaign.*, you get the UTM tags that actually started that session.

4. Cross‑channel attribution: under session_traffic_source_last_click.cross_channel_campaign.*, you get GA4’s bucketed source/medium/channel group.

5. UNNEST(event_params): explodes each event’s parameter array into multiple rows, each with param_key and its stringified param_value.

### Pivot Back Into Columns (final_flat CTE)

```sql
final_flat AS (
  SELECT *
  FROM events_flattened
  PIVOT (
    MAX(param_value) FOR param_key IN (
      'term' AS term,
      'ga_session_id' AS ga_session_id,
      'source' AS source,
      /* …list every key you care about… */
      'debug_mode' AS debug_mode
    )
  )
  ORDER BY event_date, event_name DESC
)
```
* Why MAX()? After unnesting, an event can have many rows (one per param). Pivot requires an aggregation, so we pick MAX, which on strings just picks the non‑NULL value.

* Key list: explicitly enumerate the event parameters you want as columns. Anything not listed will be dropped.

### Final Output

```sql
SELECT *
FROM final_flat
ORDER BY event_date DESC, event_name DESC;
```
One final sort and you have a single table where each row is one GA4 event, with:

* All core event and user context as columns

* Exact UTM/manual campaign tags from when the session began

* GA4’s channel grouping for easy channel‑level reporting

* Every event parameter you care about as its own column*

### Understanding Attribution

| Attribution Type     | Source of Truth                                                                                    | Key Fields                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Session (Manual)** | Your UTM or manual campaign parameters that actually launched the session (last non‑direct click). | `session_manual_campaign_*`                                                                               |
| **Cross‑Channel**    | GA4’s internal source/medium and channel buckets (built from UTMs + defaults + your custom rules). | `cross_channel_*` + `cross_channel_default_channel_group` + `cross_channel_default_primary_channel_group` |


* Manual campaign fields give you raw campaign/UTM data exactly as you tagged it.

* Cross‑channel fields let you slice by GA4’s standard channel definitions (Organic Search, Paid Social, Email, etc.) without extra work.

### What about E-commerce data?
While this query does not cover the flattening of E-commerce related columns, the exact same approach can be utilized to achieve the same result with the said columns. 

### What's next?
Now that you have a truly flat, analysis‑ready table, one row per event, complete with all attribution and parameters, you can ditch those repeated UNNESTs in every query. Use this table for advanced segment and cohort analyses or to build custom attribution models beyond GA4’s defaults. And when you connect it to Looker Studio, dashboard creation becomes far more straightforward than wrestling with the raw export schema.
