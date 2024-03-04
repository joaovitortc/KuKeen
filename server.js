/*************************************************************************************
* WEB322 - 2241 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Joao Vitor Topanotti da Cunha
* Student ID    : jvtopanotti-da-cunha
* Course/Section: WEB322/NAA
*
**************************************************************************************/

const path = require("path");
const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts')
const mealkitsUtil = require('./modules/mealkit-util')

//set EJS
app.set("view engine", "ejs");
app.set("layout", "layouts/main")
app.use(expressLayouts);

//Assets folder public (static)
app.use(express.static(path.join(__dirname, "/assets")));

app.use(express.urlencoded({ extended: true }));
// Add your routes here
// e.g. app.get() { ... }
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "/views/home.html"));
// })

    app.get('/', (req, res) => {
         res.render("general/home", {title: "Home",featureMealKits: mealkitsUtil.getFeaturedMealKits(mealkitsUtil.getAllMealKits())});
    })

    app.get('/on-the-menu', (req, res) => {
        res.render("general/on-the-menu", {title: "On The Menu",mealObj: mealkitsUtil.getMealKitsByCategory(mealkitsUtil.getAllMealKits())});
    })

    app.get('/sign-up', (req, res) => {
        res.render("general/sign-up",
            {
            title: "Sign Up",
            validationMessages: {},
            values: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""}
            }
    )});
    

    app.get('/log-in', (req, res) => {
        res.render("general/log-in",  {
            title: "Log In",
            validationMessages: {password: []},
            values: {
                email: "",
                password: ""}
            });
    })

    app.get('/welcome', (req, res) => {
        res.render("general/welcome",  {title:"Welcome"});
            
    })

    app.post('/log-in', (req,res) => {

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

        if(valid) {
            res.redirect('/welcome');
        } else {
            res.render('general/log-in', 
            { 
              title: "Log In",
              validationMessages,
              values: req.body
            })
        }
    })

    app.post('/sign-up', (req,res) => {
        const { firstName, lastName, email, password } = req.body;
        let validationMessages = {password: []};
        let valid = true;
        const validEmailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName || firstName.length < 1 || typeof firstName !== 'string') {
            valid = false;
            validationMessages.firstName = "A valid first name must be provided.";
        }
        if (!lastName || lastName.length < 1 || typeof lastName !== 'string') {
            valid = false;
            validationMessages.lastName = "A valid last name must be provided.";
        }

        if (!email || email.length < 1) {
            valid = false;
            validationMessages.email = "An email address is required.";
        }
        else if (!validEmailRegExp.test(email)) {
            valid = false;
            validationMessages.email = "You must provide a valid email address.";
        }

        if (!password || password.length < 1) {
            valid = false;
            validationMessages.password.push("A password is required.");
        }
        else{ // having several errors at a time improve user experience
            if(password.length < 8 || password.length > 12) {
                valid = false;
                validationMessages.password.push("A password must have 8 to 12 characters");
            }
            if(!/.*[a-z]/.test(password)){
                valid = false;
                validationMessages.password.push("A password must have at least one lowercase character");
            }
            if(!/.*[A-Z]/.test(password)){
                valid = false;
                validationMessages.password.push("A password must have at least one uppercase character");
            }
            if(!/.*\d/.test(password)){
                valid = false;
                validationMessages.password.push("A password must have at least one number");
            }
            if(!/.*[\W_]/.test(password)){
                valid = false;
                validationMessages.password.push("A password must have at least one symbol [?!*&^%_$#@]");
            }
        }
        if(valid) {
            const sgMail = require("@sendgrid/mail");
            sgMail.setApiKey("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");
    
            const msg = {
                to: email,
                from: "kukeen.contact@gmail.com",
                subject: "Subject: Welcome to KuKeen - Your Culinary Adventure Awaits!",
                html:
                    `
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
                    The KuKeen Team
                    `
            };
    
            sgMail.send(msg)
                .then(() => {
                    res.cookie('page', 'signup')
                    res.redirect('/welcome');
                })
                .catch(err => {
                    console.log(err);
    
                    res.render("general/sign-up", {
                        title: "Sign Up",
                        values: req.body,
                        validationMessages
                    });
                });
        } else {
            res.render('general/sign-up', 
            { 
              title: "Sign up",
              validationMessages,
              values: req.body
            })
        }
    })

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});


// *** DO NOT MODIFY THE LINES BELOW ***

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);