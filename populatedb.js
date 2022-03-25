/* eslint-disable no-unused-vars */

console.log(`
This script populates some test items and test departments to the database.  
Specify the database as an arg.

eg.: node populatedb.js` + ' mongodb+srv://cooluser:coolpassword@cluster0a9azn.mongodb.net/local_li'
+ 'brary?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    process.exit(1);
}

const Item = require('./models/Item.js');
const Department = require('./models/Department.js');
const mongoose = require('mongoose');
const chalk = require('chalk');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

let items = [];
let departments = [];

const departmentData = [
  { name: 'Produce', supervisor: 'Tomas Hassan', extension: 101},
  { name: 'Meat and Seafood', supervisor: 'George Foreman', extension: 102},
  { name: 'Beer and Wine', supervisor: 'Sam Adams', extension: 103},
  { name: 'Health and Beauty', supervisor: 'Dr. Fauci', extension: 104},
  { name: 'Deli/PreparedFoods', supervisor: 'Uri Goldstein', extension: 105},
  { name: 'Front End', supervisor: 'Guy Smith', extension: 106},
  { name: 'Floral', supervisor: 'Poison Ivy', extension: 107},
  { name: 'Cafe', supervisor: 'Don Juan', extension: 108},
  { name: 'Bakery', supervisor: 'Mrs. Fields', extension: 109},
  { name: 'Frozen', supervisor: 'Mr. Freeze', extension: 110},
  { name: 'Dairy', supervisor: 'Milky Butterkins', extension: 111},
  { name: 'Beverages', supervisor: 'Yoo Hoo', extension: 112},
  { name: 'Canned Goods', supervisor: 'Joe Campbell', extension: 113},
  { name: 'Baking Goods', supervisor: 'Mrs. Fields', extension: 109},
  { name: 'Cleaning', supervisor: 'Joe Dirt', extension: 114},
  { name: 'Paper Goods', supervisor: 'Mike', extension: 115},
];


(async function populateDb() {
  let depResults;
  let itemResults;
  let itemData;
  try {
    depResults = await createDepartments();

    depResults.forEach(result => {
      if (result.status === 'rejected') {
        console.error(chalk.red(result.reason));
      } 
      else {
        departments.push(result.value);
      }
    });

    let [produce, meatAndSeafood, beerAndWine, healthAndBeauty, deliPreparedFoods, frontEnd,
      floral, cafe, bakery, frozen, dairy, beverages, cannedGoods, bakingGoods, cleaning,
      paperGoods] = departments;
    
    itemData = [
      {name: 'Gala apple', department: produce, pricePerPound: 0.83, stockPounds: 55 },
      {name: 'grapes', department: produce, pricePerPound: 1.28, stockPounds: 30},
      {name: "Reynolds Wrap, HEAVY DUTY", department: paperGoods, 
          details: '50 sq ft', pricePerUnit: 3.97, brand: 'Reynolds', stockUnits: 40},
      {name: 'Talenti Gelato, chocolate peanut butter cup', department: frozen, 
          pricePerUnit: 4.98, brand: 'Talenti', stockUnits: 25},
      {name: "Crunchy Breaded Fish Sticks", department: frozen, pricePerUnit: 6.48, brand: "Gorton's",
        stockUnits: 20 },
      {name: 'Lactaid 1% Calcium Fortified', department: dairy, pricePerUnit: 3.89, brand: 'Lactaid', 
      stockUnits: 30 },
      {name: 'mussels', department: meatAndSeafood, details: 'wild caught', 
          pricePerPound: 4.99, stockPounds: 17 },
      {name: 'Colgate Total Advanced Whitening Toothpaste', stockUnits: 10,
          department: healthAndBeauty, details: '6.4oz', pricePerUnit: 3.98, brand: 'Colgate'},
      {name: 'Negra Modelo', department: beerAndWine, details: '12 pack, 355mL', stockUnits: 30,
      pricePerUnit: 8.50},
      {name: 'Boars Head Turkey', department: deliPreparedFoods, stockPounds: 15},
      {name: 'Time Magazine', department: frontEnd, stockUnits: 50},
    ];

    itemResults = await createItems(itemData);
  }
  catch(err) {
    console.error(chalk.red(`ERROR: ${err}`));
  }

  itemResults.forEach(result => {
    if (result.status === 'rejected') {
      console.error(chalk.red(result.reason));
    } 
    else {
      items.push(result.value);
    }
  });

  console.log(chalk.green('No. of departments successfuly saved to MongoDB: ' + departments.length 
  + '/' + departmentData.length));
  console.log(chalk.green('No. of items successfully saved to MongoDB: ' + items.length + '/'  +
    itemData.length));
  db.close();
})();

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
  return savedItem;
}

async function departmentCreate({name, supervisor, extension}) {
  const department = new Department({ name, supervisor, extension });
  const savedDepartment = await department.save();
  return savedDepartment;
}

function createItems(itemData) {
  return Promise.allSettled(itemData.map(item => itemCreate(item)));
}

function createDepartments() {
  return Promise.allSettled(departmentData.map(department => departmentCreate(department)));
}





  