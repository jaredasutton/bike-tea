const PathMap = require("../../db");

const retrieveById = _id => {
  return PathMap.findOne({ _id })
    .then(doc => doc)
    .catch(console.error);
};

const retrieveAllForUserId = userId => {
  return PathMap.find({ userId: Number(userId) })
    .then(docs => docs)
    .catch(console.error);
};

const insertPathMap = (newPathMap, _id) => {
  let updateCondition = { zoom: 100000000 };
  if (_id) {
    updateCondition = { _id };
  }
  return PathMap.findOneAndUpdate(
    updateCondition,
    { $set: newPathMap },
    {
      upsert: true,
      returnNewDocument: true
    }
  )
    .then(doc => doc)
    .catch(console.error);
};

module.exports = { retrieveById, retrieveAllForUserId, insertPathMap };
