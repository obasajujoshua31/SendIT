[![Build Status](https://travis-ci.org/obasajujoshua31/SendIT.svg?branch=develop)](https://travis-ci.org/obasajujoshua31/SendIT) [![Maintainability](https://api.codeclimate.com/v1/badges/014ab05de2a59ad994f9/maintainability)](https://codeclimate.com/github/obasajujoshua31/SendIT/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/014ab05de2a59ad994f9/test_coverage)](https://codeclimate.com/github/obasajujoshua31/SendIT/test_coverage) [![Coverage Status](https://coveralls.io/repos/github/obasajujoshua31/SendIT/badge.svg?branch=master)](https://coveralls.io/github/obasajujoshua31/SendIT?branch=master)

## Send IT

This is a send IT Repository for a SendIT Courier Project

## Motivation

SendIT is a online courier service for sending parcel from one location to the other.

# Getting started

These instructions will get you a copy of the project up and running on your machine for development and testing purposes.
see deployment for notes on how to deploy the project on a live system.

## Prerequisites

What things you need to install the software and how to install them

1. A stable Node Software
2. A preferred Text editor of your choice
3. A Web Browser

## Installing

Carry out this on command line

1. npm clone https://github.com/obasajujoshua31/SendIT
2. cd SendIT
3. npm install
4. open the project with your preferred Code Editor

## Scripts

1. npm run createdb - to create user tables and parcel tables
2. npm run coverage - to generate coverage reports
3. npm run serve - to start the serve once the database is set up locally
4. npm run alterdb - to alter the parcel table - this includes columns for map details.

## Running the test

1. npm run test - to run test
2. npm run coverage - to generate test coverage report

Npm run test

1. Test the routes from api.test.js, auth.test.js and generate reports with NYC

## end points

1. GET /api/v1/parcels - Get all parcels
2. GET /api/v1/parcels/<parcel_id> - Get parcel by Parcel Id
3. GET /api/v1/users/<user_id>/parcels - Get parcel by User Id
4. GET /api/v1/users - Get all users - Only available to Admin
5. POST /api/v1/parcels - post new parcel

- parameters
  weight - Weight of the parcel
  weightMetric - Weight metric in Kg or g only
  from - parcel pick up location
  to - parcel destination
  parcelName - the name of the parcel
  estimatedDistance - distance estimated from google Map
  estimatedDuration - duration estimated from the google distance matrix
  estimatedCost - cost estimated from the calculation with the rate

6.  PUT /api/v1/parcels/<parcel_id>/cancel - to cancel a parcel order only by the user who created it.
7.  PUT /api/v1/parcels/<parcel_id>destination - to change the destination of a parcel order - this is only possible if the order is not cancelled or not delivered.
8.  PUT /api/v1/parcels/<parcel_id>presentLocation - to change the present Location of a parcel order - this is only possible by the a admin.
9.  PUT /api/v1/parcels/<parcel_id>status - to change the status of an order to either Transiting or Delivered. No access to Cancel by the Admin.

### Auth Routes

1. POST /api/v1/auth/signup - to sign up a user
   expected parameters -
   email - email of the person who intends to register if not exists
   password - set password of the person who intends to register
   firstName - the firstName of the person who intends to register
   lastName - the lastName of the person who intends to register
2. POST /api/v1/auth/login - to sign in a registered user
   expected parameters -
   email - email of the user
   password - the password of the user

## Account

1.  POST /api/v1/account/recovery -
    expected parameters -
    email - email of the registered user
    firstName - the first Name of the registered user
2.  PUT /api/v1/account/recovery -
    password - new password of the registered user
    passwordConfirmation - password confirmation for the registered user

## Features

1. Google places to help with address
2. Google distance Matrix to determine the distance between two points
3. Google Map to confirm pickUp location and expected destination
4. Email notification for updated parcel and status by Admin.

## Technologies

1. Express - The nodejs web application Framework used
2. Mocha - the framework used to generate test
3. JsonWebToken - for securing end points.
4. Dotenv - for installing environment variables
5. Airbnb - for linting code
6. SendGrid - Email service provider
7. pg - connecting to node postgress
8. babel - used to transpile to es5 javascript

## Author

Obasaju Joshua
