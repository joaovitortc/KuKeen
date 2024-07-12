<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/joaovitortc/lease-protect">
    <img src="assets/images/store.svg" alt="Logo" width="160" height="160">
  </a>

  <h1 align="center">KuKeen</h1>

  <p align="center">
    A Full-stack Web Application
    <br />
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
    <li><a href="#file-structure">File Structure</a></li>
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

* ![MetaMask](https://img.shields.io/badge/MetaMask-e2761b?style=for-the-badge&logo=metamask&logoColor=white)
* ![Truffle Suite](https://img.shields.io/badge/Truffle-5e4c9a?style=for-the-badge&logo=truffle&logoColor=white)
* ![Ganache](https://img.shields.io/badge/Ganache-ff7043?style=for-the-badge&logo=ganache&logoColor=white)
* ![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
* ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
* ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
* ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448c5?style=for-the-badge&logo=cloudinary&logoColor=white)
* ![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)



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

### Log in system
The website employs *bcrypt.js* to securely hash and store user passwords in MongoDB. 
Only registered users are permitted to log in.

<img src="assets/log-in.png" alt="Logo" width="300">

### Url Protection
I utilized *express-session* to secure endpoints, ensuring that only logged-in users can access certain pages. This also prevents customers from accessing administrator pages.

<img src="assets/unauthorized.png" alt="Logo" >

### Admin
Administrators have the capability to create, delete, and edit meal kits through the admin panel.

<img src="assets/cru.png" alt="Logo" >

### Cart
Sessions are used to track user activity, maintaining the contents of the cart even if the user leaves the website. Users can also modify the quantity, add / remove items on their cart. By simulating the placement of an order, and email is sent to the registered user.

<img src="assets/cart.png" alt="Logo" >


<p align="right">(<a href="#readme-top">back to top</a>)</p>

</br>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

</br>

<!-- CONTACT -->
## Contact

- [Portfolio](https://joaocunha.onrender.com)
- [LinkedIn](https://www.linkedin.com/in/joaovitortc/)
- [GitHub](https://github.com/joaovitortc)

</br>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Special thanks to [Nick Romanidis](https://github.com/nick-romanidis) for guidance and support throughout the development process.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
</br>
</br>

