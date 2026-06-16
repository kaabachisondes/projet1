const express=require("express")
const router=express.Router();
const courseController=require("../controllers/courseController");

router.post("/add",courseController.createCourse);
router.get("/all",courseController.getAllCourses)
router.get("/:id",courseController.getCourseById);
router.get("/instructor/:id",courseController.getCourseByInstructor);
router.put("/:id",courseController.updateCourse);
router.delete("/:id",courseController.deleteCourse);

module.exports=router;