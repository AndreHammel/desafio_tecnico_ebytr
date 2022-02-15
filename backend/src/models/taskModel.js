const { ObjectId } = require('mongodb');
const connection = require('./connection');

const connectionCollection = async () =>
  connection().then((db) => db.collection(process.env.COLLECTION));

module.exports = {
  getAllTasksModel: async (objInfoTypeSort) => {
    const value = parseInt(objInfoTypeSort.value, 10);
    const { column } = objInfoTypeSort;
    const result = await (
      await connectionCollection()
    )
      .find()
      .sort({ [column]: [value] })
      .toArray();
    return result;
  },
  createTaskModel: async (taskObj) => {
    const { insertedId: id } = await (
      await connectionCollection()
    ).insertOne({ ...taskObj });
    return { id };
  },
  updateTaskModel: async (taskObj) => {
    const { _id, ...objTaskWithoutId } = taskObj;
    const result = await (
      await connectionCollection()
    ).updateOne(
      { _id: ObjectId(_id) },
      {
        $set: objTaskWithoutId,
      },
    );
    return result;
  },
  removeTaskModel: async (id) => {
    const result = await (await connectionCollection()).deleteOne({ _id: ObjectId(id) });
    return result;
  },
};
