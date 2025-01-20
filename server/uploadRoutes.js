const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post('/uploadImage', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

module.exports = router;
