const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mealKitModel = require("../modules/mealKitModel");

const prepareView = function (req, res) {
  let viewModel = {
    cartTotal: 0,
    meals: [],
  };

  if (req.session?.user && req.session?.role == "customer") {
    // The user is signed in (and a session is established).

    // Get the shopping cart from the session.
    let cart = req.session.cart || [];

    // Calculate the total price of the cart.
    let cartTotal = 0;

    cart.forEach((cartMeal) => {
      cartTotal += cartMeal.meal.price * cartMeal.quantity;
    });

    viewModel.cartTotal = cartTotal;
    viewModel.meals = cart;
  }

  res.render("general/cart", { title: "Cart", viewModel });
};

router.get("/", (req, res) => {
  if (!req.session?.user || req.session?.role != "customer") {
    res.status(401).render("general/unauthorized", { title: "401" });
  } else {
    prepareView(req, res);
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
          let meal = data[0];

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

          res.redirect("/cart");
        } else {
          // Couldn't find the meal.
          prepareView(req, res);
          return null;
        }
      })
      .catch((err) => console.log(err));
  }
});

router.get("/remove/:id", (req, res) => {
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
          let meal = data[0];

          if (meal) {
            let mealAlreadyInCart = false;
            cart.forEach((cartMeal) => {
              if (cartMeal.id == mealId) {
                if (cartMeal.quantity == 1) {
                  res.redirect("/cart/delete/" + mealId);
                } else {
                  cartMeal.quantity--;
                  mealAlreadyInCart = true;
                  return;
                }
              }
            });
          }
          res.redirect("/cart");
        } else {
          // Couldn't find the meal.
          console.log("Couldn't find the meal.")
          prepareView(req, res);
        }
      })
      .catch((err) => console.log(err));
  }
});

router.get("/delete/:id", (req, res) => {
  if (!req.session?.user || req.session?.role != "customer") {
    res.status(401).render("general/unauthorized", { title: "401" });
  } else {
    //user is Logged In
    let mealId = req.params.id;
    let cart = (req.session.cart = req.session.cart || []);

    // Find the index of the meal in the cart.
    const index = cart.findIndex((cartMeal) => cartMeal.id == mealId);

    if (index > -1) {
    // Remove the meal from the cart.
      cart.splice(index, 1);
    }

    res.redirect("/cart");
  }
});

router.get("/checkout", (req, res) => {

    if (!req.session?.user || req.session?.role != "customer") {
        res.status(401).render("general/unauthorized", { title: "401" });
    } else {
        let cart = req.session.cart || [];
        let user = req.session.user;
        if (cart.length == 0) {
        res.redirect("/cart");
        } else {
        
            let cartTotal = 0;
            cart.forEach((cartMeal) => {
                cartTotal += cartMeal.meal.price * cartMeal.quantity;
              });
    
        console.log(user.email, user.firstName, user.lastName, cart, cartTotal)
        //Send an email
        const sgMail = require("@sendgrid/mail");
              sgMail.setApiKey(process.env.SEND_GRID_API);

              sgMail
                .send(createMessage(user.email, user.firstName, user.lastName, cart, cartTotal))
                .then(() => {
                req.session.cart = [];
                res.render("general/thanks", { title: "Thank you!" , user:user})
                })
                .catch((err) => {
                  console.log(err);
                });
        }
    }
});

function createMessage(email, firstName, lastName, cart, total) {
    let cartDetails = cart.map(item => `
      <p>
        Title: ${item.meal.title}<br>
        Includes: ${item.meal.includes}<br>
        Servings: ${item.meal.servings}<br>
        Quantity: ${item.quantity}<br>
        Price: $${item.meal.price}<br>
        Subtotal: $${(item.quantity * item.meal.price).toFixed(2)}
      </p>
    `).join('');
  
    return {
      to: email,
      from: "kukeen.contact@gmail.com",
      subject: "Order Confirmation - Kukeen",
      html: `
              Dear ${firstName} ${lastName}, <br><br>
              Thank you for your purchase. Here are the details of your order:<br><br>
              ${cartDetails}<br><br>
              Total paid: $${(total + total * 0.1).toFixed(2)}<br><br>
              Best regards,<br>
              Joao Cunha, KuKeen CEO
              `,
    };
  }

module.exports = router;
