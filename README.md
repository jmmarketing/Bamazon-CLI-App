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
