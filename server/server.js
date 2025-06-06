// server/server.js

require('dotenv').config();

const express = require('express');
const initDb = require('./initDb');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const User = require('./models/User'); // Import User model
const cors = require('cors');
const { expressjwt: expressJwt } = require('express-jwt');

const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configure express-jwt middleware before routes
app.use(
    expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] }).unless({
        path: ['/api/auth/login', '/api/auth/signup'], // Allow unauthenticated access to these paths
    })
);

// Set up routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error-handling middleware for JWT errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized access' });
    } else {
        next(err);
    }
});

// Seed an admin user if one doesn't exist
async function seedAdminUser() {
    const adminEmail = "admin@example.com";
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
        await User.create({
            name: "Admin User",
            email: adminEmail,
            role: "Admin",
            password: process.env.ADMIN_PASSWORD
        });
        console.log("Admin user created successfully.");
    } else {
        console.log("Admin user already exists.");
    }
}

// Initialize the database and start the server
initDb().then(async () => {
    await seedAdminUser(); // Call seed function on startup
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to initialize database:", error);
});
