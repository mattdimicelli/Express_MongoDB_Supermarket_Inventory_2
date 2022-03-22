#! /usr/bin/env node

console.log('This script populates some test items, iteminstances, and customers to the database.'  
+ 'Specify the database as an arg - eg.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a'
+ '9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    process.exit(1);
}

const Item = require('./models/Item.js');
const Department = require('./models/Department.js');
const mongoose = require('mongoose');

var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

const items = [];
const departments = [];

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
  console.log('New Item: ' + savedItem);
  items.push(savedItem);
  return savedItem;
}

async function departmentCreate(name, supervisor, extension) {
  const department = new Department({ name, supervisor, extension });
  const savedDepartment = await department.save();
  console.log('New Department: ' + savedDepartment);
  departments.push(savedDepartment);
  return savedDepartment;
}

function createItems() {
  return Promise.all([
    itemCreate({name: 'apple, gala', department: 'Produce', pricePerPound: 0.83, }),
    itemCreate({name: 'grapes', department: 'Produce', pricePerPound: 1.28 }),
    itemCreate({name: "Reynolds Wrap, HEAVY DUTY", department: 'Paper Goods', 
      details: '50 sq ft', pricePerUnit: 3.97, brand: 'Reynolds'}),
    itemCreate({name: 'Talenti Gelato, chocolate peanut butter cup', department: 'Frozen', 
      pricePerUnit: 4.98, brand: 'Talenti',}),
    itemCreate({name: "Crunchy Breaded Fish Sticks", department: 'Frozen', pricePerUnit: 6.48, 
      brand: "Gorton's" }),
    itemCreate({name: 'Lactaid 1% Calcium Fortified', department: 'Dairy', pricePerUnit: 3.89, 
      brand: 'Lactaid' }),
    itemCreate({name: 'mussels', department: 'Meat and Seafood', details: 'wild caught', 
      pricePerPound: 4.99, stockPounds: 17 }),
    itemCreate({name: 'Colgate Total Advanced Whitening Toothpaste', stockUnits: 10,
      department: 'Health and Beauty', details: '6.4oz', pricePerUnit: 3.98, brand: 'Colgate'})
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
    await createItems();
    console.log('Items: ' + items);
    await createDepartments();
    console.log('Departments: ' + departments);
    console.log('First item URL:');
    console.log(items[0].url);
  }
  catch(err) {
    console.error('FINAL ERROR: ' + err);
  }
  mongoose.connection.close();
})();



  