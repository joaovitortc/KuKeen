# Kukeen: Full-stack Web Application

<p align="right">
  <a href="https://www.linkedin.com/in/joaovitortc/" target="_blank">
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Kick</title><path d="M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z"/></svg>
    <img src="https://img.shields.io/badge/visit_website?logo?" target="_blank" />
  </a>
</p>

## Overview
Kukeen is a full-stack web application designed to facilitate meal preparation with pre-packaged ingredients. It allows users to sign up and log in as either customers or administrators. Customers can purchase mealkits, manage their cart, and perform other related actions, while administrators can perform CRUD (Create, Read, Update, Delete) operations on the mealkits inventory. The application follows the Model-View-Controller (MVC) pattern for efficient organization and separation of concerns.

## Technologies Used
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web application framework for Node.js, used to handle routing, middleware, and more.
- **MongoDB**: NoSQL database engine used for storing application data.
- **bcrypt.js**: Library for encrypting user passwords securely.
- **EJS (Embedded JavaScript)**: Templating language for generating HTML markup with JavaScript.
- **express-session**: Middleware for managing user session state information.
- **body-parser**: Middleware for handling form submissions.
- **express-fileupload**: Middleware for processing multipart form data.
- **Bootstrap**: CSS framework for designing responsive and attractive user interfaces.

## Features
- **User Authentication**: Secure authentication system using bcrypt.js and express-session for handling user login and registration.
- **Customer Functionality**: Customers can browse and purchase mealkits, manage their cart, and perform checkout.
- **Admin Functionality**: Administrators can perform CRUD operations on the mealkits inventory, including adding new mealkits, updating existing ones, and deleting items.
- **Session Management**: User session state information is managed using express-session to provide a seamless and secure experience.
- **File Upload**: express-fileupload is utilized to process multipart form data, such as uploading images for mealkits.
- **Responsive Design**: Bootstrap is used for creating a responsive and visually appealing user interface that works well across different devices and screen sizes.

## Deployment
The project is fully deployed and accessible through the following endpoints:
- **Render**: https://kukeen.onrender.com/
- **Cyclic**: https://cute-pear-abalone-vest.cyclic.app <img style="width:20px;" src="https://cdn-icons-png.flaticon.com/512/7247/7247981.png"> Possibly down

## Usage
1. Sign up for an account as either a customer or an admin.
2. Log in using your credentials.
3. As a customer, browse the available mealkits, add items to your cart, and proceed to checkout.
4. As an admin, manage the mealkits inventory by performing CRUD operations.
5. Log out when finished.

## Contributors
- Joao Vitor Topanotti da Cunha

## Acknowledgements
Special thanks to [Nick Romanidis](https://github.com/nick-romanidis) for guidance and support throughout the development process.

---
