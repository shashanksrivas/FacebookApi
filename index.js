const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const router = express.Router();
const path = require("path");
const cors = require('cors');
const corsOptions ={
    origin:'https://facebookforfriend.netlify.app', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
dotenv.config();
// "mongodb+srv://shashank:Password_123@facebookdb.5sfnbit.mongodb.net/facebookdb?retryWrites=true&w=majority"

mongoose.connect("mongodb+srv://shashank:Password_123@facebookdb.5sfnbit.mongodb.net/facebookdb?retryWrites=true&w=majority"
    ,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT || 3001, () => {
    console.log("Backend server is running!");
  });
  