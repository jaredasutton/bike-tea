const {
  getOneById,
  getAllForUserId
} = require("../controllers/pathMapCntrlr.js");
const router = require("express").Router();

router.get("/:_id", getOneById);
router.get("/", getAllForUserId);

module.exports = router;
