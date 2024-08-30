---
author: Aziz Dhaouadi
categories: ["Google Analytics 4", "Shopify", "Google Tag Manager"]
date: 02/05/2023
featured: true
image: ./images/track-ecommerce.png
title: Tracking E-commerce with Google Tag Manager
---

Five months separate us from the sunset of Universal Analytics. While many companies have started adopting Google Analytics 4, many are still using Universal Analytics especially E-commerce brands.

While many E-commerce platforms have built Google Analytics 4 integrations, others still did not. By the way, if you are using Shopify, they will be launching their Google Analytics 4 integration in March. You can read more about that [here](https://help.shopify.com/en/manual/reports-and-analytics/google-analytics/google-analytics-4).

But, if you do not want to wait for the integration to be released or you are working with other E-commerce platform, read along as we will be discussing how to track E-commerce events using Google Tag Manager.

Before we move along, please check if your E-commerce platform supports Google Analytics 4. This should save you a lot of time.

If there is no integration and you want to learn how to track user behaviour on your E-commerce store, let’s get started.

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

The following events will give you full visibility over your user buying journey and help you make informed decisions about optimizing your marketing campaigns as well as funnels. In Google Analytics 4, E-commerce related events come with two types of parameters. The first type is the event parameters and the second type is items parameters. Event parameters add context about the E-commerce event. Item parameters help send information about the items that are involved in said action. For instance, let’s look at the add_to_cart event in order to understand the difference between event parameters and item parameters.

> 💡 All the discussed events in this article can be generated using this tool.

## The difference between event parameters and item parameters

As indicated in the above table, the add_to_cart event is to be triggered when the users adds items to the cart. Let’s look at the taxonomy of the event:

```js
dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_to_cart",
  ecommerce: {
    currency: "USD",
    value: 7.77,
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
    ],
  },
});
```

In this example, our event parameters are currency, value, and items . As mentioned above, this data gives more context about the event itself. The currency gives us more information about the currency the user is currently using on the store. The value parameter gives information about the monetary value of the event; for example 30. With the information at hand and using the event’s data as reference, we can read a user added 7.77 US dollars worth of our products to the cart.

While this is helpful, it does not give a full picture. This is where events parameters come into play. Using this additional data, we can know which product(s) was added to the cart, the quantity added, and other relevant information about the product like the variant. You might ask how can this help, so let’s answer this question with an example as it will highlight how powerful having the right item parameters can be.

Let’s imagine that you are an analyst at retail company and the new creative team just launched 5 new designs across 3 categories of clothing. You are tasked to deliver a report on the most visited, add to cart and purchased variants per clothing category. Using only event parameters answering this question will be very difficult. But, let’s take a look at the items array:

```json
{
  "items": [
    {
      "item_id": "SKU_12345",
      "item_name": "Stan and Friends Tee",
      "affiliation": "Google Merchandise Store",
      "coupon": "SUMMER_FUN",
      "discount": 2.22,
      "index": 0,
      "item_brand": "Google",
      "item_category": "Apparel",
      "item_category2": "Adult",
      "item_category3": "Shirts",
      "item_category4": "Crew",
      "item_category5": "Short sleeve",
      "item_list_id": "related_products",
      "item_list_name": "Related Products",
      "item_variant": "green",
      "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
      "price": 9.99,
      "quantity": 1
    }
  ]
}
```

The items array is made of objects. In our example, the items array is only made of 1 object. Going over the item parameters, let’s take a look at the item_variant as well as item_category2. Using these 2 parameters, we can build a chart that helps us answer the question above. Back to our regular programming. With the event parameters, all we could read is a user added 7.77 US dollars worth of our products to the cart. Now, we can read way more; way way more.

Using the two parameters we chose earlier (item_category and item_category5, we can read a user added a short sleeve worth 7.77 US dollars from our apparel products to their cart. Now things are much clearer. We can read into the data better if we replace the item_category with item_category2 and we add the discount parameter. Using this data, we can read a user added an adult short sleeve worth 9.99 US dollars to their cart and applied a 2.22 discount. This sentence clearly describes the user behaviour.

Hopefully, the example above highlighted the difference between event parameters and item parameter and the power of combining this contextual data to draw clear pictures of user behaviour.

## Tracking non checkout events

To make things easier for everyone, E-commerce events are going to be categorized into non checkout events and checkout events. If you are interesting in tracking the checkout behaviour including refunds, please skip to that section.

### add_to_cart event

This is one of the most commonly tracked events for online store. So, let’s learn how to track it. The most common way to add a product to the cart is to use the add to cart button present on every product detail page. So, the best way to track this would be add use the addEventListener method. In short, we want that every time a user tracks the add to cart button, we trigger the add_to_cart event. For demonstration purposes, we will use a simple product detail page. If your implementation is much more complex, the implementation is the same. You will need to adjust the code a little bit but the concept is the same. Let’s dig in.

The first step is to make sure that we are able to properly identify the Add To Cart button. Without this button, our efforts will be in vain. The next step is to make sure we have accessible elements on the page that clearly indicated:

- quantity
- product’s name
- any other metadata to be sent with the add to cart event

Now that we know that we can access the data, let’s understand the procedure of the implementation:

- Once the user clicks on the Add To Cart button, we will fire an add_to_cart event using the addEventListener method
- The function to be executed will log the add_to_cart event into the dataLayer for later use
- The function will make sure the dataLayer is declared and if not declare it
- It will clear the previous ecommerce object
- It will log the data we need into the dataLayer

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
  console.log("clicked");
  window.dataLayer = window.dataLayer || []; // Declaring the dataLayer object if not defined
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.

  window.dataLayer.push({
    event: "add_to_cart", // Event name. Do not change unless necessary
    ecommerce: {
      currency: "USD",
      value: getCartValue(), // Using the function getCartValue to calculate the cart's total value
      items: [
        {
          item_name: document.querySelector("div.product-name").textContent,
          price: getProductPrice(), // Using the getProductPrice function to fetch the product's unitary price
          quantity: document.querySelector('input[name="quantity"]').value,
        },
      ],
    },
  });
};

addToCartButton.addEventListener("click", addToCart); // Every time the addToCartButton is clicked, the addToCart function will be called.
```

This code block is a JavaScript code that sends an 'add to cart' event every time the user clicks on the 'Add to Cart' button. The code uses the querySelector method to select the 'Add to Cart' button and assign it to the addToCartButton constant.

The getProductPrice function uses a regular expression (regexNum) to extract numbers from a string representation of the product price and converts it to a number. The getCartValue function calculates the total value of the items in the cart by multiplying the product unit price with the quantity added.

The addToCart function declares and initializes the dataLayer object, which is used to store data that is sent to Google Tag Manager. The function pushes an 'add to cart' event with details such as the currency, value, and items in the cart to the dataLayer object.

Finally, the code adds an event listener to the addToCartButton, which calls the addToCart function every time the button is clicked.

Now that we are logging our add_to_cart event to the dataLayer, let’s take a minute to discuss the items array. This is an important part of E-commerce tracking, so it is important to make sure that it is well understood.

The items array is required to for every E-commerce event. Please not that it does not mean that it needs to be populated. If the items array is null, the event is still valid. The items array is composed of one or more object with each object describing a specific product. Google’s documentation specifies which keys can be passed within the object. Here’s the exhaustive list:

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

Since we have our add_to_cart event properly implemented, we can use the same logic to track the rest of the events. Let’s have a look at the add_to_wishlist event. This event should be triggered whenever a user adds a product to their wish list. That being said, here are some things to consider working with this event:

- The parameter will not be used with this event since we adding a singular product to the wish list
- The value of the event is equal to the unitary value of the product

These points should make this a event a bit easier to work with compared to the add_to_cart event. Let’s have a look at the code block we will be using to track this event:

```js
// Sending an add to wish list event every time the user click on the Add to Wish List button
const addToWishListButton = document.querySelector(
  'a.round-black-btn.wishlist[href="#"]',
);

// Defining the add to cart function
const addToWishList = () => {
  console.log("clicked");
  window.dataLayer = window.dataLayer || []; // Declaring the dataLayer object if not defined
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.

  window.dataLayer.push({
    event: "add_to_wishlist", // Event name. Do not change unless necessary
    ecommerce: {
      currency: "USD",
      value: getCartValue(), // Using the function getCartValue to calculate the cart's total value
      items: [
        {
          item_name: document.querySelector("div.product-name").textContent,
          price: getProductPrice(), // Using the getProductPrice function to fetch the product's unitary price
        },
      ],
    },
  });
};

addToWishListButton.addEventListener("click", addToWishList); // Every time the addToWishList is clicked, the addToWishList function will be called.
```

This code is used to track an "add_to_wishlist" event in Google Tag Manager whenever the user clicks on the "Add to Wish List" button. The "Add to Wish List" button is selected using the query selector and is assigned to the "addToWishListButton" constant.

The "addToWishList" function is defined to push the event to the dataLayer. If the dataLayer object does not exist, it is declared and the previous ecommerce object is cleared. The function then pushes the "add_to_wishlist" event with the event details to the dataLayer.

The "addToWishListButton" is then assigned an event listener to listen for clicks. When the button is clicked, the "addToWishList" function is called, which pushes the "add_to_wishlist" event to the dataLayer. The function also uses the "getProductPrice" and "getCartValue" functions to fetch the product's unitary price and calculate the cart's total value, respectively.

And that’s that! You have successfully tracked two E-commerce events. Let’s keep it going and look at the generate_lead event.

### generate_lead

This event, while not an E-commerce event, is on the recommended events list. You can use this event to understand how your different newsletters are growing. Essentially, every time a user signs up to a newsletter, we will generate this event and add the newsletter’s title in order for us to be more informed about which newsletters are driving the most leads.

Since we are going to be working with form submissions, we will be listening for the submission of the form and we will be sending the event accordingly. Please not that we are not going to do any client-side validation for the form. If you want to read more about said topic, follow this [link](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).

Let’s have a look at the code we will be using to track the generate_lead event. Here’s the code section for our form.

```html
<!-- This is our form -->

<!-- For the sake of this exercise, we will consider that our newsleter's name is equivalent to the form's id -->

<div class="newsletter_signup">
  <form action="#" id="product_releases">
    <label for="user_email"
      >Subscribe to our newsletter to stay up to date with out drops!</label
    >
    <input
      type="email"
      name="email"
      id="user_email"
      placeholder="Enter your email. We will never share it!"
      required
    />
    <input type="submit" value="Subscribe" id="subscribe_button" />
  </form>
</div>
```

Let’s have a look at the JavaScript now:

```js
// Identifying the newsletter form

const newsletter_form = document.querySelector("form#product_releases");
const newsletter_name = newsletter_form.getAttribute("id");

// Sending the generate_lead event every time the newsletter form is submitted

const generateLead = (e) => {
  e.preventDefault(); // This is to prevent the default behaviour of the submit event
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    newsletter_name: newsletter_name,
  });
};

