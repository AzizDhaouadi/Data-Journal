---
author: Aziz Dhaouadi
categories: ["Google Analytics 4", "Shopify"]
date: 02/06/2023
featured: true
image: ./images/track-ecommerce.png
title: Tracking E-commerce with gtag.js
---

In our last issue, we discussed how to use Google Tag Manager to track E-commerce events and send them to Google Analytics 4. While many brands prefer to go this route for their tracking, there another route to take. We are, of course, talking about gtag.js.

If you are not familiar with gtag.js, it is a JavaScript library that allows websites to send data to Google Analytics and track user behavior on a website. It provides a unified way of tracking various events such as pageviews, clicks, conversions, and more. gtag.js is the latest version of Google Analytics tracking code and is designed to support multiple Google measurement tools, including Google Analytics, Google Tag Manager, and Google AdWords.

During this "tutorial", we are going to use this library to track the E-commerce events we want. Please make sure to review your code with a developer before launching the tracking. Unlike tracking with the dataLayer, gtag.js will send the call directly to Google Analytics 4, and you will see the events in your property. One way to avoid this is to have a property for testing or to use the filter in Google Analytics 4 to exclude developer traffic. We recommend creating a separate property for testing and the switching the measurement ID when you are ready to push your code to production.

Before we move along, please check if your E-commerce platform supports Google Analytics 4. This should save you a lot of time. If there is no integration and you want to learn how to track user behaviour on your E-commerce store, let’s get started.

## E-commerce recommended events

When it comes to online stores, Google Analytics 4 has a list of recommended events that every business should be implementing. The events also come with predefined parameters that help you better analyze your buyer’s journey. So, let’s discover the list of recommended events:

<table>
<thead>
<tr>
<th>Event</th>
<th>Trigger when</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_payment_info">add_payment_info</a></td>
<td>a user submits their payment information</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_shipping_info">add_shipping_info</a></td>
<td>a user submits their shipping information</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_cart">add_to_cart</a></td>
<td>a user adds items to cart</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_wishlist">add_to_wishlist</a></td>
<td>a user adds items to a wishlist</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout">begin_checkout</a></td>
<td>a user begins checkout</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead">generate_lead</a></td>
<td>a user submits a form or a request for information</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase">purchase</a></td>
<td>a user completes a purchase</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#refund">refund</a></td>
<td>a user receives a refund</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#remove_from_cart">remove_from_cart</a></td>
<td>a user removes items from a cart</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_item">select_item</a></td>
<td>a user selects an item from a list</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_cart">view_cart</a></td>
<td>a user views their cart</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item">view_item</a></td>
<td>a user views an item</td>
</tr>
<tr>
<td><a href="https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_list">view_item_list</a></td>
<td>a user sees a list of items/offerings</td>
</tr>
</tbody>
</table>

The following events will give you full visibility over your user buying journey and help you make informed decisions about optimizing your marketing campaigns as well as funnels.

In Google Analytics 4, E-commerce related events come with two types of parameters. The first type is the event parameters and the second type is items parameters. Event parameters add context about the E-commerce event. Item parameters help send information about the items that are involved in said action. For instance, let’s look at the add_to_cart event in order to understand the difference between event parameters and item parameters.

> All the discussed events in this article can be generated using this tool.

## The difference between event parameters and item parameters

As indicated in the above table, the add_to_cart event is to be triggered when the users adds items to the cart. Let’s look at the taxonomy of the event:

```js
gtag("event", "add_payment_info", {
  currency: "USD",
  value: 22.3,
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      currency: "USD",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      price: 9.99,
      quantity: 1,
    },
  ],
});
```

In this example, our event parameters are currency, value, and items . As mentioned above, this data gives more context about the event itself. The currency gives us more information about the currency the user is currently using on the store. The value parameter gives information about the monetary value of the event; for example 30. With the information at hand and using the event’s data as reference, we can read a user added 7.77 US dollars worth of our products to the cart.

While this is helpful, it does not give a full picture. This is where events parameters come into play. Using this additional data, we can know which product(s) was added to the cart, the quantity added, and other relevant information about the product like the variant. You might ask how can this help, so let’s answer this question with an example as it will highlight how powerful having the right item parameters can be.

