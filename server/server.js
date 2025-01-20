const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const layoutRoutes = require('./layoutRoutes');
const uploadRoutes = require('./uploadRoutes');
const configRoutes = require('./configRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/uploads",express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/emailBuilder', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/layout', layoutRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/config', configRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
