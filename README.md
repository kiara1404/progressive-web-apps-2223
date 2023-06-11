## Live demo

To see this project live, click [here](https://pwa-23.onrender.com/)

## Description

<!-- ☝️ replace this description with a description of your own work -->

This project is a single page application in vanilla JavaScript that allows you to scan products and get their nutritional values and scores.

## User story
As a person who follows a strict diet, I want to be able to quickly find products and see their nutritional value and maybe save them for groceries, so I can make more informed decisions within my diet and/or grocery shopping.

The app should at least render the index page when the app is offline because the list is saved there.


## Installation ⚙️


#### Clone this repository

```
git clone https://github.com/kiara1404/progressive-web-apps-2223
```

#### Install packages

```
npm install
```

#### Run the application

```
npm start
```

<!-- ...but how does one use this project? What are its features 🤔 -->

## Features
* Scan or fill in a barcode and find a product
* Search a product via text query
* Overview of a product with photo and nutritional value
* Save item into list

## Optimization
* Converted food.jpg(1,9MB) into food.webp(120kb). This improved the `Perceived loading speed`.
* NPM Minify to minify my clientside JS and CSS code. This improved the `Load responsiveness`. 
* Use responsive images with `srcset`


## Service Worker
For this project,  I implemented a service worker. I decided to cache an offline page, the header image, clientside JS and CSS files. Therefore, when the network is down, the user will be able to see interface of the app and will be redirected to the offline page.

I also decided to cache pages when the user has visited the page, like the home screen and previously visited products. This is especially needed when the user has saved a product and can in offline modus still go to this product page.


## API

#### Barcode Detection API

This projects uses the [Barcode Detection API](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API).

#### Open Food Facts API

This project also uses the [World Open Food Facts API](https://world.openfoodfacts.org/data)

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

## Activity Chart

![](https://github.com/kiara1404/food-check/blob/main/img/activity-chartv2.0.png?raw=true)

### License ©

[MIT License](https://github.com/kiara1404/web-app-from-scratch-2122/blob/main/LICENSE)

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
