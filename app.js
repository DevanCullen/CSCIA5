const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Importing routes
const employeeRoutes = require('./routes/employee');

const projectRoutes = require('./routes/projects');

// Use routes
app.use('/api/employees', employeeRoutes);

app.use('/api/projects', projectRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:3000`);
});
