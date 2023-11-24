var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user.controller");
const { upload } = require("../lib/upload");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post(
  "/forever-message-upload",
  upload.single("file"),
  UserController.uploadFile
);

router.get("/forever-message/:id", UserController.getMessageById);

module.exports = router;
