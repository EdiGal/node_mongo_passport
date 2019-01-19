const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const bcrypt = require("bcryptjs")

router.get("/", (req, res) => {
    res.render("register")
})

router.post("/", (req, res) => {
    const { name, email, password, password2, success_msg, error_msg, error, errors } = checkErrors(req.body);

    if(errors.length > 0){
        res.render("register", { name, email, password, password2, success_msg, error_msg, error, errors })
    }
    else {
        User.findOne({email})
        .then(user => {
            if(user){
                errors.push({msg: 'this email already in use'})
                res.render("register", { name, email, password, password2, success_msg, error_msg, error, errors })
            }
            else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hashedPassword) => {
                        if(err) throw err
                        const newUser = new User({
                            name,
                            email,
                            password: hashedPassword,
                        })
                        newUser.save()
                        .then(user => {
                            req.flash("success_msg", "you are  know registered")
                            res.redirect("/users/login")
                        })
                        .catch(err => {throw err})
                    })
                })
                    
            }
        })
    }
})

//helper functions
function checkErrors(body){
    const { name, email, password, password2 } = body;
    const success_msg = error_msg = error = "";
    const errors = [];

    if(!name || !email || !password || !password2){
        errors.push({msg: "Please fill all fields"})
    }

    if(password !== password2){
        errors.push({msg: "Passwords do not match"})
    }

    if(password.length < 6){
        errors.push({msg: "Password should be at least 6 characters"})
    }
    return {name, email, password, password2, success_msg, error_msg, error, errors}
}
 module.exports = router