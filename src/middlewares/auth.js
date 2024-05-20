const express = require("express")
const router = express.Router()
const OTPGenerator = require("../controllers/OTP.js")
const sendEmail = require("../utils/sendmailForgetPasswd.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

router.post("/register",async (req,res)=>{
    const {fname, lname, e_mail, password} = req.body
    console.log("Received data : ",{fname,lname,e_mail,password})
    const name = fname +" "+ lname
    const {username, email, passwd} = {username : name , email : e_mail, passwd : password}
    console.log("Received data : ",{username,email,passwd})

    // const db = await GetConnection()
    // const collection = db.collection("User")
    

    const user = await User.findOne({username})
    const user_email = await User.findOne({email})
    if(!user && !user_email)
    {
        bcrypt.hash(passwd,10,async (err, hash)=>{
            if(err)
            {
                console.log("Error hashing passwd : ",err)
            }
            else
            {
                console.log("Hashed password : ",hash);

                try
                {
                    const newUser = {username,email,hash}
                    // const result = await User.insertOne(newUser)

                    const newCart = new User(newUser);
                    await newCart.save();

                    if(newCart)
                    {
                        res.send("Account created successfully")
                    }
                }
                catch(err)
                {
                    console.log(err)
                }
            }
        })
    }
    else
    {
        console.log("username or email already exits")
        return res.send("Username or email already exits")
    }
})


  router.post("/login", async (req, res) => {
    const { email, passwd } = req.body;
    const normalizedEmail = email.trim().toLowerCase(); 

    try {
      // let db = await GetConnection();
      // let collection_user = db.collection("User");

      const user = await User.findOne({ email: normalizedEmail });

      const account = user ;

      if (account) {
        const passwordMatch = await bcrypt.compare(passwd, account.hash);
        if (passwordMatch) {
          const payload = { id: account.email };
          const token = jwt.sign(payload, process.env.TOKEN, { expiresIn: "23h" });
          res.json({ message: "Login successfully", token });
        } else {
          return res.status(401).send({ message: "Invalid password" });
        }
      } else {
        return res.status(404).send({ message: "Email not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error processing login" });
    }
  });

router.post("/forgotpassword", (req,res)=>{
    const {email} = req.body
    console.log({email})
    
    try
    {
        const OTP = OTPGenerator();
        console.log("Recived mail : ",email)
        const subject = "Reset Password"
        const text = "Your Otp to rest password is "+OTP
        sendEmail(email, subject, text)
        res.json({otp : OTP})
    }
    catch(error)
    {
        res.sendStatus(500)
    }
})

router.post("/forgotpassword/user/update",async (req,res)=>{
    const {email, passwd} = req.body
    console.log("Recived data : ",{email, passwd})

    try 
    {
        // let db = await GetConnection()
        // let collection = db.collection("User")
    
        const user = await User.findOne({ email })
    
        if (!user) {
          return res.status(404).send({ message: "Email not found" })
        }
    
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(passwd, saltRounds)
        console.log(hashedPassword)
    
        const updateResult = await User.updateOne(
          { email },
          { $set: { hash: hashedPassword } }
        )
    
        if(updateResult.modifiedCount === 1)
        {
          res.send({ message: 'Password updated successfully' })
        }
        else
        {
          console.error('Error updating password in database')
          res.status(500).send({ message: 'Error updating password' })
        }
    }catch(error)
    {
        console.error(error)
        res.status(500).send({ message: 'Error updating password' })
    }
})

module.exports = router