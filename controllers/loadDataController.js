const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mealKitModel = require("../modules/mealKitModel")
const mealkitsUtil = require('../modules/mealkit-util');


// Add a route to copy the data from the fake database
// to the mongo db.
router.get("/mealkits", (req, res) => {

    if (!req.session?.user || req.session?.role != "data-clerk") {
        res.status(401).render("general/unauthorized", { title: "401" });
    }
    else {
        mealKitModel.countDocuments()
        .then(count => {
            if (count === 0) {
                // There are no documents, proceed with the data load.
                console.log("There are no documents, proceed with the data load.")
                mealKitModel.insertMany(mealkitsUtil.getAllMealKits())
                    .then(() => {
                        res.send("Success, data was loaded!");
                    })
                    .catch(err => {
                        res.send("Couldn't insert the documents: " + err);
                    });
            }
            else {
                // There are already documents, don't duplicate them.
                res.send("There are already documents loaded.");
            }
        });

    }

})

module.exports = router;