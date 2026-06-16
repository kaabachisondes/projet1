const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Instructor",
        required:true
    },
    content:{
        type:String,
    },
    price:{
        type:Number,
      
    },
    // cela definit un tableau de tags pour chaque cour et chaque tag esr de type string
    tags:[{
        type:String,
       
    }]
    
},);
module.exports=mongoose.model("Course",courseSchema);