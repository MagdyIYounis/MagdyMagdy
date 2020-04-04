const express = require("express"),
   File_Uplode = require("express-fileupload"),
   BodyParser = require("body-parser"),
   Mysql = require("mysql"),
   path = require("path"),
   app = express(),
   port = 8081;

app.set("Port", process.env.port || port);
app.set("views", __dirname + "/Views");
app.set("view engine", "ejs");

app.use(BodyParser.urlencoded({ extended: "false" }));
app.use(BodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(File_Uplode());

const { MainPage } = require("./Route/index");
const { Student,Select,SendOrder } = require("./Route/Add_Student");
app.get("/", MainPage);
app.get("/Select",Student);
app.post("/Select",Select);
app.post("/Select/sendOrder",SendOrder);


//Connect Databases

const db = Mysql.createConnection({
   host : "localhost",
   user : "root",
   password : "",
   database : "Center_Elgam3a"
});

db.connect((err)=>{
   if(err) throw err;
   console.log("Connecting DB");
})
global.DB = db;

app.listen(port, () => {

   console.log("Done ", port);

});