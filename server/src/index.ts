import express from 'express'
import "dotenv/config"
const app = express();//express initialize

const PORT = process.env.PORT;


app.get("/",( req , res ) =>{
    res.send("NoMercey...")
})
app.get("/health",( req , res ) => {
    res.json({ status: "ok" });
})
app.listen( PORT , () => {
    console.log("server is runn");
})

