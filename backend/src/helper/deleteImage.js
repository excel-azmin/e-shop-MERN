const fs = require("fs").promises;


const deleteImage = async (path) => {
    try {
        await fs.access(path);
        await fs.unlink(path);
    } catch (err) {
        console.log(err);
    }
    }

module.exports = deleteImage;

