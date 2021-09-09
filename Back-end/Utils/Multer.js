const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const fileSufix = path.extname(file.originalname);
        if(fileSufix !== '.jpg' && fileSufix !== '.jpeg' && fileSufix !== '.png') {
            return cb(new Error('File type is not supported'), false);
        }
        cb(null, true);
    }
});