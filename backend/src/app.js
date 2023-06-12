const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const creatError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const { errorResponse } = require("./controllers/responseController");

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again after an minute",
});

app.use(morgan("dev"));
app.use(xssClean());
app.use(rateLimiter);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/users", userRouter); 
app.use("/api/seed",seedRouter)

const isLoggedIn = (req, res, next) => {
  const isLoggedIn = true;
  if (isLoggedIn) {
    req.body.id = 1;
    next();
  } else {
    res.status(401).send({
      status: "You are not logged in",
    });
  }
};


app.get("/", rateLimiter, (req, res) => {
  res.send("Hello World!");
});

// clinet error handler
app.use((req, res, next) => {
  next(creatError(404, " Route not found"));
});

// server error handler
app.use((err, req, res, next) => {
  return  errorResponse(res, { statusCode: err.status, message: err.message });
});


module.exports = app;
