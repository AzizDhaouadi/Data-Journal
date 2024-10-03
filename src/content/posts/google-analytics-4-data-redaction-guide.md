---
author: Aziz Dhaouadi
categories: ["Google Analytics 4"]
date: 10/03/2024
featured: false
image: ./images/data-viz.png
title: How to Configure Data Redaction in Google Analytics 4
---

Data redaction is a feature in Google Analytics 4 that helps you protect your property ensuring, to an extent, that no Personally Identifiable Information (PII) is collected.

Configuring this feature in Google Analytics 4 is essential for adding an extra layer of security to your data collection efforts.

### What is a URL query parameter?

A URL query parameter is a key-value pair that follows the question mark (?) or (&) at the URL. For example, the event parameter, **form_destination** might contain a URL with query parameters such as `https://www.example.com/us?language=english&catalog=summer24` 

## How does data redaction work?

This feature uses text patterns to identify likely to be email addresses in all event parameters and URL query parameters that are included as part of the event parameters `page_location`, `page_referrer`, `page_path`,  `link_url`, `video_url`, `form_destination`

Data redaction evaluates events before they are collected to find and redact (remove) any text it understands as an email or query parameter key-value pair. After the redaction of the text, data collection proceeds as expected.

Data redaction evaluates events before they are collected to find and redact (remove) any text it understands as an email or query parameter key-value pair. After the redaction of the text, data collection proceeds as expected.

Again, while this is a powerful tool preventing you from sending or collecting PII inadvertently, the ultimate responsibility falls on you, the entity collecting the data. Please ensure that you are meeting all regulatory requirements for data collection, and do not rely on data redaction as your primary defence against sending or collecting PII. As mentioned before, this feature should be another tool in your arsenal and not your main tool.

### Is data redaction activated by default for Google Analytics 4?

Any property created after the release of this feature will have data redaction for email on by default. Data redaction for URL query parameters will still have to be configured separately. If your property was created before the release of this feature, you will need to configure data redaction for both email addresses and URL query parameters.

<aside>
💡

**Please note that data redaction is only available for web data streams.**

</aside>

### Data Redaction - Good to Know

- Data redaction evaluates event data for email addresses on a best-effort basis
- Data redaction occurs client side after Analytics modifies or creates events and **before** data is sent to Analytics
- Data redaction accepts recent-encoded URL query parameters, including Unicode characters accepted by browsers
- Data redaction may incorrectly interpret text as as an email address and redact the text. For instance, if the text contains `@` followed by a top-level domain name it may be incorrectly removed
- Data redaction does not evaluate HTTP-header value
- Data redaction won’t prevent the collection of PII via Measurement Protocol or Data Import

## How to configure data redaction in Google Analytics 4?

To configure data redaction in Google Analytics 4, you can follow these steps:

1. In the Admin section, under *Data collection and modification*, click **Data Streams**
2. Select the relevant web data steam
3. Click **Redact data**
4. Turn on the switch for each option you want to activate data redaction for
    1. Email
    2. URL query parameters
5. If you chose to active data redaction for URL query parameters, enter a comma delimited list
    1. For example: first_name, last_name, email, address, phone_number
6. The last step is to test URL query parameters data redaction using the **Test data redaction** feature to see how Analytics removes the data in question
    1. Under the data in the text field. Make sure it contains URL query parameters you entered in the previous step
        1. https://www.example.com/?firstname=John&lastname=Doe&email_address=johandoe@example.com
    2. Click preview redacted data
        1. [https://www.example.com/?firstname=(redacted)&lastname=(redacted)&email_address=(redacted)](https://www.example.com/?firstname=(redacted)&lastname=(redacted)&email_address=(redacted))

If you are satisfied with the result, then you are done. Otherwise, change the URL query parameters until you get the intended result.

## Conclusion

Data redaction is a very powerful feature that allows you to protect your property from collecting PII inadvertently. Combining this with Consent Mode can ensure that your business is compliant with data regulations and that no data is being passed while it should not.