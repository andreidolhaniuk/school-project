const express = require('express');
const auth = require('../../middleware/auth');

const {
  readLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} = require('../../controllers');

const router = express.Router();

router.get('/lessons', auth, readLessons);
router.post('/create-lesson', auth, createLesson);
router.put('/update-lesson/:id', auth, updateLesson);
router.delete('/delete-lesson/:id', auth, deleteLesson);

module.exports = router;
