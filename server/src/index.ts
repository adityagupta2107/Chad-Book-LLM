import express from 'express'
import "dotenv/config"
import { auth } from './lib/auth.js';
import { toNodeHandler } from 'better-auth/node';

const app = express();//express initialize
const PORT = process.env.PORT;

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());
app.get("/",( req , res ) =>{
    res.send("NoMercey...")
})
app.get("/health",( req , res ) => {
    res.json({ status: "ok" });
})
app.listen( PORT , () => {
    console.log("server is runn");
})

