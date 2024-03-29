const {NOTIFICATION: {
  CREATED_MESSAGE,
}} = require('../models/constants');
const {
  Http400,
} = require('../models/errors');
const MessageModel = require('../models/data/message-model');
const messageValidator = require('../validations/validators/message-validator');
const utils = require('../common/utils');

exports.getMessages = async (req, res) => {
  const messages = await MessageModel.where().limit(10).sort({createdAt: -1});

  res.json({
    items: messages,
    PORT: utils.getListenPort(),
  });
};

exports.createMessage = async (req, res) => {
  const checkResult = messageValidator(req.body);

  if (checkResult !== true) {
    throw new Http400('form validation failed', checkResult);
  }

  const {author, content} = req.body;
  const message = new MessageModel({
    author,
    content,
    socketId: req.socket.id,
  });

  await message.save();
  res.json({
    ...message.toJSON(),
    PORT: utils.getListenPort(),
  });
  res.emitNotification({
    event: CREATED_MESSAGE,
    data: {
      ...message.toJSON(),
      PORT: utils.getListenPort(),
    },
  });
};
