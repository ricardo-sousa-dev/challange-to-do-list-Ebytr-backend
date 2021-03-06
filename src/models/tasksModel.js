const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createTaskModel = async (taskData) => {
  const db = await connect();

  await db.collection('tasks')
    .insertOne(taskData)

  return { ...taskData };
};

const getTasksModel = async (userId) => {
  const db = await connect();

  const tasks = await db.collection('tasks')
 .find({ userId }).toArray();

  return tasks;
};

const getTaskIdModel = async (idTask) => {
  // https: //mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html#objectid-isvalid
  // https: //mongodb.github.io/node-mongodb-native/2.2/api/ObjectID.html
  if (!ObjectId.isValid(idTask)) return null;

  const db = await connect();

  const task = await db.collection('tasks').findOne({ _id: ObjectId(idTask) });

  return task;
};

const updateTaskModel = async (idTask, changesTasks) => {
  const db = await connect();

  const { task, status } = changesTasks;

  await db.collection('tasks')
    .updateOne({
      _id: ObjectId(idTask),
    }, { $set: { task, status } });

  const updatedTask = await db.collection('tasks').findOne({ _id: ObjectId(idTask) });

  return updatedTask;
};

const deleteTaskModel = async (idTask) => {
  const db = await connect();

  const deletedTask = await db.collection('tasks').deleteOne({ _id: ObjectId(idTask) });

  return deletedTask;
};

module.exports = {
  createTaskModel,
  getTasksModel,
  updateTaskModel,
  deleteTaskModel,
  getTaskIdModel
};
