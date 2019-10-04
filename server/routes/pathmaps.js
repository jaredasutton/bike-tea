const {
  getOneById,
  getAllForUserId,
  postNewPathMap
} = require("../controllers/pathMapCntrlr.js");
const router = require("express").Router();

router.get("/:_id", getOneById);
router.get("/", getAllForUserId);
router.post("/", postNewPathMap);

module.exports = router;
