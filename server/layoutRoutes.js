const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/getEmailLayout', (req, res) => {
    const layoutPath = path.join(__dirname, './layout.html');
    fs.readFile(layoutPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading layout file');
        res.send(data);
    });
});

module.exports = router;
