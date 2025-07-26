const express = require('express')

const { getStudent, addStudent, deleteStudent, updateStudent } = require('../controllers/studentController')
const { protect, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/')
    .get(protect, authorize('super_admin', 'staff'), getStudent)
    .post(protect, authorize('super_admin', 'staff'), addStudent)
    
router.route('/:id')
    .delete(protect, authorize('super_admin', 'staff'), deleteStudent)
    .put(protect, authorize('super_admin', 'staff'), updateStudent)


module.exports = router