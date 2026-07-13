require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("./models/Admin");


const createAdmin = async () => {

    try {


        await mongoose.connect(
            process.env.MONGODB_URI
        );


        console.log(
            "MongoDB connected"
        );



        const existingAdmin = await Admin.findOne({

            username:"moxxie"

        });



        if(existingAdmin){

            console.log(
                "Admin already exists"
            );

            process.exit();

        }



        const hashedPassword = await bcrypt.hash(

            "11JANUARY,2010",

            10

        );



        await Admin.create({

            username:"moxxie",

            password:hashedPassword

        });



        console.log(
            "Admin created successfully"
        );


        process.exit();


    }


    catch(error){

        console.error(
            "ADMIN CREATION FAILED:",
            error
        );

        process.exit(1);

    }


};


createAdmin();