const cluster = require("cluster");


const express = require("express");
const cors = require("cors");
const toobusy = require("toobusy-js");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const authRouter = require("./services/authentication/auth.route");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
var DynamoDBStore = require("connect-dynamodb")({ session: session });
const port = 3080;
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const socketLayer = require('./services/socket.io');
const server = require('http').createServer(app); 
const io = require('socket.io')(server, { cors: { origin: '*'}}); 
const SocketIO = new socketLayer(io);
SocketIO.init();

app.use(cors());
app.use(morgan("tiny"));

app.use(async (req, res, next) => {
  res.SocketIO = SocketIO;
  next();
});



app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.header("X-Frame-Options", "ALLOWALL");
  next();
});


const users = [{ firstname: "name1", lastname: "lastname1test" }];
//add routes
app.use(authRouter);

//if (process.env.NODE_ENV === 'production') {
// app.use(express.static(path.join(__dirname, '../client/build')));

app.use("/mam", express.static(path.join(__dirname, "mam", "build")));

app.use("/atlas", express.static(path.join(__dirname, "atlas", "build")));

// app.get('/', (req,res) => {
app.get("/mam/*", (req, res) => {
  // res.sendFile(path.join(__dirname, '../client/build/index.html'));

  res.sendFile(path.join(__dirname, "mam", "build", "index.html"));
});


app.get("/atlas/*", (req, res) => {
  res.sendFile(path.join(__dirname, "atlas", "build", "index.html"));
});




server.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
});