newsletter_form.addEventListener("submit", generateLead);
```

This code block is for sending a "generate_lead" event every time the newsletter form is submitted.

The first step is identifying the newsletter form using the document.querySelector method and storing it in the newsletter_form variable. Then, the id of the form is extracted using the .getAttribute method and stored in the newsletter_name variable.

The next step is defining the generateLead function which will be triggered every time the form is submitted. The function uses the preventDefault method to prevent the default behaviour of the submit event. It also initializes the dataLayer object and pushes the "generate_lead" event along with the newsletter_name.

Finally, the addEventListener method is used to listen for the submit event on the newsletter_form and call the generateLead function every time it occurs.

That’s a wrap for this event. Next up on the list, it’s the select_item event.

### select_item

As defined by the list above, this event should fire whenever a use selects an item from a list. To put it in other terms, whenever a user clicks on an item to view from a given list, the event needs to be triggered and the appropriate data needs to be sent with it.

Let’s dig right in! Let’s imagine that our recommended products list looks something like this:

```html
<div class="card-group">
  <a class="card" href="#">
    <div class="card-body">
      <h5 class="card-title">Related Product 1</h5>
      <p class="cart-text text-muted product-price">$20.00</p>
      <p class="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        vitae vestibulum arcu. Ut lobortis non augue quis scelerisque. Nulla
        vitae diam tortor. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos.
      </p>
    </div>
  </a>
  <a class="card" href="#">
    <div class="card-body">
      <h5 class="card-title">Related Product 2</h5>
      <p class="cart-text text-muted product-price">$20.00</p>
      <p class="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        vitae vestibulum arcu. Ut lobortis non augue quis scelerisque. Nulla
        vitae diam tortor. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos.
      </p>
    </div>
  </a>
  <a class="card" href="#">
    <div class="card-body">
      <h5 class="card-title">Related Product 3</h5>
      <p class="cart-text text-muted product-price">$20.00</p>
      <p class="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        vitae vestibulum arcu. Ut lobortis non augue quis scelerisque. Nulla
        vitae diam tortor. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos.
      </p>
    </div>
  </a>
