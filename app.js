const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { config, configDotenv } = require("dotenv");
const travelRoute = require("./routes/travel.route");
const userRoute = require("./routes/user.route");
const errorMiddelware = require("./middlewares/error.middelware");

const app = express();
config({
  encoding: "latin1",
  debug: true,
});
configDotenv({});

const port = 8000;
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser({}));
app.use(travelRoute);
app.use(userRoute);

app.use(errorMiddelware);

mongoose
  .connect("mongodb://localhost/travel")
  .then(() => console.log("MongoDB connected"))
  .catch((er) => console.log("MongoDb failed", er));

app.listen(port, () => {
  console.log(`Successfuly:http://localhost:${port}`);
});
