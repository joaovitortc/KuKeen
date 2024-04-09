const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mealKitModel = require("../modules/mealKitModel");


const prepareView = function (req, res, message) {
  let viewModel = {
    message,
    cartTotal: 0,
    meals: [],
  };

  if (req.session?.user && req.session?.role == "customer") {
    // The user is signed in (and a session is established).

    // Get the shopping cart from the session.
    let cart = req.session.cart || [];

    // If there are songs in the cart, then calculate the order total
    let cartTotal = 0;

    cart.forEach((cartMeal) => {
      cartTotal += 1;
    });

    viewModel.message = message;
    viewModel.cartTotal = cartTotal;
    viewModel.meals = cart;
  }

  res.render("general/cart", { title: "Cart", viewModel });
};

router.get("/", (req, res) => {
  if (!req.session?.user || req.session?.role != "customer") {
    res.status(401).render("general/unauthorized", { title: "401" });
  } else {
    prepareView(req, res, "");
  }
});

router.get("/add/:id", (req, res) => {
  if (!req.session?.user || req.session?.role != "customer") {
    res.status(401).render("general/unauthorized", { title: "401" });
  } else {

  let mealId = req.params.id;
  let cart = (req.session.cart = req.session.cart || []);

  mealKitModel
    .find({ _id: mealId })
    .exec()
    .then((data) => {
      if (data) {
        let meal = data[0]

        if (meal) {
            let mealAlreadyInCart = false;
            cart.forEach((cartMeal) => {
              if (cartMeal.id == mealId) {
                cartMeal.quantity++;
                mealAlreadyInCart = true;
                return;
              }
            });
        
            if (!mealAlreadyInCart) {
              cart.push({
                id: mealId,
                meal,
                quantity: 1,
              });
            }
          }
          //console.log(cart);
          prepareView(req, res, "Meal added to cart");

      } else {
        // Couldn't find the meal.
        prepareView(req, res, "Meal not found");
        return null;
      }
    })
    .catch((err) => console.log(err));


  }
});

module.exports = router;
