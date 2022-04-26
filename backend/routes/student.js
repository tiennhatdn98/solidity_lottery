const router = require("express").Router();
const studentController = require("../controllers/student");

router.post("/signup", studentController.signup);

module.exports = router;
