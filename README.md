Kukeen: Full-stack Web Application for Selling Mealkits
Overview
Kukeen is a full-stack web application designed for selling mealkits online. It allows users to sign up and log in as either customers or administrators. Customers can purchase mealkits, manage their cart, and perform other related actions, while administrators can perform CRUD (Create, Read, Update, Delete) operations on the mealkits inventory. The application follows the Model-View-Controller (MVC) pattern for efficient organization and separation of concerns.

Technologies Used
Node.js: JavaScript runtime for server-side development.
Express: Web application framework for Node.js, used to handle routing, middleware, and more.
MongoDB: NoSQL database engine used for storing application data.
bcrypt.js: Library for encrypting user passwords securely.
EJS (Embedded JavaScript): Templating language for generating HTML markup with JavaScript.
express-session: Middleware for managing user session state information.
body-parser: Middleware for handling form submissions.
express-fileupload: Middleware for processing multipart form data.
Bootstrap: CSS framework for designing responsive and attractive user interfaces.
Features
User Authentication: Secure authentication system using bcrypt.js and express-session for handling user login and registration.
Customer Functionality: Customers can browse and purchase mealkits, manage their cart, and perform checkout.
Admin Functionality: Administrators can perform CRUD operations on the mealkits inventory, including adding new mealkits, updating existing ones, and deleting items.
Session Management: User session state information is managed using express-session to provide a seamless and secure experience.
File Upload: express-fileupload is utilized to process multipart form data, such as uploading images for mealkits.
Responsive Design: Bootstrap is used for creating a responsive and visually appealing user interface that works well across different devices and screen sizes.
Installation
Clone the repository from GitHub: git clone https://github.com/your/repository.git
Navigate to the project directory: cd kukeen
Install dependencies: npm install
Set up MongoDB: Ensure MongoDB is installed and running on your system. Update the database configuration in the application accordingly.
Start the server: npm start
Open your web browser and navigate to http://localhost:3000 to access the application.
Usage
Sign up for an account as either a customer or an admin.
Log in using your credentials.
As a customer, browse the available mealkits, add items to your cart, and proceed to checkout.
As an admin, manage the mealkits inventory by performing CRUD operations.
Log out when finished.
Contributors
Your Name - Project Lead & Developer
License
This project is licensed under the MIT License.

Acknowledgements
Special thanks to Your Mentor's Name for guidance and support throughout the development process.


