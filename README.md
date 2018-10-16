# Store_Manager_develop

### Build Status

[![Build Status](https://travis-ci.org/julietezekwe/Store_Manager_develop.svg?branch=develop)](https://travis-ci.org/julietezekwe/Store_Manager_develop)
[![Coverage Status](https://coveralls.io/repos/github/julietezekwe/Store_Manager_develop/badge.svg?branch=ft-travis-CI-161205470)](https://coveralls.io/github/julietezekwe/Store_Manager_develop?branch=ft-travis-CI-161205470)
[![Maintainability](https://api.codeclimate.com/v1/badges/675204b94a8eef52f333/maintainability)](https://codeclimate.com/github/julietezekwe/Store_Manager_develop/maintainability)

Store Manager is a web application that helps store owners manage sales and product inventory

## Table of Contents
1. <a href="#hosted-app">Link to Hosted App</a>
2. <a href="#pivotal-tracker">Link to Pivotal Tracker</a>
3. <a href="#tech-stack-used">Tech Stack Used</a>
4. <a href="#application-features">Application Features</a>
5. <a href="#how-to-use">How To Use</a>
6. <a href="#author">Author</a>
7. <a href="#license">License</a>


## Link to Hosted App
* [API link](https://store-manager-develop.herokuapp.com/)

## Templates
* UI templates are hosted on Github pages [visit here](https://julietezekwe.github.io/store_manager_develop/ui/login.html)


## Link to Pivotal Tracker

* https://www.pivotaltracker.com/n/projects/2203034

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Body-parser](https://www.npmjs.com/package/body-parser)
- [Express-Validator](https://www.npmjs.com/package/express-validator)
- [Babel](https://babeljs.io) 
- [Eslint](https://eslint.org/)
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) - - [style guide](https://github.com/airbnb/javascript)


## Testing tools
* [Mocha](https://mochajs.org/) - A Javascript test framework.
* [Chai](http://chaijs.com) - Assertion library.
* [nyc](https://github.com/istanbuljs/nyc) - A reporting tool


## API Documentation



## Application Features

* Admin can add a product
* Admin/store attendant can get all products
* Admin/store attendant can get a specific product
* Store attendant can add a sale order
* Admin can get all sale order records
* Store attendant can view owned records


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/julietezekwe/Store_Manager_develop

# Go into the repository
$ cd store_Manager_develop

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the .env.example file


# Run the app
$ npm start
```

## API endpoints
```
POST Request -> localhost:8080/api/v1/auth/createUser
POST Request -> localhost:8080/api/v1/auth/login
GET Request -> localhost:8080/api/v1/auth/:userId
GET Request -> localhost:8080/api/v1/auth/users
POST Request -> localhost:8080/api/v1/products
GET Request ->  localhost:8080/api/v1/products
GET Request ->  localhost:8080/api/v1/products/:productId    
GET Request ->  localhost:8080/api/v1/sales
POST Request ->  localhost:8080/api/v1/sales
GET Request -> localhost:8080/api/v1/sales/:saleId
GET Request -> localhost:8080/api/v1/user/sales
```

## Tests

* To run tests, navigate to the project's root directory
* After installation, run `npm run test`

## Author

Chidimma Juliet Ezekwe


## License

ISC

---