</div>
```

This list shows 3 product that are related to the current product. So, the goal is to fire the select_item event whenever the user clicks on the product card. Since, this the code we have is just for demonstration, clicking the card will not open a new page but the event should fire the same way.

> 💡 Please note that the event should fire whenever a user clicks on a related product card regardless of the card itself. Also, the parameters sent with the event should always be the same.

Let’s take a look at the JavaScript that should allow us to this:

```js
// Getting the list of related products
const relatedProducts = document.querySelectorAll('a[href=""].card');

// itemArray
let itemArray = []; // We will use this array to sedn the data into the items array inside the dataLayer event

// selectItem function
const selectItem = (e) => {
	itemArray.push({
		item_name: e.target.closest('a.card').querySelector('h5.card-title').textContent,
		price: function() {
				let stringRelatedProductPrice = document.querySelector('.product-price').textContent; // Getting the price as a string
			  let numbersOnlyStringRelatedProductPrice = stringRelatedProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
			  let RelatedproductPrice = Number(numbersOnlyStringRelatedProductPrice); // Changing the price's data type into a number
			  return RelatedproductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
			}()
	});

	// Defining the dataLayer
	window.dataLayer = window.dataLayer || [];

	window.dataLayer.push({ecommerce: null}); // Clear the previous ecommerce object.

	window.dataLayer.push({
		'event': 'select_item',
		'ecommerce': {
			item_list_id: "related_products",
	    item_list_name: "Related products",
			'items': itemArray
		}
	});
 });
}

