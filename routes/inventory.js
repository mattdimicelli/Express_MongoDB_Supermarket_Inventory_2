const express = require('express');
const { homeGet, itemsGet, itemGet, itemUpdateGet, itemCreateGet, itemDeleteGet,
     itemUpdatePost, itemCreatePost, itemDeletePost } 
     = require('../controllers/itemController.js');
const router = express.Router();


/* GET req to READ Inventory home page. */
router.get('/', homeGet);

// GET req to READ a list of all items
router.get('/items', itemsGet);

// GET req to CREATE an item
router.get('/item/create', itemCreateGet);

// GET req to READ a specific item
router.get('/item/:id', itemGet);

// POST req to CREATE an item
router.post('/item/create', itemCreatePost);

// GET req to UPDATE an item
router.get('/item/:id/update', itemUpdateGet);

// POST req to UPDATE an item
router.post('/item/:id/update', itemUpdatePost);

// GET req to DELETE an item
router.get('/item/:id/delete', itemDeleteGet);

// POST req to DELETE an item
router.delete('/item/:id/delete', itemDeletePost);

module.exports = router;
