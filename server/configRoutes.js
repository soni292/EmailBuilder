const express = require('express');
const Config = require('./models/Config');
const router = express.Router();

router.post('/uploadEmailConfig', async (req, res) => {
    try {
        const newConfig = new Config(req.body);
        await newConfig.save();
        res.status(201).send('Config saved successfully');
    } catch (error) {
        res.status(500).send('Error saving config');
    }
});

router.get('/getEmailConfig', async (req, res) => {
    try {
        const configs = await Config.find();
        res.status(200).json(configs);
    } catch (error) {
        res.status(500).send('Error retrieving configs');
    }
});

module.exports = router;
