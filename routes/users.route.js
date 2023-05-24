const express = require("express");
const {
  getuserdata,
  createuser,
  deleteuserById,
  updateuserById,
  getuserById,
} = require("../controllers/user.controller");
const { validateToken } = require("../middlewares/tokenvalidation");

const router = express.Router();
router.use(validateToken);  
router.route("/").get(getuserdata).post(createuser);

router
  .route("/:id")
  .get(getuserById)
  .put(updateuserById)
  .delete(deleteuserById);

module.exports = router;
