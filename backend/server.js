import express from "express";
import dotenv from "dotenv"
import path from "path"
import { connectDB } from "./config/db.js";
import cardRoutes from "./routes/cards.route.js"
dotenv.config()
const app =express();
 const PORT =process.env.PORT || 5000;
 const __dirname=path.resolve();
app.use(express.json());//allow to acceapt json data
app.use("/api/cards",cardRoutes)
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

app.listen(5000, ()=>{
    connectDB();
    console.log("server started at http://localhost:"+PORT)
});
