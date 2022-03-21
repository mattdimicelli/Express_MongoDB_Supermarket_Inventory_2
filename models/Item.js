const { Schema, model } = require('mongoose');

const noEmptyFieldValidator = [input => (input.trim().length) > 0, '{PATH} cannot be empty'];

const itemSchema = new Schema({
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
        trim: true,
        
    }
});

// Virtual for item's URL
ItemSchema.virtual('url').get(function() {
    return '/inventory/item' + this._id;
});

// Virtual for inventory of the item in question
ItemSchema.virtual('stock', {
    ref: 'ItemInstance',
    localField: '_id',
    foreignField: 'item',
});mongoose

// Virtual for number the number of the item instanes "in stock" (eg. available to be sold)
// This is the virtual that I'm having trouble writing
ItemSchema.virtual('numberAvailable', {
    ref: 'ItemInstance',
    localField: '_id',
    foreignField: 'item',
    options: {
        match: {
            status: 'Available',
        },
    },
    count: true,
});

ItemSchema.virtual('departmentURL').get(function() {
    let ending;
    switch(this.department) {
        case 'Meat and Seafood':
            ending = 'meat-seafood';
            break;
        case 'Beer and Wine':
            ending = 'beer-wine';
            break;
        case 'Health and Beauty':
            ending = 'health-beauty';
            break;
        case 'Deli/Prepared Foods':
            ending = 'deli-prepared-foods';
            break;
        case 'Front End':
            ending = 'front-end';
            break;
        case 'Canned/Jarred Goods':
            ending = 'canned';
            break;
        case 'Baking Goods':
            ending = 'baking';
            break;
        case 'Paper Goods':
            ending = 'paper';
            break;
        default: 
            ending = this.department.toLowerCase();
            break;
    }
    return '/inventory/' + ending;
});


export default mongoose.model('Item', ItemSchema);