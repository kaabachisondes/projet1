const express=require('express');
const mongoose=require('mongoose');
const Instructor=require('../models/Instructor');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// inscription d'un instructor
exports.register = async (req, res) => {
    try {
        console.log("body reçu:", req.body);

        const { name, lastname, email, password, bio } = req.body;

        if (!name || !lastname || !email || !password) {
            return res.status(400).json({ message: "Champs requis manquants" });
        }

        console.log("email cherché:", email);

        const existing = await Instructor.findOne({ email });

        if (existing) {
            return res.status(400).json({ message: "Instructor already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const instructor = new Instructor({
            name,
            lastname,
            email,
            password: hashedPassword,
            bio
        });

        await instructor.save();

        res.status(201).json({ message: "Instructor registered successfully" });

    } catch (error) {
        console.error("Erreur register:", error);   // ← affiche la vraie erreur dans le terminal backend
        res.status(500).json({ message: "Server error", error: error.message }); // ← visible aussi côté navigateur en dev
    }
};
//Login d'un instructor
exports.login=async(req,res)=>{
    try{
        const{
            email,password
        }=req.body;
        const instructor = await Instructor.findOne({email});
        if(!instructor)
            return res.status(404).json({message:"Instructor not found"});

            const isMatch =await bcrypt.compare(password,instructor.password);
            // si(if contient une seule instruction) et que cette instruction est une instruction de retour(return) alors on peut omettre les accolades
            if(!isMatch)
                return res.status(400).json({message:"Mot de passe incorrect"});
                const token=jwt.sign({id:instructor._id}
                    ,process.env.JWT_SECRET,{expiresIn:"1h"});
                    res.status(200).json({token});
                
                } catch(error){
                    res.status(500).json({message:"Server error"});
                
                }
    
            
        }
    
    

        // difference entre le travail avec try et catch et sans try et catch:
        //avec try et catch :on peur attraper les erreurs et les gerer de maniere appro 
        // tandis que sans try et catch: si une erreur se produit ,elle peur faire planter l'application ou laisser l'application dans un etat incoherent
        // get all formateurs
        // get all formateurs
    exports.getAllInstructors = async (req, res) => {
        try{
            console.log("route pour tous les formateurs");
        const instructors = await Instructor.find();
        console.log("nombres des formateur:", instructors.length);
        console.log("liste des formateurs:",instructors);
        res.status(200).json(instructors);
    }catch(error){
        console.error("error", error);
        res.status(500).json({message:"error server" });
    }}

    // get formateur byy id
    exports.getInstructorById = async (req, res) => {
    try {
        console.log("id reçu", req.params.id);

        const instructor = await Instructor.findById(req.params.id);

        console.log("resultat mongodb", instructor);

        if (!instructor) {
            return res.status(404).json({
                message: "Instructor not found"
            });
        }

        return res.status(200).json(instructor);

    } catch (error) {
        console.error("error", error);

        return res.status(500).json({
            message: "error server"
        });
    }
};

        // delelete un formateur
        exports.deleteInstructor=async(req,res)=>{
            await Instructor.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"Instructor deleted successfullys"});
        }
    
    
