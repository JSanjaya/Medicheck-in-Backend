const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

require("dotenv").config();
require("./utils/connectDB");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy


var corsOptions = {
  origin: ["https://medicheck-in.netlify.app", "http://localhost:3000"],
  credentials: true,
}

// Then pass them to cors:
app.use(cors(corsOptions));


app.use(passport.initialize());

app.use("/users", userRouter);

app.get("/", function (req, res) {
  res.send({ status: "success" });
});

//Start the server in port 8081

const server = app.listen(process.env.PORT || 8081, function () {
  const port = server.address().port;

  console.log("App started at port:", port);
});