const sectionController = require("../controllers/lineSectionWise");

const express = require("express");
const router = express.Router();

router.route("/lineSectionWise").get(sectionController.get);


module.exports = router;