Let’s imagine that you are an analyst at retail company and the new creative team just launched 5 new designs across 3 categories of clothing. You are tasked to deliver a report on the most visited, add to cart and purchased variants per clothing category.

Using only event parameters answering this question will be very difficult. But, let’s take a look at the items array:

```js
items: [
  {
    item_id: "SKU_12345",
    item_name: "Stan and Friends Tee",
    affiliation: "Google Merchandise Store",
    coupon: "SUMMER_FUN",
    discount: 2.22,
    index: 0,
    item_brand: "Google",
    item_category: "Apparel",
    item_category2: "Adult",
    item_category3: "Shirts",
    item_category4: "Crew",
    item_category5: "Short sleeve",
    item_list_id: "related_products",
    item_list_name: "Related Products",
    item_variant: "green",
    location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
    price: 9.99,
    quantity: 1,
  },
];
```

The items array is made of objects. In our example, the items array is only made of 1 object. Going over the item parameters, let’s take a look at the item_variant as well as item_category2. Using these 2 parameters, we can build a chart that helps us answer the question above.

> Note: you can pass whatever value you deem appropriate. It is recommended that you make of use of the item_category through item_category5 to send as much context as possible about the items involved in users’ actions.

Back to our regular programming. With the event parameters, all we could read is a user added 7.77 US dollars worth of our products to the cart. Now, we can read way more; way way more.

Using the two parameters we chose earlier (item_category and item_category5), we can read a user added a short sleeve worth 7.77 US dollars from our apparel products to their cart. Now things are much clearer. We can read into the data better if we replace the item_category with item_category2 and we add the discount parameter. Using this data, we can read a user added an adult short sleeve worth 9.99 US dollars to their cart and applied a 2.22 discount. This sentence clearly describes the user behaviour. Hopefully, the example above highlighted the difference between event parameters and item parameter and the power of combining this contextual data to draw clear pictures of user behaviour.

## Tracking non checkout events

To make things easier for everyone, E-commerce events are going to be categorized into non checkout events and checkout events. If you are interesting in tracking the checkout behaviour including refunds, please skip to that section.

### add_to_cart

This is one of the most commonly tracked events for online store. So, let’s learn how to track it. The most common way to add a product to the cart is to use the add to cart button present on every product detail page. So, the best way to track this would be add use the addEventListener method. In short, we want that every time a user tracks the add to cart button, we trigger the add_to_cart event. For demonstration purposes, we will use a simple product detail page. If your implementation is much more complex, the implementation is the same. You will need to adjust the code a little bit but the concept is the same. Let’s dig in.

The first step is to make sure that we are able to properly identify the Add To Cart button. Without this button, our efforts will be in vain. The next step is to make sure we have accessible elements on the page that clearly indicated:

- quantity
- product’s name
- any other metadata to be sent with the add to cart event

> Please make sure that this information is clearly accessible throughout all the product details pages. Ideally, you can use the same CSS selectors to access the information above.

Now that we know that we can access the data, let’s understand the procedure of the implementation:

- Once the user clicks on the Add To Cart button, we will fire an add_to_cart event using the addEventListener method
- The function to be executed will send the event to Google Analytics 4

Let’s have a look at the code that will do what we just described:

```js
// Sending an add to cart event every time the user click on the Add to Cart button

const addToCartButton = document.querySelector('a.round-black-btn[href="#"]');

const regexNum = "[+-]?([0-9]*[.|,])?[0-9]+"; //Regular Expression to extract numbers from a string

const getProductPrice = () => {
  let stringProductPrice = document.querySelector(".product-price").textContent; // Getting the price as a string
  let numbersOnlyStringProductPrice = stringProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
  let productPrice = Number(numbersOnlyStringProductPrice); // Changing the price's data type into a number
  return productPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
};

const getCartValue = () => {
  let quantityAdded = document.querySelector('input[name="quantity"]').value;
  let productUnitPrice = getProductPrice();
  let cartValue = productUnitPrice * quantityAdded;
  return cartValue; // The return statement ensures that cartValue is the output of the getCartValue every time the function is called
};

// Defining the add to cart function
const addToCart = () => {
  gtag("event", "add_to_cart", {
    currency: "USD",
    value: getCartValue(), // Using the function getCartValue to calculate the cart's total value
    items: [
      {
        item_name: document.querySelector("div.product-name").textContent,
        price: getProductPrice(), // Using the getProductPrice function to fetch the product's unitary price
        quantity: document.querySelector('input[name="quantity"]').value,
      },
    ],
  });
};

addToCartButton.addEventListener("click", addToCart); // Every time the addToCartButton is clicked, the addToCart function will be called.
```

