const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const pool = require("../db-connection.js");
const { v4: uuidv4 } = require("uuid");
//const multer = require("multer");
//const upload = multer({ dest: "uploads/" });

// SIGNUP

router.post("/signup", async (req, res) => {

    const role = "Enrolee";

    const id = "CACLHA-CWD-"+ Date.now();

    const {firstname, lastname, email, phone, sex, dob, donb, doind, unit, password, faithtestimony} = req.body;

    try {

        // Check if email already exists
        const existingUser = await pool.query(
            "SELECT email FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });
        }
    
        const newUser = await pool.query(
        "INSERT INTO users (id, firstname, lastname, sex, email, phonenum, dob, date_saved, induction_date,  unit, role, password, faith_testimony) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
        [id, firstname, lastname, sex, email, phone, dob, donb, doind, unit, role, password, faithtestimony]
        );

            
        res.json({
            success: true,

            message:
                "User created successfully.",

            user:  newUser.rows[0]
    });

        

  } catch (err) {
    console.error(err.message);
  }

});




// USER-LOGIN
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (user.rows.length === 0) {
      return res.json({
        success: false,
        message: "Invalid credentials"
      });
    }


    // Create login record
        const loginId = uuidv4();

        const foundUser = user.rows[0];

	

        await pool.query(
            `
            INSERT INTO user_logins
            (
                login_id,
                user_id,
                login_at,
                logout_at
            )
            VALUES
            (
                $1,
                $2,
                NOW(),
                NULL
            )
            `,
            [
                loginId,
                foundUser.id
            ]
        );

        res.json({
            success: true,
            message: "User logged in successfully.",
            user: foundUser
        });

        
  } catch (err) {
    console.error(err.message);
  }


});



// FORGOT PASSWORD

router.post("/forgotpassword", async (req, res) => {

  try {

    const { email } = req.body;

    // Verify email exists
    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    // No user found
    if (user.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "No account associated with this email"
      });

    }

    // User found
    const foundUser = user.rows[0];

    res.status(200).json({
      success: true,
      message:
        `Email verified. ${foundUser.firstname}, you can now reset your password.`
    });

  } catch (err) {

    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});



// SAVE NEW PASSWORD

router.post("/savenewpassword", async (req, res) => {

    try {

        const { email, newPassword } = req.body;

        // Check if user exists
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Update password directly (already hashed in frontend)
        await pool.query(
            "UPDATE users SET password = $1 WHERE email = $2",
            [newPassword, email]
        );

        res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }

});


// GET-USER

router.post("/get-user", async (req, res) => {

    try {

        // Get email from frontend
        const { email } = req.body;

        // Basic validation
        if (!email) {

            return res.status(400).json({
                message: "Email is required"
            });
        }

        // Find user in database
        const user = await pool.query(
            `
            SELECT *
            FROM users
            WHERE email = $1
            `,
            [email]
        );

        // No user found
        if (user.rows.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        // Send user data
        res.status(200).json({
            user: user.rows[0]
        });

    } catch (err) {

        console.error(err.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// GET UNITS
router.get(
"/service-units",
async (req, res) => {

    try {

        const units =
            await pool.query(
                `
                SELECT
                    unit_id,
                    unit_name
                FROM unit
                ORDER BY unit_name
                `
            );

        res.json(
            units.rows
        );

    } catch(err){

        console.error(err);

        res.status(500).json({
            message:
            "Unable to load units"
        });
    }
});


// LOAD AVAILABLE COURSES

router.get("/get-courses", async (req, res) => {

	try{
	
		const avail_courses = await pool.query (`SELECT *
			FROM courses ORDER BY course_id` 
		);

		if (avail_courses.rows.length===0){
            return res.status(404).json({
                success: false,
                message: "No course available"
                });
            }

		res.status(200).json({
			success: true,
			message: "Available Courses loaded successfully",
			courses: avail_courses.rows});
		
		
	} catch (err) {
		console.error(err);

		res.status(500).json({
			success:false,
			message: "Unable to load available courses"});
	}
});


// REGISTER COURSE

router.post("/register-course/:user_id", async (req, res) => {
  //  try{
  //      const {}
    //}
})

// LOAD REGISTERED COURSES

router.get("/get-courses/:user_id", async (req, res) => {

    try{

        const {userId} = req.params;

	
	
        const reg_courses = await pool.query (`SELECT *
                FROM reg_courses WHERE user_id = $1 
                ORDER BY date_reg DESC`,
                [userId]);

        if (reg_courses.rows.length===0){
            return res.status(404).json({
                success: false,
                message: "No course registered yet"
                });

        res.status(200).json({
            success: true,
            message: "Registered Courses loaded successfully",
            courses: reg_courses.rows});
        

    }

		
	} catch(err){
        console.error(err);

		res.status(500).json({
			success:false,
			message: "Unable to load registered courses"});
	}
});


module.exports = router;
