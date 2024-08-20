const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://kavinda99ac:VoUM8sggFwBSSfXJ@cluster0.mj3usny.mongodb.net/mern_auth?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: 'dmtth8w3w', 
    api_key: '336777251736269', 
    api_secret: 'S6wWJ8RGQJUSDVC7jTkXLs3c9jc' // Click 'View Credentials' below to copy your API secret
});

// Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_pictures',
        format: async (req, file) => 'png',
        public_id: (req, file) => `${req.user.userId}_profile`
    },
});

const upload = multer({ storage: storage });

// User Model
const User = mongoose.model('User', {
    username: { type: String, unique: true },
    email: String,
    password: String,
    role: String,
    profilePicture: String
});

// Routes
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();
        
        const token = jwt.sign({ userId: user._id, role: user.role }, '60b4961576e5112d848c452e1a17bb480f4d5943d43510a01660ab1c02fd4fc3150b08b5b2b94d5ab8c165eb7e2cb8a7f1404bc83e7f50d821988969ee35fdb2');
        res.status(201).json({ message: 'User created successfully', token, role: user.role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, '60b4961576e5112d848c452e1a17bb480f4d5943d43510a01660ab1c02fd4fc3150b08b5b2b94d5ab8c165eb7e2cb8a7f1404bc83e7f50d821988969ee35fdb2');
        res.json({ token, role: user.role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/upload', upload.single('profilePicture'), async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from the request, typically from a middleware
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.profilePicture = req.file.path;
        await user.save();
        res.status(200).json({ message: 'Profile picture updated successfully', profilePicture: user.profilePicture });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
