import express from "express";
import mongoose from "mongoose";
import logger from "morgan";
import helmet from "helmet";
import { json, urlencoded } from "body-parser";
import cors from "cors";

// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" });

//import module
import routes from "./src/routes";
import { notFound, developmentErrors, productionErrors } from "./src/utils/errorHandlers";


// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, { 
  useCreateIndex: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", err => {
  console.error(`Database err  ${err.message}`);
});

// init Express app
const app = express();

// having fun
app.use((_, res, next) => {
  res.header("X-powered-by", "Blood, sweat, and tears.");
  next();
});

//route logger
app.use(logger("dev"));
//use helmet security wrapper
app.use(helmet());
// Takes the raw requests and turns them into usable properties on req.body
app.use(json());
app.use(urlencoded({ extended: true }));

//handling CORS
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});


//use route module
app.use("/", routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get("env") === "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(developmentErrors);
}

// production error handler
app.use(productionErrors);

app.set("port", process.env.PORT);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running  🏃  on PORT ${server.address().port}`);
});