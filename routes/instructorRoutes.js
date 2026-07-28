const express=require('express');
const router=express.Router();
const instructorController=require("../controllers/instructorController");

router.post("/register",instructorController.register);
router.post("/login",instructorController.login);
router.get("/all",instructorController.getAllInstructors);
router.get("/:id",instructorController.getInstructorById)
router.delete("/:id",instructorController.deleteInstructor);


 module.exports=router;