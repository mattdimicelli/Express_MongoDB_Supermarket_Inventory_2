const Department = require('../models/Department.js');
const Item = require('../models/Item.js');
const mongoose = require('mongoose');


// Display list of all departments in the supermarket
exports.departmentsGet = async (req, res, next) => {
    try {
        const depts = await Department.find({}).sort({ 'name': 'asc' }).exec();
        res.render('departments', { depts, title: 'All Departments' });
    }
    catch(err) {
        next(err);
    }
}

// Display details for an individual department
exports.departmentGet = async (req, res, next) => {
    try {
        const depts = await Department.find({}).sort({ 'name': 'asc' }).exec();
        const id = mongoose.Types.ObjectId(req.params.id);
        const dept = await Department.findById(id).exec();
        const items = await Item.find({department: id}).sort({ 'name': 'asc' }).exec();
        res.render('department', { depts, dept, title: `Department: ${dept.name}`, items });
    }
    catch(err) {
        next(err);
    }
}

// Handle department update form on GET
exports.departmentUpdateGet = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dept = await Department.findById(id).exec();
        const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
        res.render('update-dept', {depts, title: `Update Department: ${dept.name}`, dept});
    }
    catch(err) {
        next(err);
    }
}

// Handle department create form on GET
exports.departmentCreateGet = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const dept = await Department.findById(id).exec();
        const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
        res.render('create-dept', {depts, title: 'Create Department', dept});
    }
    catch(err) {
        next(err);
    }
}

// Handle department delete page on GET
exports.departmentDeleteGet = async (req, res, next) => {
    try {
        const depts = await Department.find({}, 'name url').sort({ 'name': 'asc' }).exec();
        const id = mongoose.Types.ObjectId(req.params.id);
        const dept = await Department.findById(id).exec();
        const items = await Item.find({department: id}).sort({ 'name': 'asc' }).exec();
        res.render('delete-dept', {depts, title: `Delete Department: ${dept.name}`, dept, items});
    }
    catch(err) {
        next(err);
    }
}

// Handle department update form on POST
exports.departmentUpdatePost = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const {name, supervisor, extension} = req.body;
        await Department.findByIdAndUpdate(
            id, {name, supervisor, extension}, {runValidators: true}
            ).exec();
        res.redirect(`/departments/${req.params.id}`);
    } 
    catch(err) {
        next(err);
    }
}

// Handle department create form on POST
exports.departmentCreatePost = async (req, res, next) => {
    try {
        const {name, supervisor, extension} = req.body;
        const dept = new Department({ name, supervisor, extension });
        const savedDept = await dept.save();
        res.redirect(savedDept.url);
    }   
    catch(err) {
        next(err);
    }
}

// Handle department delete page on POST
exports.departmentDeletePost = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        await Department.findByIdAndDelete(id);
        res.redirect('/departments');
    }
    catch(err) {
        next(err);
    }
}

