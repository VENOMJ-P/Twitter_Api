import express from "express";
import bodyParser from "body-parser";

import { connect } from "./config/database.js";
import apiRoutes from "./routes/index.js";
import passport from "passport";
import { passportAuth } from "./config/jwt-middleware.js";
import { PORT } from "./config/serverConfig.js";

const startServerSetup = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(passport.initialize());
  passportAuth(passport);
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log("Server started ", PORT);
    connect();
    console.log("Successfully connected to mongodb");
  });
};

startServerSetup();
