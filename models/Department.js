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
    },
    supervisor: {
        type: String,
        trim: true,
    },
    extension: {
        type: Number,
        validate: onlyWholeNumbersValidator,
    }
});

departmentSchema.virtual('url').get(function(){
    return '/departments/' + this._id;
});

module.exports = model('Department', departmentSchema);