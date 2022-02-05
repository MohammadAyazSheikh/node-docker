const User = require('../models/userModel');



const bcrypt = require('bcryptjs');


exports.signUp = async (req, res, next) => {

    const { username, password } = req.body;

    console.log(`u = ${username}  pas = ${password}`)
    const hashedPass = await bcrypt.hash(password, 12);
    console.log(` Hashpas = ${hashedPass}`)
    try {
        const user = await User.create({
            username: username,
            password: hashedPass
        });
        req.session.user = user;
        res.status(200).json({
            status: 'succes',
            data: {
                user,
            }
        });
    }
    catch (e) {
        res.status(400).json({
            status: 'fail',
            error: e
        });
    }
}




exports.login = async (req, res, next) => {

    const { username, password } = req.body;

    console.log(`u = ${username}  pas = ${password}`)


    try {
        const user = await User.findOne({ username: username })

        if (!user) {
            return res.status(400).json({
                status: 'failed',
                error: 'user not found'
            });
        }


        const isEqual = await bcrypt.compare(password, user.password);

        if (isEqual) {
            req.session.user = user;
            return res.status(200).json({
                status: 'sucess',
                data: {
                    user
                }
            });
        }
        else {
            return res.status(200).json({
                status: 'failed',
                error: 'inavlid username or passsword'
            });
        }

    }
    catch (e) {
        res.status(400).json({
            status: 'fail',
            error: e
        });
    }
}