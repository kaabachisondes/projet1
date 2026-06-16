const express=require('express');
const mongoose=require('mongoose');
const Course=require('../models/Course');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Instructor=require('..//models/Instructor');

// create course
exports.createCourse=async(req,res)=>{
    try{
        console.log("body:",req.body);
        const course =new Course(req.body);
        console.log("cours avant l'enregistrement",course)
        await course.save();
        res.status(201).json({message:"Course created successfully"});
    }catch (error){
        console.error(error);
        res.status(500).json({message:"Server error"});

    }
    };

    // get all courses
    exports.getAllCourses=async(req,res)=>{
        try{
        const courses = await Course.find().populate("instructorId","name lastname email");
        res.status(200).json(courses);
        
    }catch(error){
            res.status(500).json({message:"Server error"})
        }
}
    //get course by id
    exports.getCourseById=async(req,res)=>{
        const course=await Course.findById(req.params.id).populate("instructorId","name lastname email");
        if(!course)
            return res.status(404).json({message:"Course not found"});
        res.status(200).json(course);
    }
    // get course by instructor
    exports.getCourseByInstructor=async(req,res)=>{
        try{console.log("get cour par instructorId", req.params.id);

            const instructorId = new mongoose.Types.ObjectId(req.params.id);
            
            const course = await Course.find({instructorId:instructorId});
            res.json(course);
        }catch(error){
            res.status(500).json({message:"Server error"})
        }
    }
    //update course
    exports.updateCourse=async(req,res)=>{
        try{
            const course=await Course.findByIdAndUpdate(req.params.id,req.body,{new:true})
            if(!course)
                return res.status(404).json({message:"Course not found"});
            res.status(200).json({message:"Course update successfully",course})
        }catch(error){
            res.status(500).json({message:"Server error"})
        }
    }
    // delete course
    exports.deleteCourse=async(req,res)=>{
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Course deleted successfully"});
    
    }


