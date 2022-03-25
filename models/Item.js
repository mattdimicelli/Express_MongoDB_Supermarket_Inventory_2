const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const noEmptyFieldValidator = [input => (input.trim().length) > 0, '{PATH} cannot be empty'];
const onlyWholeNumbersValidator = [
    num => (num % 1 === 0) && (num >= 0), 
    '{PATH} must be a whole number greater than or equal to zero'
];

let itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        validate: noEmptyFieldValidator
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },     
    details: {
        type: String,
        trim: true,
        uppercase: true,
        maxLength: 100,
    },
    pricePerUnit: {
        type: Number,
        min: 0,
    }, 
    pricePerPound: {
        type: Number,
        min: 0,
    },
    brand: {
        type: String,
        trim: true, 
        uppercase: true,
    },
    stockUnits: {
        type: Number,
        validate: onlyWholeNumbersValidator,
    },
    stockPounds: {
        type: Number,
        validate: onlyWholeNumbersValidator,
    }
});

itemSchema.virtual('url').get(function() {
    return '/inventory/item/' + this._id;
});

module.exports = model('Item', itemSchema);