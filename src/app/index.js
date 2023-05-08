const mongoSanitize = require("express-mongo-sanitize");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const httpStatus = require("http-status");
const useragent = require("express-useragent");
const hpp = require("hpp");

const morgan = require("../configs/morgan");
const routes = require("../routes");
const rateLimiter = require("../middlewares/rateLimiter");
const ApiError = require("../utils/ApiError");
const { errorConverter, errorHandler } = require("../middlewares/error");

const app = express();

// logger
app.use(morgan);

// set security HTTP headers
app.use(helmet());

// protect against HTTP Parameter Pollution attacks
app.use(hpp());

// used to identify the IP address of the client that made the request
app.set("trust proxy", 1);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

app.use(useragent.express());

// limit repeated failed requests
app.use(rateLimiter);

// api routes
app.use(routes);

// 404 error unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError
app.use(errorConverter);

// global handle error
app.use(errorHandler);

module.exports = app;