relatedProducts.forEach((relatedProduct) => {
	relatedProduct.addEventListener('click', selectItem);
});
```

This code block is tracking the clicks on related products on a webpage. It starts by getting the list of related products by selecting all elements with class "card" and a href attribute equal to an empty string. This information is stored in the relatedProducts variable. The code then creates an empty array itemArray which will be used to store the data of each related product that is clicked.

A selectItem function is defined which takes in the event object and pushes the name and price of the related product that was clicked into the itemArray. This function is then called every time a related product is clicked by adding an event listener to each related product element.

When the selectItem function is called, it first pushes the name and price of the related product that was clicked into the itemArray. It then defines the dataLayer object and pushes the select_item event and the related product data into it.

The end result of this code is that every time a user clicks on a related product, the select_item event will be triggered and the data of the related product will be sent to the dataLayer. That’s that for this event. Let’s look into the next one which is view_cart.

### view_cart

This is one of the new E-commerce events introduced in Google Analytics 4. This event will help you to know how many customers are actually visiting the cart. The event can be used to gauge the propensity to purchase.

Most of E-commerce websites have side carts that open when the user wants to look at what they have in the cart. Maybe users want to know the value of the cart or to add/remove some items. Either way, we are going to use this event to make sure that whenever the cart shows, we are able to track it. Another scenario we will look at is when users are taken to a cart page (/cart).

Let’s dig into the first scenario where users will interact with a side cart. Before we dive into the code block and its different section, note that we are using Bootstrap 5 to build the “side cart”. In this particular case, we will be using the Offcanvas component. This important for you to know since we will be using the JavaScript events of this component to trigger the view_cart event. You can read more the component and its event [here](https://getbootstrap.com/docs/5.0/components/offcanvas/#events). Let’s dig into the code.

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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_cart",
      ecommerce: {
        currency: "USD",
        value: sideCartValue,
        items: sideCartProductsArray,
      },
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

The code block starts by declaring two variables: sideCartProductsArray and sideCartValue. sideCartProductsArray is an empty array that will store information about the products in the side cart, while sideCartValue is a variable that will store the total value of the products in the side cart.

Next, the function viewCart is declared. This function is called every time the user views the side cart. The function starts by using the querySelectorAll method to get all the products in the side cart (which are stored in li elements with the class list-group-item inside a div with class side-cart).

If there are products in the side cart, the code block loops through each product and pushes the product's information (name and price) into the sideCartProductsArray. The price of each product is obtained by using a regular expression (regex) to extract the numbers from the product's price string and converting it to a number using the Number method.

The total value of the products in the side cart is then calculated by looping through the sideCartProductsArray and adding the price of each product.

Finally, the dataLayer is declared and the view_cart event is pushed into the dataLayer. The event contains information about the currency (USD) and the value of the side cart, as well as the products in the side cart.

The code block ends by using the getElementById method to get the side cart and adding an event listener to the side cart. The event listener is for the shown.bs.offcanvas event and it is triggered every time the side cart is shown. When this event is triggered, the viewCart function is called and the "view_cart" event is sent to Google Analytics.

That’s it for the first scenario where a side cart is shown to the user. This way of tracking is more complicated then on a page view. If the you want to fire the same event using the /cart page load as the trigger, you can do so by modifying the trigger from the shown.bs.offcanvas to load. This is admitting the the same CSS selectors are being used on the /cart page. If not then simply modify the CSS selectors to make sure you are getting what you need.

### view_item

If you are still having trouble working with triggering an event on page load, you are in luck! The view_item event, as described above, is an event that will fire the whenever a user views an item. To make things clearer, we want to fire this event whenever a user visit a product details page. With this in mind, we should be able to track this event with relative ease. Here’s what the code will look like:

```js
// Defining the add to cart function
const viewItem = () => {
  window.dataLayer = window.dataLayer || []; // Declaring the dataLayer object if not defined
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.

  window.dataLayer.push({
    event: "view_item",
    ecommerce: {
      currency: "USD",
      value: getProductPrice(),
      items: [
        {
          item_name: document.querySelector("div.product-name").textContent,
          price: getProductPrice(),
        },
      ],
    },
  });
};
window.addEventListener("load", viewItem);
```

This code block defines a function named viewItem. This function pushes data to the Google Tag Manager's dataLayer. The data includes an event name, which is "view_item", as well as an ecommerce object that includes information such as the currency used (USD), the item's value (obtained from a function named getProductPrice), and information about the item itself (obtained from the DOM, such as the item's name and its price). The function is triggered by a load event, so it will fire whenever the page finishes loading.

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

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: entries[0].target.getAttribute("data-list-id"), // entries is an object
        item_list_name: entries[0].target.getAttribute("data-list-name"),
        items: observedProductsArray,
      },
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

First, we create a constant variable called "options" that is an object with a single property, "threshold". This threshold property is set to 1.0, which means that the event in question will only fire when the entire recommended products section is fully visible on the user's screen.

Next, we create an empty array called "observedProductsArray". This array will be used to store information about the products in the recommended products section so that we can send this data to Google Tag Manager .

We then define a function called "hasBeenSeen" which will be used as the callback function for the Intersection Observer. This function takes in a single argument, "entries". Entries is an object that contains information about the intersection of the observer and the target element (in this case, the "div.recommended-products div.card-group" element).

If there is an intersection, we first retrieve all the products in the recommended products section using the DOM querySelectorAll method. We then loop through each product using a forEach loop and push each product's information (the product name and price) into the "observedProductsArray".

Finally, we push the event "view_item_list" and the ecommerce information (which includes the item list ID, item list name, and the items in the list which is stored in the "observedProductsArray") to the dataLayer.

After the event has been fired and the data has been logged into the dataLayer, we use the "unobserve" method of the observer to stop observing the target element. This is done to prevent the callback function from being fired multiple times.

To set up the observer, we create an instance of the Intersection Observer and pass in two arguments: the callback function (in this case, the "hasBeenSeen" function) and the options object that we created earlier. Finally, we use the "observe" method of the observer to start observing the target element.

Hopefully this explanation, however brief, helps you understand the code better. Now, let’s talk about the E-commerce pages with multiple lists. If you have more than one product list, then it is recommended to add multiple observer to the right lists to avoid complicated the tracking code. If you are comfortable working with loops that you can create a loop to iterate over all lists that you want to target and use the loop to create the Intersection Observers and track the lists whenever they are 100% in the users’ view port.

As mentioned above, it is up to you whether you want to fire the view_item_list based on users visiting the collections page or not. Whatever you choose as suitable trigger for this event, make sure that all the item properties to be sent are easily accessible. While it is important to track events to have better visibility over user behaviour, remember that non-optimized tracking code blocks can cause performance issues or even may interfere with the way your web pages work.

## Tracking checkout events

Now that everything is set prior to checkout, the next step is to focus on the checkout events which are begin_checkout, add_payment_info, add_shipping_info, and purchase. The first event we will start with is begin_checkout.

### begin_checkout

This event is very straightforward. The goal is to send an event to Google Analytics 4 every time a user begins a checkout. If you are wandering if the event is going to fire for every occurrence, then the answer is yes. The reason for that is that it reflects the actual behaviour of your users. Let’s dig in.

In our example, the checkout button is shown to the user once the user views their cart. Now, the goal is to fire the begin_checkout event once the user clicks on the checkout button and we pass the cart data to the event. Let’s see what that code looks like:

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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "USD",
        value: checkoutProductsValue,
        items: checkoutProductsArray,
      },
    });
  }
};
```

