import express from "express";
import configDotenv from "./src/config/dotenv";
import router from "./src/routes/routes";
// import jwtPassport from "./src/middlewares/jwtPassport";
// import passport from "passport";
// import cors from 'cors';

configDotenv();
// jwtPassport(passport);

const app = express();
const port = process.env.PORT;

// app.use(cors());
// app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3333, () => {
  console.log(
    `⚡️[${process.env.APP_NAME}]: Server is running at http://localhost:${port}`
  );
});
