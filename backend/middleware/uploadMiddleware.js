const multer = require("multer");

// Configure Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedType = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedType.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    const error = new Error(
      "Invalid file type, only JPEG, JPG and PNG are allowed"
    );
    error.statusCode = 400;
    error.message = "Invalid file type, only JPEG, JPG and PNG are allowed";
    cb(error, false); // Reject file
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
