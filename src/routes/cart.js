// Import required modules
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.js');
const sendEmailWithQR = require("../utils/payment.js")


router.post("/add",async (req,res)=>{
  const {email,trips} = req.body
  console.log({email})
  console.log({trips})

  trips.forEach(trip=>{
    console.log(trip.type)
    console.log(trip.data)
  })

  try 
  {
      const user = await Cart.findOne({ email })
  
      if (!user) 
      {
          const newInfo = {
              email : email,
              trips: trips
          }

          const newCart = new Cart(newInfo);
          await newCart.save();

          console.log('Email and trips added successfully')
          res.send({ message: 'Email and trips added successfully' });
      } 
      else 
      {
          trips.forEach(async trip => {
              await Cart.updateOne({ email }, { $push: { trips : trip} })
          })
          res.send({ message: 'Email and trips added successfully' });
      }
  } 
  catch(error) 
  {
      console.error(error);
      res.status(500).send({ message: 'Error adding to cart' });
  }
})

router.post("/remove", async (req, res) => {
  const { email, removetripID } = req.body
  try {

      const user = await Cart.findOne({ email })
      console.log("User data : ",user)

      if (!user) {
          console.log("User has nothing in their cart")
          return res.send("User has nothing in their cart")
      }

      user.trips.forEach(async trip=>{
        if(trip._id == removetripID)
        {
          console.log("Removing id",trip._id)
          console.log(trip)

          await user.trips.pull(trip);

          await user.save();

          res.send("Removed from cart successfully")
        }
      })
      
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error removing product from cart' })
  }
})


router.post("/info",async (req,res)=>{
  const {email} = req.body
  console.log({email})

  try 
  {
       
      const user = await Cart.findOne({email});
  
      if (!user) 
      {
          console.log("User as nothing in his cart")
          res.send("User as nothing in his cart")
      } 
      else 
      {
          console.log(user)
          res.send(user) 
      }
  } 
  catch(error) 
  {
      console.error(error);
      res.status(500).send({ message: 'Error reciving user cart info' });
  }
})

router.post("/checkout",async (req,res)=>{
  const {email} = req.body
  let amount = 0
  try{
  const user = await Cart.findOne({email});
  user.trips.forEach(trip =>{
      if(trip.type == "car"){
          const key = Object.keys(trip.data.price)[0];
          amount += trip.data.price[key];
      }
      else{
        amount += trip.data.price
      }
  })

  console.log("Total amount to be paid is : ",amount)

  // try
  // {
  //     RazorPay(amount)
  // }
  // catch(error)
  // {
  //     console.log("Error : ",error)
  // }

  try
  {
      console.log("Recived mail : ",email) 
      sendEmailWithQR(email, amount)
      res.send("Order Recived")
  }
  catch(error)
  { 
      res.sendStatus(500)
  }}
  catch(error){
    console.log("last vala")
    res.sendStatus(500)
  }
})

module.exports = router;
