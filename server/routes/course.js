const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

router.get("/", async (req, res) => {
  try {
    let foundCourses = await Course.find({})
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send({
      msg: "success",
      foundCourses,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/instructor/:_instructor_id", async (req, res) => {
  let { _instructor_id } = req.params;
  try {
    let coursesFound = await Course.find({ instructor: _instructor_id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(coursesFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/student/:_student_id", async (req, res) => {
  try {
    let { _student_id } = req.params;
    let coursesFound = await Course.find({ students: _student_id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(coursesFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let courseFound = await Course.find({
      title: new RegExp(name, "ig"),
    })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  let { error } = courseValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  if (req.user.isStudent()) {
    return res.status(400).send("講師才能發佈新課程");
  }

  let { title, description, price } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send({ msg: "success", savedCourse });
  } catch (e) {
    return res.status(500).send("無法創建新課程");
  }
});

router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).exec();
    course.students.push(req.user._id);
    await course.save();
    return res.send("註冊完成");
  } catch (e) {
    return res.status(500).send("無法註冊課程");
  }
});

router.patch("/:_id", async (req, res) => {
  let { error } = courseValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id });
    if (!courseFound) {
      return res.status(400).send("failed");
    }

    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        msg: "success",
        updatedCourse,
      });
    } else {
      return res.status(403).send("failed");
    }
  } catch (e) {
    return res.status(400).send(e);
  }
});
module.exports = router;
