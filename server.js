require('dotenv').config();
const express = require('express');
const connectDB = require("./config/connect");

// creation de serveur de l'application
const app = express();
app.use(express.json());
//port
const port = process.env.PORT;
//connexion a la base de données
connectDB();
//routes de formateur
app.use('/instructor',require('./routes/instructorRoutes'));
//routes de cours
app.use('/course',require('./routes/courseRoutes'));
//demarage du serveur
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

});