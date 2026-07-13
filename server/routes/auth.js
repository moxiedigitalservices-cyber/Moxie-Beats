const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Admin = require("../models/Admin");


// LOGIN
router.post("/login", async (req, res) => {

    try {


        const {
            username,
            password
        } = req.body;



        const admin = await Admin.findOne({

            username

        });



        if(!admin){

            return res.status(401).json({

                message:"Invalid username or password"

            });

        }



        const passwordMatch = await bcrypt.compare(

            password,

            admin.password

        );



        if(!passwordMatch){

            return res.status(401).json({

                message:"Invalid username or password"

            });

        }



        const token = jwt.sign(

            {
                id:admin._id,
                username:admin.username
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"1d"
            }

        );



        res.json({

            success:true,

            token,

            admin:{

                username:admin.username

            }

        });



    }


    catch(error){


        console.error(

            "LOGIN ERROR:",

            error

        );


        res.status(500).json({

            message:"Login failed"

        });


    }


});


module.exports = router;