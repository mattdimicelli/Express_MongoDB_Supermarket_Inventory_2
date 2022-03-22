#! /usr/bin/env node

console.log('This script populates some test items, iteminstances, and customers to the database.'  
+ 'Specify the database as an arg - eg.: populatedb.mjs mongodb+srv://cooluser:coolpassword@cluster'
+ '0a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    process.exit(1);
}

import Item from './models/Item.js';
import Department from './models/Department.js';
import mongoose from 'mongoose';
import chalk from 'chalk';

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

let items = [];
let departments = [];

async function itemCreate({name, department, details = null, pricePerUnit = null, 
    pricePerPound = null, brand = null, stockUnits = null, stockPounds = null }) {
  let itemInfo = { name, department };
  if (details !== null) itemInfo.details = details;
  if (pricePerUnit !== null) itemInfo.pricePerUnit = pricePerUnit;
  if (pricePerPound !== null) itemInfo.pricePerPound = pricePerPound;
  if (brand !== null) itemInfo.brand = brand;
  if (stockUnits !== null) itemInfo.stockUnits = stockUnits;
  if (stockPounds !== null) itemInfo.stockPounds = stockPounds;

  const item = new Item(itemInfo);
  const savedItem = await item.save();
  console.log(chalk.blue('New Item: ' + savedItem));
  items.push(savedItem);
  return savedItem;
}

async function departmentCreate(name, supervisor, extension) {
  const department = new Department({ name, supervisor, extension });
  const savedDepartment = await department.save();
  console.log(chalk.red('New Department: ' + savedDepartment));
  departments.push(savedDepartment);
  return savedDepartment;
}

function createItems() {
  const [produce, meatAndSeafood, beerAndWine, healthAndBeauty, deliPreparedFoods, frontEnd,
    floral, cafe, bakery, frozen, dairy, beverages, cannedGoods, bakingGoods, cleaning,
    paperGoods] = departments;
  return Promise.all([
    itemCreate({name: 'apple, gala', department: produce, pricePerPound: 0.83, }),
    itemCreate({name: 'grapes', department: produce, pricePerPound: 1.28 }),
    itemCreate({name: "Reynolds Wrap, HEAVY DUTY", department: paperGoods, 
      details: '50 sq ft', pricePerUnit: 3.97, brand: 'Reynolds'}),
    itemCreate({name: 'Talenti Gelato, chocolate peanut butter cup', department: frozen, 
      pricePerUnit: 4.98, brand: 'Talenti',}),
    itemCreate({name: "Crunchy Breaded Fish Sticks", department: frozen, pricePerUnit: 6.48, 
      brand: "Gorton's" }),
    itemCreate({name: 'Lactaid 1% Calcium Fortified', department: dairy, pricePerUnit: 3.89, 
      brand: 'Lactaid' }),
    itemCreate({name: 'mussels', department: meatAndSeafood, details: 'wild caught', 
      pricePerPound: 4.99, stockPounds: 17 }),
    itemCreate({name: 'Colgate Total Advanced Whitening Toothpaste', stockUnits: 10,
      department: healthAndBeauty, details: '6.4oz', pricePerUnit: 3.98, brand: 'Colgate'})
  ]);
}

function createDepartments() {
  return Promise.all([
    departmentCreate( 'Produce', 'Tomas Hassan', 101),
    departmentCreate( 'Meat and Seafood', 'George Foreman', 102),
    departmentCreate( 'Beer and Wine', 'Sam Adams', 103),
    departmentCreate( 'Health and Beauty', 'Dr. Fauci', 104),
    departmentCreate( 'Deli/PreparedFoods', 'Uri Goldstein', 105),
    departmentCreate( 'Front End', 'Guy Smith', 106),
    departmentCreate( 'Floral', 'Poison Ivy', 107),
    departmentCreate( 'Cafe', 'Don Juan', 108),
    departmentCreate( 'Bakery', 'Mrs. Fields', 109),
    departmentCreate( 'Frozen', 'Mr. Freeze', 110),
    departmentCreate( 'Dairy', 'Milky Butterkins', 111),
    departmentCreate( 'Beverages', 'Yoo Hoo', 112),
    departmentCreate( 'Canned Goods', 'Joe Campbell', 113),
    departmentCreate( 'Baking Goods', 'Mrs. Fields', 109),
    departmentCreate( 'Cleaning', 'Joe Dirt', 114),
    departmentCreate( 'Paper Goods', 'Mike', 115),
  ]);
}



(async function populateDb() {
  try {
    await createDepartments();
    console.log(chalk.magenta('Departments: ' + departments));
    await createItems();
    console.log(chalk.green('Items: ' + items));
    console.log('First item:');
    console.log(items[0]);
    console.log(chalk.blue(`departments list length: ${departments.length}`));
    console.log(chalk.blue(`items list length: ${items.length}`));
  }
  catch(err) {
    console.error('FINAL ERROR: ' + err);
  }
  mongoose.connection.close();
})();



  