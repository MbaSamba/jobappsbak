const express = require("express");

const applicantController = require("../controller/profile");
const multerFile = require("../middleware/file");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post("", checkAuth, multerFile, applicantController.createProfile);

router.get("", applicantController.getAllProfiles);

router.get("/:id", applicantController.getSingleProfile);

module.exports = router;
