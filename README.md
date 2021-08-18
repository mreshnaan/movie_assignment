# movie_assignment

##  Front end

is a full stack application user can login and register Add movie


#Getting Started
What things you need to install the software

	
- NPM - npm is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js.
	
- Node.js - Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.


### Installation

```sh
npm install
npm start
```
# Modules used
###  Dependencies

```sh
    "@material-ui/core": "^4.12.3",
    "@material-ui/icons": "^4.11.2",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.21.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.1.2"
```

### Technologies

	
 - Materialize -  an open-source project that features React components that implement Google’s Material Design
 - React Js- React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.	
 - Axios -  promise-based HTTP client that works both in the browser and in a Node.js environment.

##  Back end
Admin can crud movies and users

### Installation

```sh
npm install
nodemon
```
# Modules used
###  Dependencies

```sh
    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.12",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.13",
    "@types/jsonwebtoken": "^8.5.4",
    "@types/mongoose": "^5.11.97",
    "typescript": "^4.3.5"
```

### Usage endpoints

```sh
  http://localhost:8080/user
  http://localhost:8080/movie
```

### body
```sh
{
  
    "name":"The Tomorrow War",
    "imageURL":"https://upload.wikimedia.org/wikipedia/en/6/60/The_Tomorrow_War_%282021_film%29_official_theatrical_poster.jpg"
}

```

### Response
```sh
{
    "status": "Success",
    "statusCode": 201,
    "data": {
        "_id": "611d7c1770723f5adcfea2dd",
        "name": "The Tomorrow War",
        "imageURL": "https://upload.wikimedia.org/wikipedia/en/6/60/The_Tomorrow_War_%282021_film%29_official_theatrical_poster.jpg",
        "createdBy": "611aaf3c20a7f916fc777942",
        "createdAt": "2021-08-18T21:31:03.546Z",
        "updatedAt": "2021-08-18T21:31:03.546Z",
        "__v": 0
    },
    "message": "Movie Data Successfuly Inseted"
}

```

### Technologies

	
 - TypeScript -  TypeScript is designed for the development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript.
 - Mongoose - Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation,.
 - Expressjs -  Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. 
 - dotenv - Dotenv is a zero-dependency module that loads environment variables from a.env file into process.env. 
 - Cors - an HTTP -header based mechanism that allows a server to indicate any other origin s (domain, scheme, or port) than its own from which a browser should permit loading of 		resources.
 - bcrypt - bcrypt is a password-hashing function
 
 
Contributing
Pull requests are welcome. For major changes,
Thank you!!

