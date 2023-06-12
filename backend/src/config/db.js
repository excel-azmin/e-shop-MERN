
const  mongoose =  require ( 'mongoose' ) ;
const { MONGODB_ATLAS_URL } = require('../secrect');



const connectDatabase = async ( options = {} ) => {
    try {
        const conn = await mongoose.connect(MONGODB_ATLAS_URL, options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on('error', (error) => { 
            console.error("DB connection Error",error.toString());
        });
    } catch (err) {
        console.error("Couldn't connect to DB", err.toString());
    }
    }

module.exports = connectDatabase;