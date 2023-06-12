const app = require('./app');
const connectDatabase = require('./config/db');
const { SERVER_PORT } = require('./secrect');




app.listen(SERVER_PORT, async () => {
    console.log(`Server started on port ${SERVER_PORT}`);

    await connectDatabase();
});
