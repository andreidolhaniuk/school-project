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
router.put('/update-lesson/:id', updateLesson);
router.delete('/delete-lesson/:id', deleteLesson);

module.exports = router;
