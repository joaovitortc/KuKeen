<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/joaovitortc/KuKeen">
    <img src="assets/images/store.svg" alt="Logo" width="160" height="160">
  </a>

  <h1 align="center">KuKeen</h1>

  <p align="center">
    A Full-stack Web Application
    <br />
    <br />
    <a href="https://kukeen.onrender.com"><strong>Visit the Websit »</strong></a>
    <br />
  </p>
</div>

<br /><br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#files">File Strucure</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="assets/images/kukeen.png" alt="Logo" >

Kukeen is a full-stack web application designed to facilitate meal preparation with pre-packaged ingredients. </br>

It allows users to sign up and log in as either customers or administrators. 
- Customers can purchase mealkits, manage their cart, and perform other related actions,
- Administrators can perform CRUD (Create, Read, Update, Delete) operations on the mealkits inventory. </br>

The application follows the Model-View-Controller (MVC) pattern for efficient organization and separation of concerns.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* ![EJS](https://img.shields.io/badge/EJS-026d3f?style=for-the-badge&logo=ejs&logoColor=white)
* ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## File Structure

```bash
KuKeen/
│
├── assets/
│   ├── css/         
│   ├── images/       
│   └── togglePassword.js       # Responsible for toggling the passsword visibility
│
├── controllers/
│   ├── cartController.js     
│   └── generalController.js  
│   └── loadDataController.js   # Endpoint responsible to restart the database (emergency recovery)
│   └── mealkitsController.js
│
├── modules/
│   ├── mealKitModel.js          
│   └── mealkitUtil.js
│   └── userModel.js        
│
├── views/
│   ├── general/                # Contain all the general views (home.ejs, cart.ejs, etc)
│   ├── layouts/
│       └── main.ejs            # Layout used in every page (using EJS-Layouts)
│   ├── mealkits/               # Contain all the mealkit's related views
│   ├── partials/
│       ├── footer.ejs
│       └── mealkits.ejs
│       └── navbar.ejs
│
├── .gitignore                  # Git ignore file
├── README.md                   # Project README file
└── server.js                   # Project Entry point
```

<!-- USAGE EXAMPLES -->
## Usage

This section outlines some of the features of the website.

# Log in system
The website employs *bcrypt.js* to securely hash and store user passwords in MongoDB. Only registered users are permitted to log in.
<img src="assets/log-in.png" alt="Logo" >

# Url Protection
I utilized *express-session* to secure endpoints, ensuring that only logged-in users can access certain pages. This also prevents customers from accessing administrator pages.

<img src="assets/unauthorized.png" alt="Logo" >

# Admin
Administrators have the capability to create, delete, and edit meal kits through the admin panel.

<img src="assets/cru.png" alt="Logo" >

# Cart
Sessions are used to track user activity, maintaining the contents of the cart even if the user leaves the website. Users can also modify the quantity of items in their cart.

<img src="assets/cart.png" alt="Logo" >


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

- [Portfolio](https://joaocunha.onrender.com)
- [LinkedIn](https://www.linkedin.com/in/joaovitortc/)
- [GitHub](https://github.com/joaovitortc)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Special thanks to [Nick Romanidis](https://github.com/nick-romanidis) for guidance and support throughout the development process.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

