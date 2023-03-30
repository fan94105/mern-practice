const router = require("express").Router();
const User = require("../models").user;
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  return res.send("success");
});

router.post("/register", async (req, res) => {
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { username, email, password, role } = req.body;
  const emailExist = await User.findOne({ email }).exec();
  if (emailExist) {
    return res.status(400).send("信箱已被註冊。。。");
  }

  try {
    let newUser = new User({ username, email, password, role });
    let savedUser = await newUser.save();
    return res.send({
      msg: "saved",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存使用者。。。");
  }
});

router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { email, password } = req.body;
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).send("找不到使用者。。。");
  }
  foundUser.comparePassword(password, (err, isMatch) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (isMatch) {
      const tokenObj = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET);
      return res.send({
        msg: "success",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

module.exports = router;
