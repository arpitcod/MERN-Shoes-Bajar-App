import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";  //database connect
import morgan from "morgan";
// import mongoose from "mongoose";
import authRoutes from "./routes/auth_route.js"
import cors from "cors"
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'


//configure env
dotenv.config();

//database config
connectDb();

//rest object
const app = express();

// cors
const corsOptions ={
  origin:"http://localhost:3000",
  methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
  credential:true,
  
};

//middleware
app.use(cors(corsOptions));
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use('/api/auth',authRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)







//rest api
app.get("/", (rq, rs) => {
  rs.send("<h1>hare krishna </h1>");
});

const PORT = process.env.PORT || 2914;

app.listen(PORT, () => {
  console.log(`server is running on ${process.env.DEV_MODE}==>${PORT}`);
});
