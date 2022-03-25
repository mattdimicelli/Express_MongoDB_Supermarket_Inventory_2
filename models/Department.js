const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const onlyWholeNumbersValidator = [
    num => (num % 1 === 0) && (num >= 0), 
    '{PATH} must be a whole number greater than or equal to zero'
];

let departmentSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        set: n => n.toUpperCase(),
    },
    supervisor: {
        type: String,
        trim: true,
        required: true,
        set: n => n.toUpperCase(),
    },
    extension: {
        type: Number,
        validate: onlyWholeNumbersValidator,
        required: true,
    }
});

departmentSchema.virtual('url').get(function(){
    return '/departments/' + this._id;
});

module.exports = model('Department', departmentSchema);