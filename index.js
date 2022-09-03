const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path")

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config();
}
require("./utils/connectdb");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "client", "build")))

//Add the client URL to the CORS policy

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://medicheck-in.herokuapp.com/"
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/users", userRouter);

app.get("/", function (req, res) {
  res.send({ status: "success" });
});

//Start the server in port 8081

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const server = app.listen(process.env.PORT || 8081, function () {
  const port = server.address().port;

  console.log("App started at port:", port);
});