const Item = require('../models/Item.js');
const Department = require('../models/Department.js');

// Display home page for inventory
exports.homeGet = async (req, res) => {
    const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
    res.render('inventory', { depts: depts });
}

// Display list of all items in the supermarket
exports.itemsGet = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
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

