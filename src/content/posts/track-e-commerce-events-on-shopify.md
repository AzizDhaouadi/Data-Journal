---
author: Aziz Dhaouadi
categories: ["E-commerce", "Shopify"]
date: 02/11/2023
featured: true
image: ./images/track-ecommerce.png
title: Track E-commerce Events on Shopify
---

Shopify is one of the most common platforms for E-commerce and tracking your store with Universal Analytics is indeed very straightforward thanks to Shopify's integration. In fact all it takes is simple copy, paste of your tracking ID. However, when it comes to Googel Analytics 4, things are a bit different. Shopify announced that it will fully support Google Analytics 4 by March 2023. Not a lot of details have been revealed about this integration though. It is expected that the integration would give the same visbility as Universal Analytics i.e. purchase and the checkout process.

That being said, we would have to wait until Shopify releases the integration for us to know to what extent the integration is useful. But, if you want to set up your own tracking and pass all of the parameters you require without relying much on the integration then you came to the right place. In this guide we will look at how you can track E-commerce events on Shopify.

> In this tutorial, we will be using the checkout.liquid file which is only available for Shopify Plus merchants.

## E-commerce events tracking

Let's dig into our tracking. Unfortunately, if you do not have a Shopify Plus account, tracking some the E-commerce events is not possible. Keep reading nonetheless. We will be tackling how to track purchases and users checking their order status pages.

### Tracking Requirements