Here's what the code does step by step:

1. It initializes two variables checkoutProductsArray and checkoutProductsValue as an empty array and zero, respectively.
2. It declares the beginCheckout function that will track the checkout events.
3. It selects all the li elements with a class of list-group-item inside a div element with a class of side-cart. These elements represent the products in the shopping cart.
4. If the checkoutProducts exist, the code will loop through each product and add the product information to the checkoutProductsArray as an object. The object has two properties: item_name and price. The item_name is extracted from the product's title (.product-title) and price is calculated using a function. The function first extracts the string value of the price (.product-price), and using a regular expression, it only keeps the numbers and converts it to a number.
5. The checkoutProductsValue is then calculated by adding up the prices of each product in the checkoutProductsArray.
6. The code initializes the dataLayer array and clears the previous ecommerce object (if any) by pushing { ecommerce: null } into the dataLayer.
7. The code then pushes an object into the dataLayer with the following properties:
   - event: "begin_checkout"
   - ecommerce: an object with the following properties
   - currency: "USD"
   - value: checkoutProductsValue
   - items: checkoutProductsArray

This code is used to track the checkout process events in Google Tag Manager.

### add_payment_information & add_shipping_info

These steps, if tracked, will help you establish a checkout funnel that you can use in order to gain insights in your checkout abandonment and build cart-recovery programs that will help you increase your revenue. However, to track these events outside of platform that offer direct integration with Google Analytics 4 or Shopify Plus, it is recommended to work with a developer to get it done. The reason is simple. These events need to be triggered once a user successfully ads their payment information and successfully ads their shipping information. In order to properly trigger these events, you will probably be using API response codes that indicate that payment information is valid or that the submitted address exists. That being said, it’s better to work with a developer to get these events tracked right. Here are some resources about the events:

