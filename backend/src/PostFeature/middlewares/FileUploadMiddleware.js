const multer = require('multer');

const fileFilter = (req, file, cb) => {
    // Allow only specific file types
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPG, JPEG, PNG, PDF, and DOCX are allowed.'), false);
    }
};

const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit per file
    }
});

module.exports = upload;


