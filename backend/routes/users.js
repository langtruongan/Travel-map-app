const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res)=>{
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    } catch(err) {
        res.status(500).json(err);
    }
});

//login
router.post("/login", async (req, res)=>{
    try {
        //find user
        const user = await User.findOne({ username: req.body.username });

        if (user) {
            //if user: compare entered password to stored/foundUser password.
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (validPassword) {
                //if both passwords match
                res.status(200).json({ _id: user._id, username: user.username });
            } else {
                //if both passwords dont match
                res.status(400).json("Wrong username or password!");
            }
        } else {
            //if !user
            res.status(400).json("Wrong username or password!");
        }

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;