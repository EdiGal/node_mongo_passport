const express = require("express")
const flash = require("connect-flash")
const session = require("express-session")
const app = express()
const passport = require("passport")

require('./config/passport');

//ejs
const expressLayouts = require("express-ejs-layouts")
app.use(expressLayouts)
app.set("view engine", "ejs")

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


//Bodyparser
app.use(express.urlencoded({ extended: false }))

//mongo
const mongoose = require("mongoose")
const {MongoURI} = require("./config/keys");
mongoose.connect(MongoURI, {useNewUrlParser: true})
.then(() => console.log("mongoDB connected"))
.catch(err => console.log("Error connect to mongoDB"))

//routes
app.use("/", require("./routes/index"))
app.use("/users", require("./routes/users"))

//port & server
const { PORT = 5000 } = process.env
app.listen(PORT, console.log(`Server started on port ${PORT}`))
