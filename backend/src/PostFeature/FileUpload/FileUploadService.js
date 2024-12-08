const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class FileUploadService {
    constructor() {
        // Paths adjusted to match the new root directory structure
        this.documentUploadPath = path.join(__dirname, '../../..', 'uploads', 'documents');
        this.imageUploadPath = path.join(__dirname, '../../..', 'uploads', 'images');
        
        // Ensure upload directories exist
        this.ensureDirectoriesExist();
    }

    ensureDirectoriesExist() {
        // Create documents and images upload directories if they don't exist
        [this.documentUploadPath, this.imageUploadPath].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    isImageFile(mimetype) {
        const imageMimetypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return imageMimetypes.includes(mimetype);
    }

    isDocumentFile(mimetype) {
        const documentMimetypes = [
            'application/pdf', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        return documentMimetypes.includes(mimetype);
    }

    generateFileName(originalname, mimetype) {
        const fileExtension = path.extname(originalname);
        const uniqueId = uuidv4().split('-')[0]; // Use first segment of UUID
        const baseName = path.basename(originalname, fileExtension); // Get base file name without extension
        
        if (this.isImageFile(mimetype)) {
            return `image-${uniqueId}-${baseName}${fileExtension}`;
        }
        
        if (this.isDocumentFile(mimetype)) {
            return `document-${uniqueId}-${baseName}${fileExtension}`;
        }
        
        return originalname;
    }

    uploadFile(file) {
        if (!file) {
            throw new Error('No file uploaded');
        }

        const uploadPath = this.isImageFile(file.mimetype) 
            ? this.imageUploadPath 
            : (this.isDocumentFile(file.mimetype) 
                ? this.documentUploadPath 
                : path.join(__dirname, '../../..', 'uploads')); // Default upload path for unsupported files

        const newFileName = this.generateFileName(file.originalname, file.mimetype);
        const fullPath = path.join(uploadPath, newFileName);

        // Write file
        fs.writeFileSync(fullPath, file.buffer);

        return {
            originalName: file.originalname,
            fileName: newFileName,
            mimetype: file.mimetype,
            path: fullPath
        };
    }
}

module.exports = new FileUploadService();
