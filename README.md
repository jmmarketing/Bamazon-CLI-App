# Bamazon-CLI-App
UCSD - Homework 9 - Bamazon App

This is a node based app that works as an inventory management system for items in a Sql database. You are prompted with four(4) main options and a quit option:
- View products for sale
- View low inventory
- Add to Inventory
- Add new product
- Quit

## Video Walk Through
Watch Video - https://youtu.be/MPL4M3vypjw


## Required Modules
We have three main modules that are used:
```
var inquirer = require("inquirer");
var mysql = require("mysql");
require("dotenv").config();
```
## Required SQL Database
You will need to create your own SQL database to run this CLI App. Once you have it set up you will need to create your own  `.env` file with your database information. 

From there the app will grab the info from your file and connect to your data base. 

## How to start the App.

Open up your terminal (or bash). Navigate to the where you have saved the files. Once in the correct directory. Run the following code:
```
node bamazonmanager.js
```
From there you will be prompted with your options. 

## Database Schema
To see how to set up your database for this app, Use the [schema.sql](https://github.com/jmmarketing/Bamazon-CLI-App/blob/master/schema.sql). It will also give you dummy data to load into your table as well. 

### Contributor
This app was created by [Jeff McLean](http://jeffreymclean.com). 