This code block adds an event listener to track the "add to cart" event in Google Analytics 4. When a user clicks the Add to Cart button, the code runs the function called addToCart. The "addToCart" function sends data to Google Analytics 4 via the gtag function. The data sent to Google Analytics 4 includes the currency code, the total value of the cart, and the details of the item(s) in the cart (e.g. item name, price, and quantity). The values for the cart's total value and the details of the item(s) in the cart are calculated by calling two functions, getCartValue and getProductPrice, respectively. The "getCartValue" function calculates the total value of the cart by multiplying the quantity of the item selected by the user by the product's unit price. The "getProductPrice" function returns the unit price of the product.

> Please note that you can add error handling to this code block as well as more logic to make sure the price can always be returned even if it is being displayed in other formats such as 39,00. The code block is for demonstration purposes only and should only be used for production if it has been approved by your developers.

Now that we are sending the add_to_cart event to Google Analytics 4, let’s take a minute to discuss the items array. This is an important part of E-commerce tracking, so it is important to make sure that it is well understood. The items array is required to for every E-commerce event. Please note that it does not mean that it needs to be populated. If the items array is null, the event is still valid. The items array is composed of one or more object with each object describing a specific product. Google’s documentation specifies which keys can be passed within the object. Here’s the exhaustive list:

| Name             | Type   | Required | Example value                                                       | Description                                                                                                                                                                                                                                                                                                                                             |
| ---------------- | ------ | -------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | SKU_12345                                                           | The ID of the item. \*One of `item_id` or `item_name` is required.                                                                                                                                                                                                                                                                                      |
| `item_name`      | string | Yes\*    | Stan and Friends Tee                                                | The name of the item. \*One of `item_id` or `item_name` is required.                                                                                                                                                                                                                                                                                    |
| `affiliation`    | string | No       | Google Store                                                        | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope.                                                                                                                                                                                                     |
| `coupon`         | string | No       | SUMMER_FUN                                                          | The coupon name/code associated with the item. Event-level and item-level `coupon` parameters are independent.                                                                                                                                                                                                                                          |
| `discount`       | number | No       | 2.22                                                                | The monetary discount value associated with the item.                                                                                                                                                                                                                                                                                                   |
| `index`          | number | No       | 5                                                                   | The index/position of the item in a list.                                                                                                                                                                                                                                                                                                               |
| `item_brand`     | string | No       | Google                                                              | The brand of the item.                                                                                                                                                                                                                                                                                                                                  |
| `item_category`  | string | No       | Apparel                                                             | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                                                                                     |
| `item_category2` | string | No       | Adult                                                               | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                                                                                      |
| `item_category3` | string | No       | Shirts                                                              | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                                                                                       |
| `item_category4` | string | No       | Crew                                                                | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                                                                                      |
| `item_category5` | string | No       | Short sleeve                                                        | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                                                                                       |
| `item_list_id`   | string | No       | related_products                                                    | The ID of the list in which the item was presented to the user. If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present.                                                                                                                                                                              |
| `item_list_name` | string | No       | Related products                                                    | The name of the list in which the item was presented to the user. If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present.                                                                                                                                                                        |
| `item_variant`   | string | No       | green                                                               | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                                                                                     |
| `location_id`    | string | No       | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location id` is only available at the item-scope. |
| `price`          | number | No       | 9.99                                                                | The monetary price of the item, in units of the specified currency parameter.                                                                                                                                                                                                                                                                           |
| `quantity`       | number | No       | 1                                                                   | Item quantity. If not set, `quantity` is set to 1.                                                                                                                                                                                                                                                                                                      |

These item parameters are the same for all E-commerce events. Just make sure your events have the same parameters to create continuity for your tracking.

### add_to_wishlist

Since we have our add_to_cart event properly implemented, we can use the same logic to track the rest of the events.

Let’s have a look at the add_to_wishlist event. Here are some things to consider when working with this event:

- The parameter will not be used with this event since we adding a singular product to the wish list
- The value of the event is equal to the unitary value of the product

Let’s have a look at the code block we will be using to track this event:

```js
// Sending an add to wish list event every time the user click on the Add to Wish List button
const addToWishListButton = document.querySelector('a.round-black-btn.wishlist[href="#"]');

