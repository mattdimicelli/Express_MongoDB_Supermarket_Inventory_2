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
    _departmentId: {
        // this value is provided by MongoDB, not the user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',  // the name of the model to reference
    },
    department: {
        type: String,
        required: true,
        enum: [
            'PRODUCE', 'MEAT AND SEAFOOD', 'BEER AND WINE', 'HEALTH AND BEAUTY',
            'DELI/PREPARED FOODS', 'FRONT END', 'FLORAL', 'CAFE', 'BAKERY', 'FROZEN', 'DAIRY', 
            'BEVERAGES', 'CANNED GOODS', 'BAKING GOODS', 'CLEANING', 'PAPER GOODS'
        ],
        trim: true,
        set: n => n.toUpperCase(),
        validate: noEmptyFieldValidator,
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
    return '/inventory/item' + this._id;
});

module.exports = model('Item', itemSchema);