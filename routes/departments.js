const express = require('express');
const router = express.Router();
const { departmentsGet, departmentGet, departmentUpdateGet, departmentCreateGet, 
    departmentDeleteGet, departmentUpdatePost, departmentCreatePost, departmentDeletePost } 
    = require('../controllers/departmentController.js');

// GET req to READ a list of all departments
router.get('/', departmentsGet);

// GET req to READ a specific department
router.get('/:id', departmentGet);

// GET req to CREATE a department
router.get('/create', departmentCreateGet);

// POST req to CREATE a department
router.post('/create', departmentCreatePost);

// GET req to UPDATE a department
router.get('/:id/update', departmentUpdateGet);

// POST req to UPDATE a department
router.post('/:id/update', departmentUpdatePost);

// GET req to DELETE a department
router.get('/:id/delete', departmentDeleteGet);

// POST req to DELETE a department
router.delete('/:id/delete', departmentDeletePost);

module.exports = router;
