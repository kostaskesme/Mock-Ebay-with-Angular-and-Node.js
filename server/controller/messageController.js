var Message = require('../models/message');

//get all messages by sender
exports.getAllMessagesBySender = function (req, res) {
  Message.find({ sender: req.params.id }, (err, messages) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Could not get messages' });
      console.log(err);
    }
    else
      res.status(200).json({ found: true, result: messages });
  });
}

//get all messages by receiver
exports.getAllMessagesByReceiver = function (req, res) {
  Message.find({ receiver: req.params.id }, (err, messages) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Could not get messages' });
      console.log(err);
    }
    else
      res.status(200).json({ found: true, result: messages });
  });
}

//post new message
exports.postMessage = function (req, res) {
  var newMessage = new Message(req.body);
  newMessage.save()
    .then(messageFromdb => {
      res.status(200).json({ registered: true, messageId: messageFromdb._id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ register: false, message: 'Error saving message to db' });
    });
}

//delete message by id
exports.deleteMessageById = function (req, res) {
  Message.findByIdAndRemove({ _id: req.params.id }, (err, message) => {
    if (err) {
      res.status(400).send({ error: `Message with id:${req.params.id} not found!` });
      console.log(err);
    }
    else
      res.json({ done: true, message: 'Removed successfully' });
  });
}
