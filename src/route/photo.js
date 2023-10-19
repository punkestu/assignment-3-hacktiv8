const {isAuth} = require("../middleware/auth");
const {createPhoto, getAllPhoto, getPhotoById} = require("../controller/photo");
const router = require("express").Router();

router.post("/", isAuth, createPhoto);
router.get("/", isAuth, getAllPhoto);
router.get("/:id", isAuth, getPhotoById);

module.exports = router;