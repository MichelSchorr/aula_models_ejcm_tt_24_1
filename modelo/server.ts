import cors from 'cors';
import express from "express";
// import passport from "passport";
import configDotenv from "./src/config/dotenv";
// import jwtPassport from "./src/middlewares/jwtPassport";
import router from "./src/routes/routes";

configDotenv();
// jwtPassport(passport);

const app = express();
const port = process.env.PORT;
app.use(cors());
// app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `⚡️[${process.env.APP_NAME}]: Server is running at http://localhost:${port}`
  );
});