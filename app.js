const path = require("path");
const express = require("express");
const csurf = require('csurf');
const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
const db = require('./data/database')
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require("./middlewares/check-auth");


const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// to show static file like css & js
app.use(express.static('public'))

// this middleware helpls dealing with incoming req lik req.body
app.use(express.urlencoded({extended: false}));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csurf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function(){
    app.listen(3000);
}).catch(function(error){
    console.log('Failed to connect to database!')
    console.log(error);
})


