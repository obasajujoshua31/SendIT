

[![Build Status](https://travis-ci.org/obasajujoshua31/SendIT.svg?branch=master)](https://travis-ci.org/obasajujoshua31/SendIT)

Maintainability
[![Maintainability](https://api.codeclimate.com/v1/badges/014ab05de2a59ad994f9/maintainability)](https://codeclimate.com/github/obasajujoshua31/SendIT/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/014ab05de2a59ad994f9/test_coverage)](https://codeclimate.com/github/obasajujoshua31/SendIT/test_coverage)


[![Coverage Status](https://coveralls.io/repos/github/obasajujoshua31/SendIT/badge.svg?branch=master)](https://coveralls.io/github/obasajujoshua31/SendIT?branch=master)

This is a send IT Repository for a SendIT Courier Project
It has three branches 
    - master
    - develop
    - gh-pages

    The develop branch implements the server side of the Project while the GH Pages implements the front-end part of the project.

    npm install - to install all dependencies

    npm run test - to check the test and nyc report also.
    npm run coverage - to send coverall reports to coveralls.io
    npm run build - To build the project with babel
    npm start - to start the development server on port 5200. 
    npm start will build the project and will also start the server on port 5200.

    
    - users route through /api/v1/users

    The users route implements the major activities the user can carry out in the website.
    GET /api/v1 - to get home page - it will return all the parcel orders.
    GET /api/v1/users/:userId/parcels - it will deliver all the parcels by the User by his ID
    GET /api/v1/parcels/:parceId - it wil return a specific order by ID from the params.
    POST /api/v1/parcels/ - Users can create Post 
    PUT /api/v1/parcels/:parcelId/cancel - Users can change the status of their order, they can cancel, it will update the status of their orders to cancel.
    

   
