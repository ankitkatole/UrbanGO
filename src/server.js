require("dotenv").config()
const express = require('express')
const cors = require('cors')

const { Connection } = require('./db/urbango.js')
const authMiddleware = require('./middlewares/auth.js')
const weatherRoutes = require("./utils/weather.js")
const cartRoutes = require("./routes/cart.js")
const searchRoutes = require("./routes/search.js")


if(require.main === module)
{
    const app = express()
    app.use(express.json());
    app.use(cors({origin : true}))

    try{
        Connection()
    }catch(error)
    {
        console.log(error)
    }

    app.use('/user', authMiddleware);
    app.use("/cart",cartRoutes);
    app.use("/search",searchRoutes)

    app.get("/",(req,res)=>{
        res.send("Working")
    })
    app.listen(process.env.PORT, () => {
        console.log("server started")
        console.log(`http://localhost:${process.env.PORT}`)
    })
}