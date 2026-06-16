const mongoose=require("mongoose");
const instructorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        trim:true
    },
    image:{
        type:String
    }


},
// on va trouver dans le model createdAt et updatedAt automatiquement
{timestamps:true}

);
module.exports=mongoose.model("Instructor",instructorSchema);