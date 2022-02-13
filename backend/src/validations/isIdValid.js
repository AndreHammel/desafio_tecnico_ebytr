const { ObjectId } = require('mongodb');

module.exports = (id) => {
  try {
    ObjectId(id);
    return true;
  } catch (error) {
    return false;
  }
};
