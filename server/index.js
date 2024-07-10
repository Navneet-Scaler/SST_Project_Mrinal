const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

// Import and use the user routes
const userRoutes = require('./routes/userRoutes');
app.use(cors())
app.use(express.json())
app.use('/api/users' , userRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