// Defining the add to cart function
const addToWishList = () => {

  gtag({
    'event', 'add_to_wishlist', // Event name. Do not change unless necessary
      {
      'currency': "USD",
      'value': getCartValue(), // Using the function getCartValue to calculate the cart's total value
      'items': [
      	{
        	item_name: document.querySelector('div.product-name').textContent,
          price: getProductPrice(), // Using the getProductPrice function to fetch the product's unitary price
        }
      ]
      }
    });
};

addToWishListButton.addEventListener('click', addToWishList); // Every time the addToWishList is clicked, the addToWishList function will be called.
```

The purpose of the code block is to track the "add to wish list" event in Google Analytics 4. It starts by selecting the add to wish list button on the page with the line const addToWishListButton = document.querySelector('a.round-black-btn.wishlist[href="#"]');.

Next, it defines the addToWishList function which will be used to trigger the tracking event. This function sends an event to Google Analytics 4 with the event name "add_to_wishlist". The event contains the currency, value and item details. The currency is hardcoded as USD and the value is calculated using the getCartValue function. The item details are extracted from the page by selecting the product name and price using document.querySelector and the getProductPrice function.

Finally, the code block adds an event listener to the add to wish list button. The event listener listens for clicks on the add to wish list button and calls the addToWishList function when the button is clicked. This means that every time the user clicks the add to wish list button, the event will be triggered and sent to Google Analytics 4.

### generate_lead

This event, while not an E-commerce event, is on the recommended events list. You can use this event to understand how your different newsletters are growing. Essentially, every time a user signs up to a newsletter, we will generate this event and add the newsletter’s title in order for us to be more informed about which newsletters are driving the most leads.

Since we are going to be working with form submissions, we will be listening for the submission of the form and we will be sending the event accordingly. Please not that we are not going to do any client-side validation for the form. If you want to read more about said topic, follow this [link](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation). Let’s have a look at the code we will be using to track the generate_lead event.

```js
// Identifying the newsletter form

const newsletter_form = document.querySelector("form#product_releases");
const newsletter_name = newsletter_form.getAttribute("id");

// Sending the generate_lead event every time the newsletter form is submitted

const generateLead = (e) => {
  e.preventDefault(); // This is to prevent the default behaviour of the submit event
  gtag("event", "generate_lead", {
    newsletter_name: newsletter_name,
  });
};

newsletter_form.addEventListener("submit", generateLead);
```

The first part of the code identifies the newsletter form by its ID and assigns it to the variable newsletter_form. It then gets the ID of the form and assigns it to the variable newsletter_name.

The second part of the code defines a function generateLead, which sends an event called generate_lead to Google Analytics 4 every time the newsletter form is submitted. The event will also include the newsletter_name as a parameter.

Finally, the code adds an event listener to the newsletter form, which listens for the submit event. When the form is submitted, the generateLead function is called and the event is sent to Google Analytics 4.

### select_item

As defined by the list above, this event should fire whenever a use selects an item from a list. To put it in other terms, whenever a user clicks on an item to view from a given list, the event needs to be triggered and the appropriate data needs to be sent with it. So, the goal is to fire the select_item event whenever the user clicks on a product card. Here's how can achieve this goal.

```js
// Getting the list of related products
const relatedProducts = document.querySelectorAll('a[href=""].card');

// itemArray
let itemArray = []; // We will use this array to send the data into the items array inside the dataLayer event

