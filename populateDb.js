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

async function itemCreate({name = null, department = null, details = null, pricePerUnit = null, 
    pricePerPound = null, brand = null, stockUnits = null, stockPounds = null }) {
  let itemInfo = { name, department };
  if (details !== null) itemInfo.details = details;
  if (pricePerUnit !== null) itemInfo.pricePerUnit = pricePerUnit;
  if (pricePerPound !== null) itemInfo.pricePerPound = pricePerPound;
  if (brand !== null) itemInfo.brand = brand;
  if (stockUnits !== null) itemInfo.stockUnits = stockUnits;
  if (stockPounds !== null) itemInfo.stockPounds = stockPounds;

  const item = new Item(itemInfo);
  try {
    const savedItem = await item.save();
  }
  catch(err) {
      
  }
  console.log('New Item: ' + savedItem);
  items.push(savedItem);
}

// async function itemInstanceCreate({item = null, expiration = null, status = null, customer = null, dateOfSale = null }) {
//   let iteminstancedetail = {item, status};
//   if (expiration !== null) iteminstancedetail.expiration = expiration;
//   if (customer !== null) iteminstancedetail.customer = customer;
//   if (dateOfSale !== null) iteminstancedetail.dateOfSale = dateOfSale;
//   const iteminstance = new ItemInstance(iteminstancedetail);
  
//   const savedItemInstance = await iteminstance.save();
//   console.log('New ItemInstance: ' + iteminstance);
//   iteminstances.push(iteminstance);
//   return;
// }

// async function customerCreate({firstName = null, lastName = null, telephone = null, email = null, address = null}) {
//   let customerdetail = { firstName, lastName, telephone };
//   if (email !== null) customerdetail.email = email;
//   if (address !== null) customerdetail.address = address;
    
//   const customer = new Customer(customerdetail);    
//   const savedCustomer = await customer.save();
//   console.log('New Customer: ' + customer);
//   customers.push(customer);
//   return;
// }

async function createItems() {
      await itemCreate({name: 'apple, gala', department: 'Produce', pricePerPound: 0.83, });
      await itemCreate({name: 'grapes', department: 'Produce', description: null, pricePerUnit: null, pricePerPound: 1.28, brand: null});
      await itemCreate({name: "Reynolds Wrap, HEAVY DUTY", department: 'Paper Goods', description: '50 sq ft', pricePerUnit: 3.97, pricePerPound: null, brand: 'Reynolds'});
      await itemCreate({name: 'Talenti Gelato, chocolate peanut butter cup', department: 'Frozen', description: null, pricePerUnit: 4.98, pricePerPound: null, brand: 'Talenti',});
      await itemCreate({name: "Crunchy Breaded Fish Sticks", department: 'Frozen', description: null, pricePerUnit: 6.48, pricePerPound: null, brand: "Gorton's",});
      await itemCreate({name: 'Lactaid 1% Calcium Fortified', department: 'Dairy', description: null, pricePerUnit: 3.89, pricePerPound: null, brand: 'Lactaid',});
      await itemCreate({name: 'mussels', department: 'Meat and Seafood', description: 'wild caught', pricePerUnit: null, pricePerPound: 4.99, brand: null,});
      await itemCreate({name: 'Colgate Total Advanced Whitening Toothpaste', department: 'Health and Beauty', description: '6.4oz', pricePerUnit: 3.98, pricePerPound: null, brand: 'Colgate',});
      return;
}

function createItemInstances() {
  return Promise.all([
    itemInstanceCreate({item: items[0], status: 'Available' }),
    itemInstanceCreate({item: items[1], status: 'Available' }),
    itemInstanceCreate({item: items[2], status: 'Damaged' }),
    itemInstanceCreate({item: items[2], status: 'Available' }),
    itemInstanceCreate({item: items[2], status: 'Available' }),
    itemInstanceCreate({item: items[3], expiration: new Date().setMonth(11), status: 'Available' }),
    itemInstanceCreate({item: items[4], expiration: new Date().setFullYear(2022, 5), status: 'Available' }),
    itemInstanceCreate({item: items[5], expiration: new Date().setDate(29), status: 'Available' }),
    itemInstanceCreate({item: items[5], customer: customers[1], expiration: new Date().setDate(29), status: 'Sold and Reserved' }),
    itemInstanceCreate({item: items[6], expiration: new Date().setDate(20), status: 'Available' }),
  ]);
}

function createCustomers() {
  return Promise.all([
    customerCreate({firstName: 'Tokyo', lastName: 'Sexwale', telephone: '333-333-3333', address: 'South Africa'}),
    customerCreate({firstName: 'Beezow Doo-Doo', lastName: 'Zoppitybop-Bop-Bop', telephone: '666-666-6666', email: 'jeffreywilschke@yahoo.com'}),
  ]);
}


try {
  await createItems();
//   await createItemInstances();
//   await createCustomers();
  console.log('ItemInstances: ' + iteminstances);
}
catch(err) {
  console.error('FINAL ERROR: ' + err);
}
mongoose.connection.close();



  