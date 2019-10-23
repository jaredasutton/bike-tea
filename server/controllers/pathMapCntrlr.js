const {
  retrieveById,
  retrieveAllForUserId,
  insertPathMap
} = require("../models/PathMap.js");

const getOneById = (req, res) => {
  let { _id } = req.params;
  if (_id === undefined) {
    return res.status(404);
  }
  retrieveById(_id)
    .then(doc => res.status(200).send(doc))
    .catch(err => {
      console.error(err);
      res.status(504).send("Error retrieving map with that ID.");
    });
};

const getAllForUserId = (req, res) => {
  let { userId } = req.query;
  if (userId === undefined) {
    return res.status(404);
  }
  retrieveAllForUserId(userId)
    .then(docs => res.status(200).send(docs))
    .catch(err => {
      console.error(err);
      res.status(504).send("Error retrieving maps for that user ID.");
    });
};

const postNewPathMap = (req, res) => {
  let newPathMap = req.body;

  if (newPathMap === undefined) {
    return res.status(401);
  }
  if (newPathMap.zoom === undefined) {
    newPathMap.zoom = 12;
  }
  if (newPathMap.userId === undefined) {
    newPathMap.userId = 5;
  }
  insertPathMap(newPathMap)
    .then(doc => res.status(201).send(doc))
    .catch(err => {
      console.error(err);
      res.status(501).send("Error inserting new path map.");
    });
};

module.exports = { getOneById, getAllForUserId, postNewPathMap };
