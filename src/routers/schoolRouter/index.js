const express = require('express');

const {
  readLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} = require('../../controllers');

const router = express.Router();

router.get('/lessons', readLessons);
router.post('/create-lesson', createLesson);
router.put('/update-lesson', updateLesson);
router.delete('/delete-lesson', deleteLesson);

module.exports = router;
