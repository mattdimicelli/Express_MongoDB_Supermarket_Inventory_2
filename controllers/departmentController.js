const Department = require('../models/Department.js');
const Item = require('../models/Item.js');
const mongoose = require('mongoose');


// Display list of all departments in the supermarket
exports.departmentsGet = async (req, res) => {
    const depts = await Department.find({}).sort({ 'name': 'asc' }).exec();
    res.render('departments', { depts, title: 'All Departments' });
}

// Display details for an individual department
exports.departmentGet = async (req, res) => {
    const depts = await Department.find({}).sort({ 'name': 'asc' }).exec();
    const id = mongoose.Types.ObjectId(req.params.id);
    const dept = await Department.findById(id).exec();
    console.log(dept._id);
    const items = await Item.find({department: id}).sort({ 'name': 'asc' }).exec();
    console.log(items);
    res.render('department', { depts, dept, title: `Department: ${dept.name}`, items });
}

// Handle department update form on GET
exports.departmentUpdateGet = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle department create form on GET
exports.departmentCreateGet = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle department delete page on GET
exports.departmentDeleteGet = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle department update form on POST
exports.departmentUpdatePost = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle department create form on POST
exports.departmentCreatePost = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

// Handle department delete page on DELETE
exports.departmentDeletePost = (req, res) => {
    res.send('NOT YET IMPLEMENTED');
}

