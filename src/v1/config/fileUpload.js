const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/my-uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + `${uniqueSuffix}.${file.mimetype.split('/')[1]}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
}).single('image'); // Assuming 'file' is the name of the field in your form

module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            return res.status(400).json({ message: 'Multer error: ' + err.message });
        } else if (err) {
            // An unknown error occurred
            console.error(err);
            return res.status(500).json({ message: 'An error occurred while uploading the file' });
        }
        // No error occurred, proceed to the next middleware
        if (req.file) {
            console.log("fileeeeeeeee", req.file)
            const { originalname, mimetype, size, path , filename} = req.file
            req.image = {
                originalname,
                mimetype,
                size,
                path:`/images/my-uploads/${filename}`
            }
        }
        next();
    });
};
