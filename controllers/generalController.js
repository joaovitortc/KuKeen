const express = require("express");
const router = express.Router();
const mealkitsUtil = require("../modules/mealkit-util");
const userModel = require("../modules/userModel");

router.get("/", (req, res) => {
  res.render("general/home", {
    title: "Home",
    featureMealKits: mealkitsUtil.getFeaturedMealKits(
      mealkitsUtil.getAllMealKits()
    ),
  });
});

router.get("/sign-up", (req, res) => {
  res.render("general/sign-up", {
    title: "Sign Up",
    validationMessages: {},
    values: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
});

router.get("/log-in", (req, res) => {
  res.render("general/log-in", {
    title: "Log In",
    validationMessages: { password: [] },
    values: {
      email: "",
      password: "",
    },
  });
});

router.get("/welcome", (req, res) => {
  res.render("general/welcome", { title: "Welcome" });
});

router.post("/log-in", (req, res) => {
  const { email, password } = req.body;
  let validationMessages = {};

  let valid = true;

  if (!email || email.length < 1) {
    valid = false;
    validationMessages.email = "An email address is required.";
  }

  if (!password || password.length < 1) {
    valid = false;
    validationMessages.password = "A password is required.";
  }

  if (valid) {
    res.redirect("/welcome");
  } else {
    res.render("general/log-in", {
      title: "Log In",
      validationMessages,
      values: req.body,
    });
  }
});

router.post("/sign-up", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let validationMessages = { password: [] };
  let valid = true;
  const validEmailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName || firstName.length < 1 || typeof firstName !== "string") {
    valid = false;
    validationMessages.firstName = "A valid first name must be provided.";
  }
  if (!lastName || lastName.length < 1 || typeof lastName !== "string") {
    valid = false;
    validationMessages.lastName = "A valid last name must be provided.";
  }

  if (!email || email.length < 1) {
    valid = false;
    validationMessages.email = "An email address is required.";
  } else if (!validEmailRegExp.test(email)) {
    valid = false;
    validationMessages.email = "You must provide a valid email address.";
  }

  if (!password || password.length < 1) {
    valid = false;
    validationMessages.password.push("A password is required.");
  } else {
    // having several errors at a time improve user experience
    if (password.length < 8 || password.length > 12) {
      valid = false;
      validationMessages.password.push(
        "A password must have 8 to 12 characters"
      );
    }
    if (!/.*[a-z]/.test(password)) {
      valid = false;
      validationMessages.password.push(
        "A password must have at least one lowercase character"
      );
    }
    if (!/.*[A-Z]/.test(password)) {
      valid = false;
      validationMessages.password.push(
        "A password must have at least one uppercase character"
      );
    }
    if (!/.*\d/.test(password)) {
      valid = false;
      validationMessages.password.push(
        "A password must have at least one number"
      );
    }
    if (!/.*[\W_]/.test(password)) {
      valid = false;
      validationMessages.password.push(
        "A password must have at least one symbol [?!*&^%_$#@]"
      );
    }
  }
  if (valid) {
    const newUser = new userModel({ firstName, lastName, email, password });

    // validate email from database
    userModel
      .findOne({
        email,
      })
      .then((user) => {
        if (user) {
          //found email on database (user already registered)
          validationMessages.email = "This email is already in use!";

          res.render("general/sign-up", {
            title: "Sign Up",
            values: req.body,
            validationMessages,
          });
        } else {
        //user not registered AND valid data -> save to DB
          newUser
            .save()
            .then((userSaved) => {
              console.log(
                `User ${userSaved.firstName} has been added to the database.`
              );
              res.redirect("/welcome");
            })
            .catch((err) => {
              console.log(`Error adding user to the database ... ${err}`);
              res.render("users/register");
            });

          //Sending confirming email
          const sgMail = require("@sendgrid/mail");
          sgMail.setApiKey(process.env.SEND_GRID_API);

          sgMail
            .send(createMessage(email, firstName, lastName))
            .then(() => {
              res.redirect("/welcome");
            })
            .catch((err) => {
              console.log(err);

              res.render("general/sign-up", {
                title: "Sign Up",
                values: req.body,
                validationMessages,
              });
            });
        }
      })
      .catch((err) => {
        // Not able to query the database.
        errors.push("Unable to query the database: " + err);
        console.log(errors[0]);
      });
  } else {
    //invalid data from the user, return with error message(s)
    res.render("general/sign-up", {
      title: "Sign up",
      validationMessages,
      values: req.body,
    });
  }
});

function createMessage(email, firstName, lastName) {
  return (msg = {
    to: email,
    from: "kukeen.contact@gmail.com",
    subject: "Subject: Welcome to KuKeen - Your Culinary Adventure Awaits!",
    html: `
            Dear ${firstName} ${lastName}, <br><br>
            Welcome to KuKeen - your ultimate destination for top-quality food ingredients delivered straight to your doorstep!<br>
            We are thrilled to have you on board, and we can't wait for you to embark on a delicious culinary journey with us.<br><br>
            Here at KuKeen, we understand the importance of high-quality ingredients in creating extraordinary meals.<br>
            That's why we've curated a diverse selection of premium food items that cater to every palate and culinary preference.<br><br>
            Your KuKeen account is now active, and you can start exploring our extensive range of meal kits,
            sourced from the finest producers around the world. <br> Whether you're a seasoned chef or a passionate home cook,
            KuKeen is here to make your cooking experience exceptional. <br><br>
            Thank you for choosing KuKeen. Get ready to elevate your culinary creations! <br><br>
            Happy cooking!<br><br>
            Best regards,<br>
            Joao Cunha, KuKeen CEO
            `,
  });
}

module.exports = router;
