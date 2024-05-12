import express from "express";
import { configureRoutes } from "./routes/routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "passport";
import { configurePassport } from "./passport/passport";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./model/User";
import { Music } from "./model/Music";

const app = express();
const port = 5000;
const dbUrl = "YOUR MONGODB CONNECTION STRING";

// mongodb connection
mongoose
  .connect(dbUrl)
  .then(async (_) => {
    console.log("Successfully connected to MongoDB.");
    const existingUser = await User.findOne({ email: "admin@admin.com" });

    if (!existingUser) {
      const newUser = new User({
        name: "admin",
        email: "admin@admin.com",
        password: "admin1",
        role: "ROLE_ADMIN",
      });
      await newUser.save();
      const newMusic = new Music({
        title: "Vettem a piacon",
        author: "Rostás Szabika",
      });
      await newMusic.save();
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  })
  .catch((error) => {
    console.log(error);
    return;
  });

const whitelist = ["*", "http://localhost:4200"];
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed?: boolean) => void
  ) => {
    if (whitelist.indexOf(origin!) !== -1 || whitelist.includes("*")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS."));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// cookieParser
app.use(cookieParser());

// session
const sessionOptions: expressSession.SessionOptions = {
  secret: "testsecret",
  resave: false,
  saveUninitialized: false,
};
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use("/app", configureRoutes(passport, express.Router()));

app.listen(port, () => {
  console.log("Server is listening on port " + port.toString());
});

console.log("After server is ready.");
