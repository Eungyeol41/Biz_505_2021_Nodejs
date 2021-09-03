var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// mongoose를 사용한 mongoDB 연결 설정
const mongoose = require("mongoose");
const mongoLocalURL = "mongodb://localhost:27017"; // 컴퓨터에서 mongoDB 들어가기
const mongoAtlasURL =
  "mongodb+srv://inizz:12341234@cluster0.togji.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// connection 객체를 변수에 임시 저장
const dbConn = mongoose.connection;
// mongoDB에 연결이 성공하면 호출되는 event
// 연결 최초 성공 시 한 번만 나옴
dbConn.once("open", () => {
  console.log("MongoDB OK!!");
});
// 작동되는 과정에서 오류 메시지를 받게 되면 console에 오류 메시지를 보내라
dbConn.on("error", () => {
  console.error;
});

mongoose.connect(`${mongoAtlasURL}`);
// mongoose.connect(`${mongoLocalURL}`);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const apiRouter = require("./routes/apiRouter");
const bbsRouter = require("./routes/bbsRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);
app.use("/bbs", bbsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
