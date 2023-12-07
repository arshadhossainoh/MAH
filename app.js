const path = require("path");
const express = require("express");

const db = require('./data/database')

const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// to show static file like css & js
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));

app.use(authRoutes);

db.connectToDatabase().then(function(){
    app.listen(3000);
}).catch(function(error){
    console.log('Failed to connect to database!')
    console.log(error);
})


