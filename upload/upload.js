const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs').promises;

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('picture');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Middleware to resize image
const resizeImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const outputFilePath = `./uploads/resized-${req.file.filename}`;

  try {
    await sharp(filePath)
      .resize(500, 500) // Adjust to desired size
      .toFile(outputFilePath);

    // Safely remove the original file
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error(`Error deleting original file: ${filePath}`, err);
    }

    // Update the file path to the resized image
    req.file.path = outputFilePath;
    next();
  } catch (err) {
    console.error('Error resizing image:', err);
    return res.status(500).json({ message: 'Error processing image' });
  }
};

module.exports = { upload, resizeImage };