- [add_shipping_info](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#add_shipping_info)
- [add_payment_info](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#add_payment_info)

### purchase

This is perhaps one of the most important E-commerce events you would want to track. That being said, it is also better to work with developers to track this event if you are not using an an E-commerce that is integrated with Google Analytics 4 or something like Shopify where we can insert tracking codes easily.

Here’s the documentation for the [purchase](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#purchase) event. There are somethings you would want to consider before moving to the implementation:

- You want the event to fire after you have received an API response that the payment has been successfully processed and not when the purchase button is clicked
- If you firing the event based on a thank you page, please make sure to the fire the event on first access and not on every page load
- Make sure that the items involved in the transaction are available to be used wherever you are trying to implement the purchase event

## Using Google Tag Manager with the dataLayer to send events to Google Analytics 4

So far, our tracking is logging our E-commerce events data into the dataLayer but this is not enough to send the data to Google Analytics 4. All we did so far is step one of a two-step process. The next step is more straightforward thanks to the magic of Google Tag Manager containers. To expedite the process, we are going to rely on already-built E-commerce container. So, let’s get started!

First, head to this [page](https://www.datakyu.co/resources/google-tag-manager-container-tempaltes.html) and download the E-commerce container template. The second step is to head to your Google Tag Manager container and import the container you just downloaded. Make sure that you merge the container and not override any settings you have. Before merging, make sure to inspect your current configuration and the new tags, triggers and variables to ensure nothing is causing any conflicts; only then do you proceed with the merge. Once the container has been properly installed, you will notice some new tags:

- login
- search
- select_content
- share
- sign_up

And the last new tag is All E-commerce Events. By way, if you do not feel comfortable keeping the new tags, you can always delete them. They are not required to have a functional E-commerce tracking. Let’s dig into the E-commerce tag. First and foremost, make sure to change the Measurement ID for the Google Analytics 4 Configuration Tag.

As you can see the tag is configured to send an event which is equivalent to the current dataLayer event. We are able to do this using the Event built-in Event variable. You can also see that the tag is setting the user_id. You can remove this if you removed the user events. In fact, it is recommended that you remove this if you store’s Privacy Policy is not in top shape. The last thing about this tag is that it is using an additional setting Send Ecommerce data and that the data source is set to the Data Layer. This will ensure that whenever we are logging data into that dataLayer, the tag will use that data to populate the E-commerce data and then send along with the event.

Once all the changes have been implemented, the next step is to test the implementation and see if everything is working as expected. If everything looks good, then publish your container and you are off to the races.
