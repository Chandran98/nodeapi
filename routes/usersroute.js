const express = require("express");
const {
  getuserdata,
  createuser,
  deleteuserById,
  updateuserById,
  getuserById,
  blockUser,
  unBlockUser,
} = require("../controllers/user.controller");
const { validateToken } = require("../middlewares/tokenvalidation");
const { mailController } = require("../helpers/mailer");

const router = express.Router();
// router.use(validateToken);
router.route("/sendemail").post(mailController);
router.route("/").get(getuserdata).post(createuser);

router
  .route("/:id")
  .get(getuserById)
  .post(updateuserById)
  .delete(deleteuserById);
router.route("/blockUser/:id").post(blockUser);
router.route("/unBlockUser/:id").post(unBlockUser);

module.exports = router;
