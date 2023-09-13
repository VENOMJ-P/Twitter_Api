import express from "express";
import bodyParser from "body-parser";
const app = express();

import { connect } from "./config/database.js";
import apiRoutes from "./routes/index.js";
import passport from "passport";
import {passportAuth} from "./config/jwt-middleware.js"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(passport.initialize());
passportAuth(passport);
app.use("/api", apiRoutes);

app.listen(3000, async () => {
  console.log("Server started");
  connect();
  console.log("Successfully connected to mongodb");
});