// selectItem function
const selectItem = (e) => {
  itemArray.push({
    item_name: e.target.closest("a.card").querySelector("h5.card-title")
      .textContent,
    price: (function () {
      let stringRelatedProductPrice =
        document.querySelector(".product-price").textContent; // Getting the price as a string
      let numbersOnlyStringRelatedProductPrice =
        stringRelatedProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
      let RelatedproductPrice = Number(numbersOnlyStringRelatedProductPrice); // Changing the price's data type into a number
      return RelatedproductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
    })(),
  });

  gtag("event", "select_item", {
    item_list_id: "related_products",
    item_list_name: "Related products",
    items: itemArray,
  });
};
```

The code first selects all the related products by using document.querySelectorAll('a[href=""].card') and storing it in the relatedProducts variable. Then an empty array itemArray is declared which will be used to store the selected item's data. The selectItem function is then defined, which is called when an item is selected. The function pushes the selected item's data (item name and price) into the itemArray array. The price of the selected item is calculated using a self-invoking function, which first extracts the string representation of the price, then removes any non-numeric characters, converts the remaining string to a number, and finally returns it. Finally, the gtag function is called with the 'event', 'select_item', and the data regarding the selected item list and its items. The item_list_id and item_list_name are set to "related_products" and "Related products" respectively. The items property is set to the itemArray which contains the data of all the selected items.

> Please note that regexNum has been declared above. If you haven't declared this variable, do so before executing this block of code

### view_cart

This is one of the new E-commerce events introduced in Google Analytics 4. This event will help you to know how many customers are actually visiting the cart. The event can be used to gauge the propensity to purchase.

Most of E-commerce websites have side carts that open when the user wants to look at what they have in the cart. Maybe users want to know the value of the cart or to add/remove some items. Either way, we are going to use this event to make sure that whenever the cart shows, we are able to track it. Another scenario we will look at is when users are taken to a cart page (/cart).

Let’s dig into the first scenario where users will interact with a side cart. Before we dive into the code block and its different section, note that we are using Bootstrap 5 to mimic the “side cart”. In this particular case, we will be using the Offcanvas component. This important for you to know since we will be using the JavaScript events of this component to trigger the view_cart event. You can read more the component and its event [here](https://getbootstrap.com/docs/5.0/components/offcanvas/#events). If your implementation is different, the premise is the same, fire the event when the side cart is fully shown to the user.

```js
let sideCartProductsArray = [];
let sideCartValue = 0;

const viewCart = () => {
  let sideCartProducts = document.querySelectorAll(
    "div.side-cart li.list-group-item",
  );
  if (sideCartProducts) {
    sideCartProducts.forEach((sideCartProduct) => {
      sideCartProductsArray.push({
        item_name: sideCartProduct.querySelector(".product-title").textContent,
        price: (function () {
          let sideCartStringProductPrice =
            sideCartProduct.querySelector(".product-price").textContent;
          let sideCartNumbersOnlyStringProductPrice =
            sideCartStringProductPrice.match(regexNum)[0];
          let sideCartProductPrice = Number(
            sideCartNumbersOnlyStringProductPrice,
          );
          return sideCartProductPrice;
        })(),
      });
    });
    for (
      let sideCartProductValue = 0;
      sideCartProductValue < sideCartProductsArray.length;
      sideCartProductValue++
    ) {
      sideCartValue += sideCartProductsArray[sideCartProductValue].price;
    }
    gtag("event", "view_cart", {
      currency: "USD",
      value: sideCartValue,
      items: sideCartProductsArray,
    });
  }
};

