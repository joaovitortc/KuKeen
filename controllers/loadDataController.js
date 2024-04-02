const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mealKitModel = require("../modules/mealKitModel");
const mealkitsUtil = require("../modules/mealkit-util");


router.get("/mealkits", (req, res) => {
 //console.log(req.session.user, req.session.role)

  if (!req.session?.user || req.session?.role != "data-clerk") {
    res.status(401).render("general/unauthorized", { title: "401" });
  } else {
    mealKitModel.countDocuments().then((count) => {
      if (count === 0) {
        // There are no documents, proceed with the data load.
        mealKitModel
          .insertMany(mealkitsUtil.getAllMealKits())
          .then(() => {
            res.render("general/message", {
              title: "Success",
              message: " Sucess! Added Mealkits to the database.",
            });
          })
          .catch((err) => {
            res.render("general/message", {
              title: "Error",
              message: " Error: " + err,
            });
          });
      } else {
        // There are already documents, don't duplicate them.
        res.render("general/message", {
          title: "Already populated",
          message: "Mealkits have already been added to the database.",
        });
      }
    });
  }
});

module.exports = router;
