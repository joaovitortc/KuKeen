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
  if (!req.session?.user || req.session?.role != "data-clerk") {
    res.status(401).render("general/unauthorized", { title: "401" });
  }
  else {
    res.render("mealkits/list", {
      title: "List"
    });
  }
  });

module.exports = router;