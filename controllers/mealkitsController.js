const express = require("express");
const router = express.Router();
const mealkitsUtil = require('../modules/mealkit-util');

router.get("/", (req, res) => {
  res.render("mealkits/mealkits", {
    title: "MealKits",
    mealObj: mealkitsUtil.getMealKitsByCategory(mealkitsUtil.getAllMealKits()),
  });
});

router.get("/list", (req, res) => {
    res.render("mealkits/list", {
      title: "List"
    });
  });

module.exports = router;