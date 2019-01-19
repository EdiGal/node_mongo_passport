const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get("/", (req, res) => {
    res.render("welcome")
})

module.exports  = router