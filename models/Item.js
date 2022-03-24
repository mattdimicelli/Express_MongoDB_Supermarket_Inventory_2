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
        set: n => n.toUpperCase(),
        validate: noEmptyFieldValidator
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
    },     
    details: {
        type: String,
        trim: true,
        set: n => n.toUpperCase(),
    },
    pricePerUnit: {
        type: Number,
        match: [/^\d+(.\d{1,2})?$/, 'Must be in following format: 1.12, without dollar sign']
    }, 
    pricePerPound: {
        type: Number,
        match: [/^\d+(.\d{1,2})?$/, 'Must be in following format: 1.12, without dollar sign']
    },
    brand: {
        type: String,
        trim: true, 
        set: n => n.toUpperCase(),
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