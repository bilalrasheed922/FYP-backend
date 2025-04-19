// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const questionRoutes = require("./routes/questionRoutes");
// var routes = require('./routes/loginRoutes');

// dotenv.config();

// connectDB(); // Connect to MongoDB

// const app = express();

// // Middleware
// app.use(express.json()); // Parse JSON request bodies

// // Routes
// app.use("/api/questions", questionRoutes);
// app.use(routes);

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/user', authRoutes); // Routes like /user/login, /user/signup

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

