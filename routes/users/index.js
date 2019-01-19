//vars
const express = require("express")
const router = express.Router()

//routes
router.use("/register", require("./registration"))
router.use("/login", require("./login"))

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

//export the routes
module.exports  = router