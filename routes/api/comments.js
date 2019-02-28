const express = require('express');
const moment = require('moment');
const shortid = require('shortid');
const commentData = require('../../data');

const router = express.Router();

// get all comments
router.get('/', (req, res) => {
  res.json(commentData);
});

// get single comment
router.get('/:id', (req, res) => {
  const myComment = commentData.find(comment => comment.id === req.params.id);
  if (myComment) {
    res.json(myComment);
  } else {
    res.status(404).json({ msg: 'Invalid ID' });
  }
});

// create a comment
router.post('/', (req, res) => {
  if (req.body.text) {
    const newComment = {
      id: shortid.generate(),
      timestamp: moment().format(),
      text: req.body.text,
    };
    // add it to commentdata
    commentData.push(newComment);
    // return all the comments (make sure new comment is included)
    res.status(201).json({ msg: 'Comment successfully added', comments: commentData });
  } else {
    // Bonus: if request has no body text (or text is empty) send proper response codes and maybe a message.
    res.status(400).json({ msg: 'Invalid message: please provide comment text' });
  }
});

// update a comment
router.patch('/:id', (req, res) => {
  if (!req.body.text) res.status(400).json({ msg: 'Invalid message: please provide comment text' });
  const myComment = commentData.find(comment => comment.id === req.params.id);
  if (myComment) {
    myComment.text = req.body.text;
    res.json({ msg: 'Comment successfully added', comments: commentData });
  } else {
    res.status(404).json({ msg: 'Comment not found: Please provide a valid ID' });
  }
});

// delete a comment
router.delete('/:id', (req, res) => {
  const myComment = commentData.find(comment => comment.id === req.params.id);
  console.log(myComment);
  if (myComment) {
    const myIndex = commentData.indexOf(myComment);
    commentData.splice(myIndex, 1);
    res.json({ msg: 'Comment successfully deleted', comments: commentData });
  } else {
    res.status(404).json({ msg: 'Comment not found: Please provide a valid ID' });
  }
});

module.exports = router;
