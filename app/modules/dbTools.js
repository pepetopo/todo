const schemas = require('./schemas');
const mongoose = require('mongoose');

const database = 'mongodb://dbuser:testpass@ds021356.mlab.com:21356/todolist';

function findUser(searchParam) {
  return schemas.User.find(searchParam, { username: 1 });
}

function findList(searchParam) {
  return schemas.List.find(searchParam);
}

function insertUser(insertData) {
  const newUser = new schemas.User(insertData);
  const newList = new schemas.List({ owner: insertData.username });
  return Promise.all([newUser.save(), newList.save()]);
}

function insertListItem(insertData) {
  return schemas.List.update(
    { owner: 'pepetopo' },
    { $push: { item: insertData } });
}

function updateListItem(id, insertData) {
  return schemas.List.update(
    {
      'item._id': new mongoose.Types.ObjectId(id),
      owner: 'pepetopo',
    },
    { $set: {
      'item.$.done': insertData.done,
      'item.$.content': insertData.content,
      'item.$.priority': insertData.priority,
    },
  });
}

function deleteListItem(id) {
  return schemas.List.update(
    { owner: 'pepetopo' },
    {
      $pull: {
        item: { _id: new mongoose.Types.ObjectId(id) },
      },
    }
  );
}

module.exports = {
  database,
  findUser,
  findList,
  insertUser,
  insertListItem,
  updateListItem,
  deleteListItem,
};