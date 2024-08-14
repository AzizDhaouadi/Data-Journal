---
author: Aziz Dhaouadi
categories: ["Swetrix", "Plotly"]
date: 02/24/2024
featured: false
image: ./images/data-viz.png
title: Data Visualization with Open Source Web Analytics
---

In our [previous discussion](/swetrix), we explored Swetrix, an innovative, open-source web analytics tool beneficial for businesses seeking to evaluate their online performance. This chapter` will guide you on leveraging Swetrix data to create a personalized dashboard, providing essential insights for website optimization. For those interested, the complete code is accessible on [Github](https://github.com/AzizDhaouadi/swetrix-plotly), allowing you to clone the project and tailor your dashboard.

This tutorial employs Express, JavaScript, and Plotly.js to craft a dashboard showcasing data such as pageviews, unique visitors, session durations, bounce rates, average page speeds, and more, offering a comprehensive view of your website's performance. The flexibility of the project means you can adjust the dashboard's design to meet your specific needs.

For this tutorial, we will be using Express, JavaScript and Plotly.js to build a dashboard that shows the following data:

- Pageviews
- Unique visitors
- Session duration
- Bounce rate
- Average page speed
- Traffic per country
- Unique visitors Tech Breakdown
  - Unique visitors per browser
  - Unique visitors per Device Category
  - Unique Visitors per OS
- Visits per page
- Visits per referrer
- Custom events breakdown

As you can see this dashboard contains all the necessary information for us to make decisions about the performance of our website. And the good news is we can make this dashboard look and feel the way we want as we have full control over the code.

## Project Anatomy

The first thing we need to get started is a Swetrix account with data collected in order to visualize it. If you need to create a Swetrix account, you can so using their [sign up page](https://swetrix.com/signup). If it's your first time using this tool, you can refer to their [official documentation](https://docs.swetrix.com/). Once you are setup, it's time to get started.

### Express, Plotly.js, and Dependencies

As mentioned above, the main components of this project are Express, Plotly.js and JavaScript. If you do note have Node.js installed on your machine, please do so. You will this in the upcoming steps. The following are the dependencies we need to get things going:

- Express
- Node-fetch
- Dotenv

You do not have to worry about installing these if you are going to clone the project. The Readme file contains all the details you need to get started. The point of explaining these dependencies is to understand their role in the project, so everything is clear.

## Swetrix's Statistics API

A core aspect of this project is the Swetrix Statistics API, which provides access to the data displayed in the Swetrix dashboard. We will use specific API endpoints (/log, /log/birdseye, /log/performance) to fetch necessary data for our dashboard. Familiarity with the Fetch API and asynchronous JavaScript will be beneficial here.. If you are not familiar with the fetch API, you can read more about it in depth in the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Additionally, being familiar with Async JavaScript would be a plus.

## API Endpoints

To retrieve the data we need, we will be using 3 endpoints being:

- /log
- /log/birdseye
- /log/performance

Each endpoint will return to us a specific set of data that we will use to create our charts.

### Log Endpoint

This endpoint will return all the data we need about our traffic. In truth, most of the charts mentioned above will be built using the data from this endpoint.

### Log Birdseye Endpoint

This endpoint will return the traffic overview data. You can this of it as an executive summary of the log endpoint data set.

### Log Performance API

This endpoint returns data regarding the performance of our website. For instance, the average page load speed time is one of the data points that can be found querying this endpoint.

## Implementation Details

### Index.js File

Now that we understand what our data source is and what our dependencies are, it's time to dive into the source code. The first file we are going to take a look at is the index.js file. The latter is the point of entry to our application and contains the code to tell our server what to do. The code in this file is setting essential variables we need for our application, and defines API routes that fetch data from the Swetrix Statistics API when queried. Let's take a look at the fetch variable.

```js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
```

One of the project's dependencies is Node-fetch. This is a lightweight module that brings the Fetch API to Node.js. You can read more about this package on [NPM's documentation](https://www.npmjs.com/package/node-fetch).

#### app.get('fetch/\*')

The index.js file contains multiple app.get functions with routes that look like fetch/\*. These functions tell our server what to do when a get request at the given route is called. For instance, when the server gets a get request at the route /fetch/trafficData it will send a get request to Swetrix's log API endpoint to fetch traffic data. Each app.get function is designed to get specific data from Swetrix's servers. The reason we are defining these functions instead of using the fetch API client-side is to avoid exposing the API key. In fact, client-side fetch requests will be sent to our designated endpoints which in turn will fetch the required data. The dotenv package helps use define and use environment variables in our project so that sensitive information like API keys are not exposed. If you are going to use environment variables ensure to add the .env file to the add .gitignore file so that you do not commit your data to a repository.

#### app.use()

In our Express application, using `app.use(express.static(path.join(__dirname, "/public")));` is a good way to serve static files such as images, CSS files, and JavaScript files. This line tells Express to serve the static files from a directory named public located in the root of your application. The path.join(\_\_dirname, "/public") part constructs an absolute path to the public directory, which helps avoid issues related to the difference in file paths across operating systems.

## Index.html

The index.html file has a very straightforward structure. Note that we are using Boostrap for this project to make styling and responsiveness much easier to handle. Most of the HTML elements in this file will have their content added/updated with JavaScript.

## JS folder

In our JS folder, you will see two subfolders and 3 files. Each file starts with render and the rest of the name describes what it will be rendering. For instance, the file `renderTrafficData` is going to be used to render traffic data. Let's breakdown the anatomy of the file in order to get an idea of how data is being rendered.

### renderTrafficData.js

The file contains 7 import statements. The import statements are getting us the functions necessary to render the charts using Plotly.js. The next thing we see in the file is the`fetchTrafficData` which will be used to fetch the data we are going to pass to our visualization functions. The fetch request is actually sent to our endpoints. The second function uses the data we fetched to visualize the data using Plotly. All the Plotly-related code is in the dashboardVisualizations folder. The code was kept separate to make readability easier.

## Conclusion

This tutorial provides a comprehensive guide to building a custom dashboard using Swetrix data. By understanding the project's structure and implementation, you can adapt and extend your dashboard, integrating web analytics with other tools for richer insights.
