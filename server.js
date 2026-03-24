const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'eduportal_secret_2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Demo Data
let users = [];
let materials = [];

// Routes
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), name, email, password: hashedPassword, role: 'user' };
    users.push(newUser);
    res.json({ success: true, message: 'Registered!' });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Demo Login
    if (email === 'admin@edu.com' && password === 'admin123') {
        res.json({ 
            success: true, 
            token: 'admin_token',
            user: { name: 'Admin', email, role: 'admin' }
        });
    } else if (email === 'student@edu.com' && password === 'student123') {
        res.json({ 
            success: true, 
            token: 'student_token',
            user: { name: 'Student', email, role: 'user' }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.get('/api/materials', (req, res) => {
    res.json({ 
        success: true, 
        materials: [
            { id: 1, title: 'Maths Notes.pdf', url: '/demo.pdf' },
            { id: 2, title: 'Physics Notes.pdf', url: '/demo.pdf' }
        ]
    });
});

app.post('/api/materials/upload', upload.single('file'), (req, res) => {
    res.json({ success: true, message: 'File uploaded!' });
});

// Serve Frontend Files
app.use(express.static('../'));

app.listen(PORT, () => {
    console.log(`🚀 Server running: http://localhost:${PORT}`);
});