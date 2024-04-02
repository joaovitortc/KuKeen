const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mealkitsUtil = require("../modules/mealkit-util");
const mealKitModel = require("../modules/mealKitModel");
const path = require("path");

router.get("/", (req, res) => {
  mealKitModel
    .find({})
    .exec()
    .then((data) => {
      let mealkits = data.map((mealkit) => mealkit.toObject());

      res.render("mealkits/mealkits", {
        title: "MealKits",
        mealObj: mealkitsUtil.getMealKitsByCategory(mealkits),
      });
    })
    .catch((err) => console.log(err));
});

router.get("/list", (req, res) => {
  if (!req.session?.user || req.session?.role != "data-clerk") {
    res.status(401).render("general/unauthorized", { title: "401" });
  } else {
    mealKitModel
      .find({})
      .sort({ title: "asc" })
      .exec()
      .then((data) => {
        let mealkits = data.map((mealkit) => mealkit.toObject());
        res.render("mealkits/list", {
          title: "List",
          mealkits: mealkits,
        });
      })
      .catch((err) => console.log(err));
  }
});

router.get("/add", (req, res) => {
  if (!req.session?.user || req.session?.role != "data-clerk") {
    res.status(401).render("general/unauthorized", { title: "401" });
  } else {
    res.render("mealkits/add", { title: "Add Mealkit" });
  }
});

router.post("/add", (req, res) => {
  let {
    title,
    includes,
    description,
    category,
    price,
    cookingTime,
    servings,
    imageUrl,
    featuredMealKit,
    rating,
  } = req.body;

  console.log(req.body);
  featuredMealKit = featuredMealKit === "on" ? true : false;
  /* title: string;
    includes: string;
    description: string;
    category: string;
    price: number;
    cookingTime: number;
    servings: number;
    imageUrl: string;
    rating: number;
    featuredMealKit: boolean;*/
  const newMealKit = new mealKitModel({
    title,
    includes,
    description,
    category,
    price,
    cookingTime,
    servings,
    rating,
    featuredMealKit,
  });

  newMealKit
    .save()
    .then((mealkitSaved) => {
      console.log(
        `MealKit ${mealkitSaved.title} has been added to the database.`
      );

      // Create a unique name for the picture, so that it can be stored in the static folder.
      const ImgFile = req.files.imageUrl;
      const uniqueName = `image-url-${mealkitSaved._id}${
        path.parse(ImgFile.name).ext
      }`;

      // Copy the image data to a file on the system.
      ImgFile.mv(`assets/images/${uniqueName}`)
        .then(() => {
          // Successful
          // Update the document so the profile pic is populated.
          mealKitModel
            .updateOne(
              {
                _id: mealkitSaved._id,
              },
              {
                imageUrl: `/images/${uniqueName}`,
              }
            )
            .then(() => {
              // Successfully updated document
              console.log("Updated the mealkit pic");
              mealKitModel
                .find({})
                .exec()
                .then((data) => {
                  let mealkits = data.map((mealkit) => mealkit.toObject());

                  res.render("mealkits/mealkits", {
                    title: "MealKits",
                    mealObj: mealkitsUtil.getMealKitsByCategory(mealkits),
                  });
                })
                .catch((err) =>
                  console.log("Unable to query database: " + err)
                );
            })
            .catch((err) => {
              console.log("Error updating document... " + err);
              res.redirect("/");
            });
        })
        .catch((err) => {
          console.log("Error updating the image Url " + err);
          res.redirect("/");
        });
    })
    .catch((err) => {
      console.log(`Error adding user to the database ... ${err}`);
      res.redirect("/");
    });
});

router.get("/remove/:id", (req, res) => {
  let id = req.params.id;

  mealKitModel
    .findOne({ _id: id })
    .exec()
    .then((data) => {
      res.render("mealkits/remove", { title: "Removing", mealkit: data });
    })
    .catch((err) => console.log("Unable to query database: " + err));
});

router.post("/remove/:id", (req, res) => {
  let id = req.params.id;
  mealKitModel
    .deleteOne({ _id: id })
    .then(() => {
      console.log("Deleted the mealKit document for: " + id);

      mealKitModel
        .find({})
        .exec()
        .then((data) => {
          let mealkits = data.map((mealkit) => mealkit.toObject());

          res.render("mealkits/list", {
            title: "List",
            mealkits: mealkits,
            list: true
          });
        })
        .catch((err) => console.log("Unable to query database: " + err));
    })
    .catch((err) => {
      console.log(
        "Couldn't delete the mealKit document for: " + id + "\n" + err
      );
      res.redirect("/");
    });
});

router.get("/edit/:id", (req, res) => {
  let id = req.params.id;

  res.render("mealkits/edit", { title: "Editing" });
});

router.post("/edit/:id", (req, res) => {});

module.exports = router;
