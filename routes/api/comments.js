const express = require('express');
const moment = require('moment');
const shortid = require('shortid');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const commentData = require('../../data');

// create the db file if it doesn't exist
// seed the db with data.
const adapter = new FileSync('db.json', {
  defaultValue: { comments: commentData },
});

const db = lowdb(adapter);

const router = express.Router();

// get all comments
router.get('/', (req, res) => {
  const comments = db.get('comments').value();
  res.json(comments);
});

// get single comment
router.get('/:id', (req, res) => {
  const myComment = db
    .get('comments')
    .find({ id: req.params.id })
    .value();
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
    db.get('comments')
      .push(newComment)
      .write();
    // return all the comments (make sure new comment is included)
    res.status(201).json({ msg: 'Comment successfully added', comments: db.get('comments').value() });
  } else {
    // Bonus: if request has no body text (or text is empty) send proper response codes and maybe a message.
    res.status(400).json({ msg: 'Invalid message: please provide comment text' });
  }
});

// update a comment
router.patch('/:id', (req, res) => {
  if (!req.body.text) return res.status(400).json({ msg: 'Invalid message: please provide comment text' });

  // Check if the db has a comment with the id of req.params.id
  if (
    !db
      .get('comments')
      .find({ id: req.params.id })
      .value()
  ) {
    return res.status(404).json({ msg: 'Comment not found: Please provide a valid ID' });
  }

  db.get('comments')
    .find({ id: req.params.id })
    .assign({ text: req.body.text })
    .write();

  res.json(db.get('comments').value());
});

// delete a comment
router.delete('/:id', (req, res) => {
  // Check if the db has a comment with the id of req.params.id
  if (
    !db
      .get('comments')
      .find({ id: req.params.id })
      .value()
  ) {
    return res.status(404).json({ msg: 'Comment not found: Please provide a valid ID' });
  }

  db.get('comments')
    .remove({ id: req.params.id })
    .write();

  res.status(200).json({ msg: 'Comment successfully deleted', comments: db.get('comments').value() });
});

module.exports = router;