We have tackled this subject before; that is E-commerce tracking using [gtag.js](https://datajournal.datakyu.co/tracking-e-commerce-with-gtag-js/) and Google Tag Manager. For this tutorial, we will be using [Google Tag Manager](https://datajournal.datakyu.co/tracking-e-commerce-with-google-tag-manager/). The latter's dataLayer is a great tool to work with events without sending anything that is not valid. With this information in mind, there are steps that need to be done before we move to tracking our events. The steps are the following:

1. Adding the Google Tag Manager script in the theme.liquid file
2. Adding the Google Tag Manager script in the checkout.liquid file
3. Adding the Google Analytics 4 Configuration Tag

## Adding Google Tag Manager to the theme.liquid file

We are going to admit that you already have a Google Tag Manager account. If that's not the case, you can follow this [guide](https://support.google.com/tagmanager/answer/6103696?hl=en) to set up your Google Tag Manager account.
Once you have created your account, set up your web container and added your workspace, the next step is to add Google Tag Manager to the theme.liquid file. This step will ensure that Google Tag Manager loads on every page of your site (checkout pages excluded). To do this, follow these steps:

1. Copy the Google Tag Manager code provided in the container setup
2. In Shopify, navigate to the Online Store > Themes section
3. Find and click on the Actions button, the click on "Edit code"
4. Look for the theme.liquid file in the list of files and click on it
5. Locate the `<head>` tag in the theme.liquid and paste the first snippet immediately after the opening of the <head> tag
6. Next, locate the `<body>` tag and paste the second snippet immediately after its opening
7. Lastly, save the changes to the file

## Adding Google Tag Manager to the checkout.liquid file

Adding Google Tag Manager to the checkout.liquid file is a similar process to the one we used to add Google Tag Manager to the theme.liquid file. That being said, follow the exact same steps only find **checkout.liquid** instead of theme.liquid in step 4.

> We recommend that you create a backup of the original file before modifying them.

## Adding the Google Analytics 4 Configuration Tag

In this step, we will add a Google Analytics 4 Configuration tag which we will be referencing later when setting up our E-commerce tag (that's right, just one). Here are the steps we need to take to create the tag:

- Sign in to your Google Tag Manager account and select the container in which you want to create the tag.
- Click on the "Tags" section in the container.
- Click on the "New" button to create a new tag.
- In the 'Tag Configuration" section, click on the "Google Analytics: GA4 Configuration" button
- Give the configuration a name and paste the measurement ID of the property you want to add tracking to. The measurement ID looks like this G-XXXXXXXXXX
- In the "Triggering" section, select the trigger that will fire the tag. Select the All Pages trigger.
- Save the tag.

### Testing the implementation

It's time to the test everything we have implemented so far. Before we preview our Google Tag Manager, make sure that you have saved the changes made to both the checkout.liquid and theme.liquid files. If everything is looking good, let's proceed with previewing the workspace. All we need to do is navigate to our Google Tag Manager workspace and click on the "Preview" button. Next, paste the URL of your store and click "Connect". A new tab will open and the test page will load. Use the Tag Assistant tab to make sure that page views are being correctly tracked. Visit some couple pages (checkout ones too) to make sure everything is being captured correctly. If you see that some pages are missing, go back to your implementation and make sure that the scripts are installed correctly. If everything looks good, it's time to move on to the fun part!

> If you did not add the Google Tag Manager script to the checkout.liquid file, do not expect pageviews to show on when using GTM's preview mode.

## Non-checkout Events

In our previous issue, we discussed how you can track E-commerce events regardless of the E-commerce platform you are using be it Shopify, WooCommerce, Wix... In this article, we will focus particularly on Shopify. To make things easier, we will divide our events into two categories:

- checkout events
- non-checkout events

Non-checkout events are made of the following list:
| Event | Description |
| ---------------------------------- | ----------------------------------------------------- |
| [add_to_cart](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_cart) | A user adds items to cart |
| [add_to_wishlist](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_wishlist) | A user adds items to a wishlist |
| [generate_lead](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead) | A user submits a form or a request for information |
| [remove_from_cart](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#remove_from_cart) | A user removes items from a cart |
| [select_item](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_item) | A user selects an item from a list |
| [view_cart](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_cart) | A user views their cart |
| [view_item](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item) | A user views an item |
| [view_item_list](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_list) | A user sees a list of items/offerings |

### view_item

This is the first event we are going to look at for the non-checkout events. As per the table above, we will be firing the event whenever the user views an item. In our case, we will fire the event every time the product details page is visited. To do this, need to find the product.liquid file (the name may slightly differ based on the theme), and we will add a script tag that will log our event to the dataLayer. Here's what the script will look like:

```js
const ShopifyItem = ShopifyAnalytics.meta.product;
const viewItem = () => {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  dataLayer.push({
    event: "view_item",
    ecommerce: {
      currency: ShopifyAnalytics.meta.currency,
      value: ShopifyAnalytics.meta.product.variants[0].price / 100,
      items: [
        {
          item_id: ShopifyItem.variants[0].id,
          item_name: ShopifyItem.variants[0].name,
          item_brand: ShopifyItem.vendor,
          price: ShopifyItem.price / 100,
          quantity: 1,
        },
      ],
    },
  });
};
window.addEventListener("load", viewItem);
```

The code starts by declaring two constants ShopifyItem and ShopifyAnalytics. ShopifyItem is assigned the value of ShopifyAnalytics.meta.product, which refers to the product information for the current page being viewed. ShopifyAnalytics is an object that contains information about the Shopify store and its products. Next, the code defines a function named viewItem that pushes information about the viewed product to the data layer. The function starts by setting window.dataLayer = window.dataLayer || [], which creates an array named dataLayer if it doesn't already exist. This array will store the data that will be pushed to the data layer. The function then calls dataLayer.push({ ecommerce: null }); which clears any previous ecommerce object in the data layer. This step is optional, but it is good practice to clear the data layer before pushing new data. After clearing the data layer, the function pushes a new object to the data layer with information about the viewed product. The object has the following structure:

```json
  {
    event: 'view_item',
    ecommerce: {
      currency: ShopifyAnalytics.meta.currency,
      value: ShopifyAnalytics.meta.product.variants[0].price / 100,
      items: [
        {
          item_id: ShopifyItem.variants[0].id,
          item_name: ShopifyItem.variants[0].name,
          item_brand: ShopifyItem.vendor,
          price: ShopifyItem.price / 100,
          quantity: 1
        }
      ]
    }
  }
```

Finally, the code sets a window event listener that listens to the "load" event of the page. When the page has finished loading, the viewItem function is automatically invoked.

> Don't forget to wrap this code block inside a script tag before adding it to you product.liquid file.

### select_item

The next event on the list is the select_item event. This event is supposed to fire whenever a use selects an item. The event is supposed to fire on the following pages:

- Home page
- Catalog page (/collections/all)
- Individual collections page

Let's look at an example where we will fire this event on the /collections/all page:

```js
const productItems = document.querySelectorAll(
  "div#ProductGridContainer li.grid__item"
);
const ShopifyItems = ShopifyAnalytics.meta.products;
let ShopifyItemsArray = [];

const prepareShopifyItemsArray = () => {
  window.dataLayer = window.dataLayer || [];
  ShopifyItems.forEach((ShopifyItem) => {
    ShopifyItemsArray.push({
      item_id: ShopifyItem.variants[0].id,
      item_name: ShopifyItem.variants[0].name,
      item_brand: ShopifyItem.vendor,
      price: ShopifyItem.variants[0].price / 100,
    });
  });
};
window.onload = () => {
  prepareShopifyItemsArray();
};

productItems.forEach((productItem, productIndex) => {
  productItem.addEventListener("click", () => {
    dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    dataLayer.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "catalog",
        item_list_name: "Catalog Page",
        items: ShopifyItemsArray[productIndex],
      },
    });
  });
});
```

The code starts by declaring a constant variable productItems which is assigned the value of the result of a query selector that selects all the product items on the catalog page. It then declares a constant variable ShopifyItems which is assigned the value of ShopifyAnalytics.meta.products. This is an array of objects representing all the products available on the store. The code then creates a function prepareShopifyItemsArray that pushes information about the products to an array ShopifyItemsArray. The information includes the variant ID, name, vendor, and price of the products. This function is invoked when the page has finished loading, which is determined by the window.onload event. The code then loops through each product item on the catalog page and adds an event listener to each that listens to a 'click' event. When a product is clicked, the code pushes the selected product information to the data layer. The data includes the item_list_id, item_list_name, and items properties. The item_list_id and item_list_name properties are set to "catalog" and "Catalog Page" respectively, which represent the current page and the purpose of the tracking event. The items property is set to the selected product information, which is obtained from the ShopifyItemsArray at the index of the clicked product.

This code should be pasted on the /collections/all equivalent liquid file. If you are using the Dawn theme, the file you are looking for is main-collection-product-grid.liquid. After implementing the code on that page, you can modify the code block for the home page as well as the individual collection pages. Please note that when you are adding this code to the "home page", you will not find a liquid file for the home page. Instead, the home page is made of "components" such as featured collection or featured product and that's where the code needs to be added.

> Make sure ShopifyAnalytics.meta.products is accessible in the page you are trying to track

Let's have a look at an example where we are going to track a featured collection on the home page. Featured collections are one of the most used components in a Shopify theme, so this example should helop you understand how to track other components.

First, we will begin by identifying the liquid file for a featured collection. For the Dawn theme, that's featured-collection.liquid. The next step is to look at the composition of the blocks to understand which CSS selectors to use. After that has been done, it's time to write the JavaScript code block allowing us to track the select_item event.

```js
const regexNum = "[+-]?([0-9]*[.|,])?[0-9]+"; //Regular Expression to extract numbers from a string

// Getting the list of related products
const featuredCollection = document.querySelectorAll(
  "ul.product-grid.contains-card--product li.grid__item"
);

// itemArray
let itemArray = []; // We will use this array to sedn the data into the items array inside the dataLayer event

// selectItem function
const selectItem = (e) => {
  console.log(e.target.closest("div.card-wrapper.product-card-wrapper"));
  console.log(
    e.target
      .closest("div.card-wrapper.product-card-wrapper")
      .parentElement.querySelector(
        "div.card-wrapper.product-card-wrapper div.card.card--standard.card--text > div.card__content div.card__information span.price-item.price-item--regular"
      )
      .textContent.trim()
  );
  itemArray.push({
    item_name: e.target
      .closest("div.card__inner")
      .querySelector("div.card__content div.card__information h3 a")
      .textContent.trim(),
    price: (function () {
      let stringFeaturedProductPrice = e.target
        .closest("div.card-wrapper.product-card-wrapper")
        .parentElement.querySelector(
          "div.card-wrapper.product-card-wrapper div.card.card--standard.card--text > div.card__content div.card__information span.price-item.price-item--regular"
        )
        .textContent.trim(); // Getting the price as a string
      let numbersOnlyStringFeaturedProductPrice =
        stringFeaturedProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
      let FeaturedProductPrice = Number(numbersOnlyStringFeaturedProductPrice); // Changing the price's data type into a number
      return FeaturedProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
    })(),
  });

  // Defining the dataLayer
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.

  window.dataLayer.push({
    event: "select_item",
    ecommerce: {
      item_list_id: "featured_collection_products",
      item_list_name: "Featured Collection Products",
      items: itemArray,
    },
  });
  itemArray = [];
};

featuredCollection.forEach((featuredCollectionProduct) => {
  featuredCollectionProduct.addEventListener("click", selectItem);
});
```

Let' see what this code block does. First, it creates a regular expression pattern to extract numbers from a string. Then, it selects the list of related products using JavaScript. A selectItem function is then defined, which will be fired every time a product is selected from the list. This function uses the event target to get the name and price of the selected product and stores it in the itemArray. After that, the dataLayer is defined and the previous ecommerce object is cleared. A new ecommerce event is then pushed into the dataLayer, including information such as the event type, the ID and name of the product list, and the items in the itemArray. Finally, the selectItem function is attached to each product in the featured collection list as an event listener, so that every time a product is clicked on, the function will be fired and the ecommerce data will be pushed into the dataLayer.

### view_cart

This is a new event introduced to the world of E-commerce tracking in Google Analytics 4. The event is very useful and can be leveraged in multiple ways. For instance this event can be used in a 2-step funnel along with the begin_checkout event to determine a benchmark for cart abandonment. With the right parameters, you can even do a dropoff breakdown based on cart value. In our example, we will take a look at how we can fire the event based on the page view, specifically the /cart page. The code we are going to write is going to be added to the main cart page; this page is **main-cart-items.liquid** if you are using the Dawn theme. Let's dig in.

```js
const cartProducts = document.querySelectorAll("table.cart-items tr.cart-item");
let cartProductsArray = [];
let cartValue = 0;

const calculateCartValue = (cartItemsArray) => {
  if (!cartItemsArray) {
    return 0;
  } else {
    cartItemsArray.forEach((cartItem) => {
      cartValue += cartItem.price * cartItem.quantity;
    });
    return cartValue;
  }
};

const viewCart = () => {
  cartProducts.forEach((cartProduct) => {
    cartProductsArray.push({
      item_name: cartProduct.querySelector("td.cart-item__details a")
        .textContent,
      price: (function () {
        let stringCartProductPrice = cartProduct
          .querySelector("td.cart-item__details div.product-option")
          .textContent.trim();
        let numbersOnlyStringCartProductPrice =
          stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
        let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
        return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
      })(),
      quantity: cartProduct.querySelector("td.cart-item__quantity input").value,
    });
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: "view_cart",
    currency: ShopifyAnalytics.meta.currency,
    value: calculateCartValue(cartProductsArray),
    items: cartProductsArray,
  });
};

window.addEventListener("load", viewCart);
```

The purpose of the code is to send data to Google Tag Manager every time the cart page is loaded, and the data sent includes information about the products in the cart, the total value of the cart, and the currency used in the e-commerce website. The code first selects all the rows in the cart table that contain product information using the querySelectorAll method and stores them in the "cartProducts" constant. An array called "cartProductsArray" is then created to store information about each product in the cart. A function called "calculateCartValue" is defined to calculate the total value of the cart. The viewCart function is then defined, which iterates over each product in the cart and pushes its information (product name, price, and quantity) into the "cartProductsArray". The function then pushes the information about the cart into the dataLayer array provided by Google Tag Manager. The event type is set to "view_cart" and the data sent includes the currency used in the e-commerce website, the total value of the cart, and the items in the cart. Finally, the viewCart function is called when the "load" event is triggered, meaning that the function will be executed every time the cart page is loaded.

### add_to_cart

Since we are talking about viewing products in the cart, let's learn how to track products being added to the cart. To make things even more interesting, we will learn how to track the event when a product is being added to cart through the add to cart button and using the item quantity selector on the /cart page. That being said, we will add the first section of the tracking to the product.liquid page and the second section to the cart.liquid page. Let's dig in.

```js
const addToCartButton = document.querySelector("button.product-form__submit");
const addToCart = () => {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      currency: ShopifyAnalytics.meta.currency,
      value:
        (ShopifyItem.variants[0].price / 100) *
        document.querySelector("input.quantity__input").value,
      items: [
        {
          item_id: ShopifyItem.variants[0].id,
          item_name: ShopifyItem.variants[0].name,
          item_brand: ShopifyItem.vendor,
          price: ShopifyItem.variants[0].price / 100,
          quantity: document.querySelector("input.quantity__input").value,
        },
      ],
    },
  });
};
addToCartButton.addEventListener("click", addToCart);
```

This code block is setting up an event listener for a button on a webpage, specifically the "Add to Cart" button. When the button is clicked, a function called "addToCart" is executed. The first step in the addToCart function is to reset the "dataLayer" variable. Next, the function pushes some data to the dataLayer variable. This data includes information about the event that just occurred, which is "add_to_cart". Additionally, there is information about the ecommerce transaction that just took place. This information includes the currency used (such as USD or EUR), the total value of the transaction, and details about the item that was added to the cart. These details include the item's ID, name, brand, price, and quantity. Finally, the addToCartButton has an event listener attached to it, so that when it is clicked, the addToCart function will be executed and this data will be pushed to the dataLayer.

Let's now have a look at the add_cart_event using the quantity selector on the /cart page. This event should be easier to handle since we will be working with less variables. Let's dig in.

```js
function updateAddToCart(event) {
  event.preventDefault();
  // const previousValue = this.input.value;

  // let newValue;
  if (event.target.name === "plus") {
    console.log("clicked!");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: ShopifyAnalytics.meta.currency,
        value: (function () {
          let cartItemContainer = event.target.closest("tr.cart-item");
          let stringCartProductPrice = cartItemContainer
            .querySelector("td.cart-item__details div.product-option")
            .textContent.trim();
          let numbersOnlyStringCartProductPrice =
            stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
          let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
          return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
        })(),
        items: [
          {
            item_name: event.target
              .closest("tr.cart-item")
              .querySelector("td.cart-item__details a").textContent,
            price: (function () {
              let cartItemContainer = event.target.closest("tr.cart-item");
              let stringCartProductPrice = cartItemContainer
                .querySelector("td.cart-item__details div.product-option")
                .textContent.trim();
              let numbersOnlyStringCartProductPrice =
                stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
              let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
              return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
            })(),
            quantity: 1,
          },
        ],
      },
    });
  } else {
  }
}
```

The code updateAddToCart(event) is a JavaScript function that is triggered when an event, such as a click, occurs. The first line, event.preventDefault();, prevents the default action of the event from happening. The function then checks if the name attribute of the target element of the event is equal to "plus". If this condition is met, the function logs "clicked!" in the console and pushes data to the dataLayer array. The data that is pushed includes information about an add_to_cart event, such as the currency, the value of the item being added to the cart, and information about the item being added, such as its name, price, and quantity. If the name attribute of the target element is not equal to "plus", the function does not perform any action.

> Use updateAddToCart(event) as the value of the onclick parameter for the + button

### remove_from_cart

Now that we know how to track additions to the cart, let's have a look at how we can track removals from the cart. There two scenarios where a user is removing items from their cart. The scenario is when they are on the cart page and they are reducing quantities of products. And the second scenario is when they remove a product as a whole. Let's take a look at how we can track the first scenario.

Since in our previous event, we added a function that listenes for event add firest the add to cart event if the event target's name is plus, we follow a similar logic but instead of the event's target being plus, we will use minus. Let's dig into the code.

```js
else if (event.target.name === 'minus') {
    console.log('minus button clicked!');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ecommerce: null});
      dataLayer.push({
        event: 'remove_from_cart',
        ecommerce: {
          currency: ShopifyAnalytics.meta.currency,
          value: function(){
            let cartItemContainer = event.target.closest('tr.cart-item');
            let stringCartProductPrice = cartItemContainer.querySelector('td.cart-item__details div.product-option').textContent.trim()
            let numbersOnlyStringCartProductPrice = stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
            let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
            return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
          }(),
          items: [{
            item_name: event.target.closest('tr.cart-item').querySelector('td.cart-item__details a').textContent,
              price: function(){
              let cartItemContainer = event.target.closest('tr.cart-item');
              let stringCartProductPrice = cartItemContainer.querySelector('td.cart-item__details div.product-option').textContent.trim()
              let numbersOnlyStringCartProductPrice = stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
              let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
              return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
            }(),
            quantity: 1
          }]
        }
      });
  }
```

Here's what the whole function looks like for more context:

```js
function updateAddToCart(event) {
  event.preventDefault();
  if (event.target.name === "plus") {
    console.log("plus button clicked!");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: ShopifyAnalytics.meta.currency,
        value: (function () {
          let cartItemContainer = event.target.closest("tr.cart-item");
          let stringCartProductPrice = cartItemContainer
            .querySelector("td.cart-item__details div.product-option")
            .textContent.trim();
          let numbersOnlyStringCartProductPrice =
            stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
          let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
          return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
        })(),
        items: [
          {
            item_name: event.target
              .closest("tr.cart-item")
              .querySelector("td.cart-item__details a").textContent,
            price: (function () {
              let cartItemContainer = event.target.closest("tr.cart-item");
              let stringCartProductPrice = cartItemContainer
                .querySelector("td.cart-item__details div.product-option")
                .textContent.trim();
              let numbersOnlyStringCartProductPrice =
                stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
              let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
              return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
            })(),
            quantity: 1,
          },
        ],
      },
    });
  } else if (event.target.name === "minus") {
    console.log("minus button clicked!");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        currency: ShopifyAnalytics.meta.currency,
        value: (function () {
          let cartItemContainer = event.target.closest("tr.cart-item");
          let stringCartProductPrice = cartItemContainer
            .querySelector("td.cart-item__details div.product-option")
            .textContent.trim();
          let numbersOnlyStringCartProductPrice =
            stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
          let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
          return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
        })(),
        items: [
          {
            item_name: event.target
              .closest("tr.cart-item")
              .querySelector("td.cart-item__details a").textContent,
            price: (function () {
              let cartItemContainer = event.target.closest("tr.cart-item");
              let stringCartProductPrice = cartItemContainer
                .querySelector("td.cart-item__details div.product-option")
                .textContent.trim();
              let numbersOnlyStringCartProductPrice =
                stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
              let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
              return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
            })(),
            quantity: 1,
          },
        ],
      },
    });
  }
}
```

The function updateAddToCart is triggered whenever the "plus" or "minus" button on a shopping cart page is clicked. It stops the default behavior of the button. It then determines which button was clicked ("plus" or "minus") and runs the appropriate code. When the "plus" button is clicked, it logs the message "plus button clicked!" and pushes data onto a data layer, which is an array that is used to track information about the user's interaction with the website. This data layer is used to track ecommerce information and the specific data pushed to the data layer includes the event type "add_to_cart", the currency of the website, the value of the item being added to the cart, and information about the item itself (name, price, quantity). When the "minus" button is clicked, it logs the message "minus button clicked!" and pushes data onto the same data layer, but this time the event type is "remove_from_cart". The same information about currency, value, and item details is included. The value and the price of the item being added or removed are determined by extracting a numerical value from a string of text on the page that represents the price of the item. This extracted value is then converted into a number data type and returned as the value and price.

> Use updateAddToCart(event) as the value of the onclick parameter for the - button

If you are wondering why the "plus" and "minus" keep coming up and you are confused about what it means, this should clarify things:

```HTML
<button class="quantity__button no-js-hidden" name="plus" type="button" onclick="updateAddToCart(event)">

<button class="quantity__button no-js-hidden" name="minus" type="button" onclick="updateAddToCart(event)">
```

Let's look at the second scenario where the user would use the "delete" button to remove the whole product from the cart. Let's dig in.

```js
const removeFromCartButtons = document.querySelectorAll(
  "div.cart-item__quantity-wrapper cart-remove-button"
);
const removeFromCart = (e) => {
  console.log("remove from cart button has been clicked!");
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: "remove_from_cart",
    ecommerce: {
      currency: ShopifyAnalytics.meta.currency,
      value: (function () {
        let cartItemContainer = e.target.closest("tr.cart-item");
        let stringCartProductPrice = cartItemContainer
          .querySelector("td.cart-item__details div.product-option")
          .textContent.trim();
        let numbersOnlyStringCartProductPrice =
          stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
        let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
        let removedProductFromCartValue =
          cartProductPrice *
          e.target
            .closest("tr.cart-item")
            .querySelector("input.quantity__input").value;
        return removedProductFromCartValue; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
      })(),
      items: [
        {
          item_name: event.target
            .closest("tr.cart-item")
            .querySelector("td.cart-item__details a").textContent,
          price: (function () {
            let cartItemContainer = e.target.closest("tr.cart-item");
            let stringCartProductPrice = cartItemContainer
              .querySelector("td.cart-item__details div.product-option")
              .textContent.trim();
            let numbersOnlyStringCartProductPrice =
              stringCartProductPrice.match(regexNum)[0]; // Extracting the numbers from the price string
            let cartProductPrice = Number(numbersOnlyStringCartProductPrice); // Changing the price's data type into a number
            return cartProductPrice; // The return statement ensures that productPrice is the output of the getProductPrice every time the function is called
          })(),
          quantity: e.target
            .closest("tr.cart-item")
            .querySelector("input.quantity__input").value,
        },
      ],
    },
  });
};

removeFromCartButtons.forEach((removeFromCartButton) => {
  removeFromCartButton.addEventListener("click", removeFromCart);
});
```

The code adds an event listener to each element in the removeFromCartButtons node list which triggers the removeFromCart function when clicked. The function logs a message, initializes an array dataLayer if it doesn't already exist, and pushes an object to the array with ecommerce and event keys. The ecommerce object contains the currency and value of the product being removed from the cart, as well as an array of items with details about the product being removed (name, price, and quantity). The product price and value being removed from the cart are determined by extracting the price from the HTML and calculating the value based on the price and quantity. The data pushed to dataLayer is used by analytics platforms such as Google Tag Manager.

### generate_lead

This is the only event that is not proper to E-commerce but is very useful to online stores. If you are an online brand, and you are trying to understand the effectiveness of your newsletter signup popups or other sign up methods, this event will help do that. Before we start, we will be using the MutationObserver interface to track the newsletter. This is somewhat equivalent to Google Tag Manager's Element visibility trigger. Let's dig in.

```js
// Select the node that will be observed for mutations
const footerNewsletterForm = document.getElementById("ContactFooter");

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed
const successfulNewsletterSignup = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "generate_lead",
        newsletter_form: footerNewsletterForm.getAttribute("id"),
      });
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(successfulNewsletterSignup);

// Start observing the target node for configured mutations
footerNewsletterForm.addEventListener("submit", () => {
  observer.observe(footerNewsletterForm, config);
});
```

This code sets up a MutationObserver to watch for changes to the footer newsletter form with ID "ContactFooter". The observer is set up to look for childList mutations, meaning it will detect any changes to the child nodes of the form. If a childList mutation is detected, the observer's callback function "successfulNewsletterSignup" will be executed. The callback function pushes an event to the data layer with the event name "generate_lead" and the newsletter form's id attribute as the "newsletter_form" property. The observer is attached to the form when the form is submitted and starts observing the form for mutations.

We added this code to the **footer.liquid** since that's where the newsletter is located.

## view_item_list

This event is quite tricky to track. The idea is to target a list (or multiple) and have the event fire whenever the list(s) enter(s) the user's view port. Not only that, but we need the dataLayer to be populated with all the information related to the products that just became visible. To do this, we are going to use the **IntersactionObserver API**. Let's dig in.

```js
const regexNum = "[+-]?([0-9]*[.|,])?[0-9]+"; //Regular Expression to extract numbers from a string

// creating the observer for the recommended products list
let options = {
  threshold: 1.0,
};

// creating observedProductsArray. This will be the value of the items array in the dataLayer
let observedProductsArray = [];
let observedProductsList = document.querySelectorAll(
  'div[data-collection-type="featured_collection"] li.grid__item'
); // List of observed products

const hasBeenSeen = (entries) => {
  if (entries) {
    // Firing this event only when we are sure that the intersection happened
    observedProductsList.forEach((observedProduct) => {
      observedProductsArray.push({
        item_name: observedProduct
          .querySelector("h3.card__heading")
          .textContent.trim(),
        price: (function () {
          let ObservedStringProductPrice = observedProduct.querySelector(
            "span.price-item.price-item--regular"
          ).textContent;
          let numbersOnlyStringObservedProductPrice =
            ObservedStringProductPrice.match(regexNum)[0];
          let observedProductPrice = Number(
            numbersOnlyStringObservedProductPrice
          );
          return observedProductPrice;
        })(),
      });
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: entries[0].target
          .closest('div[data-collection-type="featured_collection"]')
          .getAttribute("data-collection-type"), // entries is an object
        item_list_name: entries[0].target
          .closest('div[data-collection-type="featured_collection"]')
          .getAttribute("data-list-name"),
        items: observedProductsArray,
      },
    });
  }
  Productsobserver.unobserve(
    document.querySelector('div[data-collection-type="featured_collection"]')
  ); // Unobserving the element so the callback function will only get called once
};

let Productsobserver = new IntersectionObserver(hasBeenSeen, options);
Productsobserver.observe(
  document.querySelector('div[data-collection-type="featured_collection"]')
);
```

This code creates an IntersectionObserver to monitor the visibility of a list of recommended products in the viewport, specified by the selector 'div[data-collection-type="featured_collection"] li.grid\_\_item'. The observer's callback function hasBeenSeen is called when the observer determines that the list of recommended products has become visible in the viewport. The function then creates an array observedProductsArray of objects, where each object represents a product in the list and has properties item_name (the name of the product) and price (the price of the product). The function then pushes an object to the dataLayer array with the properties:

- event: "view_item_list"
- ecommerce: an object with the following properties:
- item_list_id: The data-collection-type attribute of the nearest parent div element to the list of recommended products.
- item_list_name: The data-list-name attribute of the nearest parent div element to the list of recommended products.
- `items`: the observedProductsArray created earlier.

Finally, the observer is told to stop monitoring the element by calling Productsobserver.unobserve on the nearest parent div element to the list of recommended products.

That's a wrap for the non-chekout events. From this point onward, we are going to be using the checkout.liquid file in oder to track the following events:

| Event                                                                                                                                    | Description                            |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [begin_checkout](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#begin_checkout)       | A user begins the checkout process     |
| [add_shipping_info](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#add_shipping_info) | A user adds their shipping information |
| [add_payment_info](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#add_payment_info)   | A user adds their payment information  |
| [purchase](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#purchase)                   | A user makes a purchase                |

## Checkout events

### purchase

Let's begin with the most important event which is the purchase event. To track this event, we can either use the Order Status page or the checkout.liquid file. Since the checkout.liquid requires a Shopify Plus subscription, we will see how we can track this event using the Order Status page. Let's dig in.

```html
<script>
  const purchase = () => {
       window.dataLayer = window.dataLayer || [];
       dataLayer.push({
       	ecommerce: null
       });
       {% if first_time_accessed %}
       	dataLayer.push({
         event: "purchase",
         ecommerce: {
             transaction_id: "{{ order.order_number }}",
             value: {{ total_price | times: 0.01 }},
             tax: {{ tax_price | times: 0.01 }},
             shipping: {{ shipping_price | times: 0.01 }},
             currency: "{{ order.currency }}",
             items: [
             {% for line_item in line_items %}{
             item_id: "{{ line_item.product_id }}",
             item_name: "{{ line_item.title | remove: "'" | remove: '"' }}",
             currency: "{{ order.currency }}",
             price: {{ line_item.final_price | times: 0.01 }},
             quantity: {{ line_item.quantity }}
             },{% endfor %}
             ]
             }
         });
       {% endif %}
     }
     window.addEventListener('load', purchase);
</script>
```

The code creates a new purchase function that sets up the dataLayer object if it does not already exist. It then pushes an ecommerce data layer to the dataLayer object. The data pushed contains information about the purchase, including the transaction ID, order value, tax amount, shipping cost, currency, and items purchased. This data is only pushed if the first_time_accessed variable is truthy.

### begin_checkout, add_shipping_info, and add_payment_info

From this point onwards, we will need access to the checkout.liquid file. The code we are going to be using for this event and the following two will be using liquid which will allow us to dynamically get the data we need to populate our dataLayer. Let's dig in.

```js
(function($) {
  $(document).on("page:load page:change", function() {
    if (Shopify.Checkout.step === 'contact_information'){
    	window.dataLayer = window.dataLayer || [];
      dataLayer.push({
      	ecommerce: null
      });
      dataLayer.push({
      	event: 'begin_checkout',
        ecommerce: {
        	transaction_id: "{{ order.order_number }}",
            value: {{ total_price | times: 0.01 }},
            tax: {{ tax_price | times: 0.01 }},
            shipping: {{ shipping_price | times: 0.01 }},
            currency: "{{ order.currency }}",
            items: [
            {% for line_item in line_items %}{
            item_id: "{{ line_item.product_id }}",
            item_name: "{{ line_item.title | remove: "'" | remove: '"' }}",
            currency: "{{ order.currency }}",
            price: {{ line_item.final_price | times: 0.01 }},
            quantity: {{ line_item.quantity }}
            },{% endfor %}
            ]
        }
      });
    } else if (Shopify.Checkout.step === 'payment_method') {
    	window.dataLayer = window.dataLayer || [];
      dataLayer.push({
      	ecommerce: null
      });
      dataLayer.push({
      	event: 'add_shipping_info',
        ecommerce: {
        	transaction_id: "{{ order.order_number }}",
            value: {{ total_price | times: 0.01 }},
            tax: {{ tax_price | times: 0.01 }},
            shipping: {{ shipping_price | times: 0.01 }},
            currency: "{{ order.currency }}",
            items: [
            {% for line_item in line_items %}{
            item_id: "{{ line_item.product_id }}",
            item_name: "{{ line_item.title | remove: "'" | remove: '"' }}",
            currency: "{{ order.currency }}",
            price: {{ line_item.final_price | times: 0.01 }},
            quantity: {{ line_item.quantity }}
            },{% endfor %}
            ]
        }
      });
    } else if (Shopify.Checkout.step === 'processing') {
    	window.dataLayer = window.dataLayer || [];
      dataLayer.push({
      	ecommerce: null
      });
      dataLayer.push({
      	event: 'add_payment_info',
        ecommerce: {
        	transaction_id: "{{ order.order_number }}",
            value: {{ total_price | times: 0.01 }},
            tax: {{ tax_price | times: 0.01 }},
            shipping: {{ shipping_price | times: 0.01 }},
            currency: "{{ order.currency }}",
            items: [
            {% for line_item in line_items %}{
            item_id: "{{ line_item.product_id }}",
            item_name: "{{ line_item.title | remove: "'" | remove: '"' }}",
            currency: "{{ order.currency }}",
            price: {{ line_item.final_price | times: 0.01 }},
            quantity: {{ line_item.quantity }}
            },{% endfor %}
            ]
        }
      });
    }
  });
})(Checkout.$);
```

The code checks the value of Shopify.Checkout.step to determine the current step of the checkout process. Based on the step, the code pushes different events to the Google Tag Manager data layer, which is an array that is used to pass information from a website to Google Tag Manager. For each event, the code sets the event property and an ecommerce object with various properties like transaction_id, value, tax, shipping, currency, and items. The properties are set using Shopify Liquid, a template language used to access and display dynamic data in Shopify stores.

Here's what happens in each of the three steps:

- If Shopify.Checkout.step is contact_information, the code pushes an begin_checkout event to the data layer.
- If Shopify.Checkout.step is payment_method, the code pushes an add_shipping_info event to the data layer.
- If Shopify.Checkout.step is processing, the code pushes an add_payment_info event to the data layer.

In all cases, the code sets the ecommerce object with the details of the transaction, such as the transaction_id, value, tax, shipping, currency, and items. The items array contains details about each line item in the order, such as the item_id, item_name, currency, price, and quantity.

### Bonus Event: viewed_order_page

If you are interested in knowing if your customers are visiting your order status page after their purcahse, there is a way to do so. Before we explore this, it's important to understand how the order status page works in Shopify.

The **Order Status** page is usually considered as a checkout page. However, the first time a customer visits the page, it's considered as a Thank You page, where the Shopify.Checkout.step and Shopify.Checkout.page objects are defined. If the customer revisits or reloads the page, then this checkout is converted to an order, and the page loads as an Order Status page, where the Shopify.Checkout.step and Shopify.Checkout.page objects are undefined and the Shopify.Checkout.OrderStatus object is defined. That being said, let's dig in.

```js
if (Shopify.Checkout.OrderStatus) {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    event: "viewed_order_page",
  });
}
```

That's a wrap on all of our E-commerce related events. So, now that we tested our code and we are sure the right information is being pushed to the dataLayer, what do we do next?

## The E-commerce Tag

The next step is configuring E-commerce tags into Google Tag Manger. Unlike our tracking, we do not have to create multiple tags for each event. Instead, one tag will rule them all. Let's dig in.

The first thing we need to do is create a new tag; a Google Analytics: GA4 Event tag. For the event name type in {{Event}}. This variable captures the names of the events we are logging into the dataLayer and uses those names as the event's name. Next, expand the More Settings drop down and check the box for Send Ecommerce data. Keep the dataLayer as the Data Source. Our tag is now configured. The next step is to configure our trigger. Create a new trigger of Custom Event type, and in the event name paste the following:

```plaintext
view_item|view_item_list|select_item|add_to_cart|remove_from_cart|begin_checkout|add_shipping_info|add_payment_info|purchase
```

The next step would be to check the Use regex matching checkbox. This will allow the trigger to fire every time one the events in the list is detected. And you are done!

As for the generate event, follow the same instruction but omit the Send Ecommerce data setting and only add generate_lead as the Event name when you are creating your trigger; there is no need to use regex for this one.

That's it folks! The instructions layed out in this article should help you implement E-commerce tracking for your Shopify store and give your full visibility over your users behaviour and buyer journey.
