const Item = require('../models/Item.js');
const Department = require('../models/Department.js');

// Display home page for inventory
exports.homeGet = async (req, res) => {
    const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
    res.render('inventory', { depts, title: 'Home' });
}

// Display list of all items in the supermarket
exports.itemsGet = async(req, res) => {
    const items = await Item.find({}).sort({'name': 'asc'}).populate('department').exec();
    const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
    console.log(items);
    res.render('items', {depts, items, title: 'All Items'});
}

// Display details for an individual item
exports.itemGet = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle item update form on GET
exports.itemUpdateGet = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle item create form on GET
exports.itemCreateGet = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}


// Handle item delete page on GET
exports.itemDeleteGet = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle item update form on POST
exports.itemUpdatePost = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle item create form on POST
exports.itemCreatePost = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle item delete page on DELETE
exports.itemDeletePost = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

