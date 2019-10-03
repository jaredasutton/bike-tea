const PathMap = require("../../db");

const retrieveById = _id => {
  return PathMap.findOne({ _id })
    .then(doc => doc)
    .catch(console.error);
};

const retrieveAllForUserId = userId => {
  return PathMap.find({ userId })
    .then(docs => docs)
    .catch(console.error);
};

module.exports = { retrieveById, retrieveAllForUserId };
