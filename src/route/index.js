const router = require("express").Router();

const photo = require("./photo");
router.use("/photo", photo);

module.exports = router;