// Getting the side cart and firing the event whenever the side cart is shown
let sideCart = document.getElementById("offcanvasExample");
sideCart.addEventListener("shown.bs.offcanvas", () => {
  console.log("Cart viewed");
  viewCart();
});
```

The code block listens to an event triggered by the showing of a side cart element with the id of "offcanvasExample". When the event is fired, the function viewCart() is called and performs the following steps:

1. The code retrieves all the products in the side cart using the querySelectorAll method and saves it in the sideCartProducts variable.
2. The code uses the forEach method to loop through the sideCartProducts and push each product's item_name and price into the sideCartProductsArray. The price of the product is obtained by calling a function that retrieves the price as a string, extracts the numbers from the string, and converts the numbers into a number data type.
3. The code calculates the total value of all the products in the sideCartProductsArray by adding the price of each product to the sideCartValue variable.
4. The code then uses the gtag function to trigger an event named "view_cart" and pass the currency, value, and items as parameters.

Finally, the code adds an event listener to the side cart element that listens for the "shown.bs.offcanvas" event. When this event is fired, the viewCart function is called and the event is triggered. That’s it for the first scenario where a side cart is shown to the user. This way of tracking is more complicated then on a page view. If the you want to fire the same event using the /cart page load as the trigger, you can do so by modifying the trigger from the shown.bs.offcanvas to load. This is admitting the the same CSS selectors are being used on the /cart page. If not then simply modify the CSS selectors to make sure you are getting what you need.

### view_item

If you are still having trouble working with triggering an event on page load, you are in luck! The view_item event, as described above, is an event that will fire the whenever a user views an item. To make things clearer, we want to fire this event whenever a user visit a product details page. With this in mind, we should be able to track this event with relative ease. Here’s what the code will look like:

```js
// Defining the add to cart function
const viewItem = () => {
  gtag("event", "view_item", {
    currency: "USD",
    value: getProductPrice(),
    items: [
      {
        item_name: document.querySelector("div.product-name").textContent,
        price: getProductPrice(),
      },
    ],
  });
};
window.addEventListener("load", viewItem);
```

The code block is defining the viewItem function which fires an event in Google Analytics through the gtag function. The purpose of this event is to track when a user views a particular item on the website. The function uses the gtag function to fire an event with the following parameters:

- The first parameter is the event action - 'view_item'
- The second parameter is an object that contains the following details about the event:
- 'currency': the currency used is set to "USD".
- 'value': the value of the item being viewed is obtained from the getProductPrice() function.
- 'items': an array of objects that contains the name of the item and its price.

The viewItem function is executed once the entire window is loaded through the window.addEventListener function which listens for the load event.

### view_item_list

This is one of the trickiest events to work with. First, based on the definition, we can fire the event when the user is on the collections page or when they have viewed a recommended list for related products or for the recently viewed products.

For this to work, we will be using the IntersectionObserver API. If you are not familiar it, have a [read](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). The goal of this procedure is to fire the view_item_list whenever the recommended products list enters into view. Let’s have a look at the code.

```js
// creating the observer for the recommended products list
let options = {
  threshold: 1.0,
};

// creating observedProductsArray. This will be the value of the items array in the dataLayer
let observedProductsArray = [];

const hasBeenSeen = (entries) => {
  if (entries) {
    // Firing this event only when we are sure that the intersection happened
    let observedProductsList = document.querySelectorAll(
      "div.recommended-products a.card",
    ); // List of observed products
    observedProductsList.forEach((observedProduct) => {
      observedProductsArray.push({
        item_name: observedProduct.querySelector("h5").textContent,
        price: (function () {
          let ObservedStringProductPrice =
            observedProduct.querySelector(".product-price").textContent;
          let numbersOnlyStringObservedProductPrice =
            ObservedStringProductPrice.match(regexNum)[0];
          let observedProductPrice = Number(
            numbersOnlyStringObservedProductPrice,
          );
          return observedProductPrice;
        })(),
      });
    });

    gtag("event", "view_item_list", {
      item_list_id: entries[0].target.getAttribute("data-list-id"), // entries is an object
      item_list_name: entries[0].target.getAttribute("data-list-name"),
      items: observedProductsArray,
    });
  }
  observer.unobserve(
    document.querySelector("div.recommended-products div.card-group"),
  ); // Unobserving the element so the callback function will only get called once
};

