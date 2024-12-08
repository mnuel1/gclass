const FileUploadService = require('./FileUploadService');

exports.uploadFiles = async (req, res) => {    
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: 'No files uploaded'
            });
        }

        const uploadedFiles = req.files.map(file => FileUploadService.uploadFile(file));

        res.status(200).json({
            message: 'Files uploaded successfully',
            files: uploadedFiles.map(file => ({
                originalName: file.originalName,
                fileName: file.fileName,
                mimetype: file.mimetype,
                path: file.path
            }))
        });
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({
            message: 'File upload failed',
            error: error.message
        });
    }
};
