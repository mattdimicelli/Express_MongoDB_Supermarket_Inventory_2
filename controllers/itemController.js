const Item = require('../models/Item.js');
const Department = require('../models/Department.js');
const mongoose = require('mongoose');

// Display home page for inventory
exports.homeGet = async (req, res, next) => {
    try {
        const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
        res.render('inventory', { depts, title: 'Home' });
    }
    catch(err) {
        next(err);
    }
}

// Display list of all items in the supermarket
exports.itemsGet = async(req, res, next) => {
    try {
        const items = await Item.find({}).sort({'name': 'asc'}).populate('department').exec();
        console.log(items);
        const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
        res.render('items', {depts, items, title: 'All Items'});
    }
    catch(err) {
        next(err);
    }
}

// Display details for an individual item
exports.itemGet = async(req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const item = await Item.findById(id).populate('department').exec();
        const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
        res.render('item', {depts, item, title: item.name });
    }
    catch(err) {
        next(err);
    }
}

// Handle item update form on GET
exports.itemUpdateGet = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const item = await Item.findById(id).populate('department').exec();
        const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
        res.render('update-item', {depts, title: `Update ${item.name}`, item});
    }
    catch(err) {
        next(err);
    }
}

// Handle item create form on GET
exports.itemCreateGet = async(req, res, next) => {
    try {
        const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
        res.render('create-item', {depts, title: 'Create Item'});
    }
    catch(err) {
        next(err);
    }
}


// Handle item delete page on GET
exports.itemDeleteGet = async (req, res, next) => {
    try {
        const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
        const id = mongoose.Types.ObjectId(req.params.id);
        const item = await Item.findById(id).exec();
        res.render('delete-item', {depts, title: `Delete Item: ${item.name}`, item});
    }
    catch(err) {
        next(err);
    }
}

// Handle item update form on POST
exports.itemUpdatePost = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dept = await Department.findOne({name: req.body.dept});
        const updateDetails = {...req.body, department: dept};
        await Item.findByIdAndUpdate(id, updateDetails).exec();
        res.redirect(`/inventory/item/${req.params.id}`);
    }
    catch(err) {
        next(err);
    }
}

// Handle item create form on POST
exports.itemCreatePost = async (req, res, next) => {
    try {
        const dept = req.body.dept;
        const deptObj = await Department.findOne({name: dept});
        console.log(deptObj);
        const item = new Item({...req.body, department: deptObj});
        const savedItem = await item.save();
        res.redirect(savedItem.url);
    }
    catch(err) {
        next(err);
    }
}

// Handle item delete page on POST
exports.itemDeletePost = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        await Item.findByIdAndDelete(id);
        res.redirect('/inventory/items');
    }
    catch(err) {
        next(err);
    }
}