let observer = new IntersectionObserver(hasBeenSeen, options);
observer.observe(
  document.querySelector("div.recommended-products div.card-group"),
);
```

This code block creates an IntersectionObserver for the recommended products list. The observer will track the intersection of the recommended products list with the viewport of the website. When the recommended products list intersects with the viewport, the observer will call the "hasBeenSeen" function.

The "hasBeenSeen" function creates an array of observed products called "observedProductsArray". It populates this array with the names and prices of each product in the recommended products list by using the querySelectorAll method to select the individual products and their associated information.

Once the "observedProductsArray" is populated, the "hasBeenSeen" function triggers a "view_item_list" event in the Google Analytics tracking code (gtag). This event includes information about the list, such as the list ID and name, as well as the list of observed products contained in "observedProductsArray".

Finally, the code unobserves the recommended products list after the event has been fired so that the callback function will only be executed once.

Hopefully this explanation, however brief, helps you understand the code better. Now, let’s talk about the E-commerce pages with multiple lists. If you have more than one product list, then it is recommended to add multiple observer to the right lists to avoid complicated the tracking code. If you are comfortable working with loops that you can create a loop to iterate over all lists that you want to target and use the loop to create the Intersection Observers and track the lists whenever they are 100% in the users’ view port.

## Tracking checkout events

Now that everything is set prior to checkout, the next step is to focus on the checkout events which are begin_checkout, add_payment_info, add_shipping_info, and purchase. The first event we will start with is begin_checkout.

### begin_checkout

This event is very straightforward. The goal is to send an event to Google Analytics 4 every time a user begins a checkout. If you are wandering if the event is going to fire for every occurrence, then the answer is yes. The reason for that is that it reflects the actual behaviour of your users. Let’s dig in.

```js
let checkoutProductsArray = [];
let checkoutProductsValue = 0;

const beginCheckout = () => {
  let checkoutProducts = document.querySelectorAll(
    "div.side-cart li.list-group-item",
  );
  if (checkoutProducts) {
    checkoutProducts.forEach((checkoutProduct) => {
      checkoutProductsArray.push({
        item_name: checkoutProduct.querySelector(".product-title").textContent,
        price: (function () {
          let checkoutStringProductPrice =
            checkoutProduct.querySelector(".product-price").textContent;
          let checkoutNumbersOnlyStringProductPrice =
            checkoutStringProductPrice.match(regexNum)[0];
          let checkoutProductPrice = Number(
            checkoutNumbersOnlyStringProductPrice,
          );
          return checkoutProductPrice;
        })(),
      });
    });
    for (
      let beginCheckoutProductValue = 0;
      beginCheckoutProductValue < checkoutProducts.length;
      beginCheckoutProductValue++
    ) {
      checkoutProductsValue +=
        checkoutProductsArray[beginCheckoutProductValue].price;
    }

    gtag("event", "begin_checkout", {
      currency: "USD",
      value: checkoutProductsValue,
      items: checkoutProductsArray,
    });
  }
};
```

This code block is defining a function called beginCheckout that will be fired when the user begins the checkout process. The function uses the querySelectorAll method to select all of the items in the user's cart and store them in an array called checkoutProductsArray. The function then loops through each item in the array, using a regular expression to extract the price of each item, and adds it to a running total of the total value of all items in the cart. Finally, the function uses the gtag function to fire a Google Analytics event called begin_checkout and pass in the currency (USD), total value, and the items in the cart as event parameters.

### add_payment_information & add_shipping_info

These steps, if tracked, will help you establish a checkout funnel that you can use in order to gain insights in your checkout abandonment and build cart-recovery programs that will help you increase your revenue. However, to track these events outside of platform that offer direct integration with Google Analytics 4 or Shopify Plus, it is recommended to work with a developer to get it done. The reason is simple. These events need to be triggered once a user successfully ads their payment information and successfully ads their shipping information. In order to properly trigger these events, you will probably be using API response codes that indicate that payment information is valid or that the submitted address exists. That being said, it’s better to work with a developer to get these events tracked right. Here are some resources about the events:

- [add_shipping_info](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_shipping_info)
- [add_payment_info](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#add_payment_info)

### purchase

This is perhaps one of the most important E-commerce events you would want to track. That being said, it is also better to work with developers to track this event if you are not using an an E-commerce that is integrated with Google Analytics 4 or something like Shopify where we can insert tracking codes easily. Here’s the documentation for the [purchase](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#purchase) event. There are somethings you would want to consider before moving to the implementation:

- You want the event to fire after you have received an API response that the payment has been successfully processed and not when the purchase button is clicked
- If you firing the event based on a thank you page, please make sure to the fire the event on first access and not on every page load
- Make sure that the items involved in the transaction are available to be used wherever you are trying to implement the purchase event

That's it folks! If you managed to successfully follow all of the steps mentioned in this tutorial, you should have a functioning E-commerce tracking using gtag.js
