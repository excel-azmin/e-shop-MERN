const data = require("../data");
const User = require("../models/userMode");

const seedUser = async (req, res, next) => {
    try {

        // delete all User
        await User.deleteMany({});

        // insert User
        const users = await User.insertMany(data.users);

        // response

        return res.status(200).json({
            success: true,
            data: users,
        });

        
    } catch (error) {
        next(error);
    }
}


module.exports = seedUser;