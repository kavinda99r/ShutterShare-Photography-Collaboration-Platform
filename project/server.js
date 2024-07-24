const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongoDB url', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// User Model
const User = mongoose.model('User', {
    username: { type: String, unique: true },
    email: String,
    password: String,
    role: String
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
        
        const token = jwt.sign({ userId: user._id, role: user.role }, '78bbc0ccc1ec22f85449a2429956de92a6e2079fa34dfdad527db6c890db1964bc279146c3e082fc34d2733442f158984e87983665307c4798389cae756275de');
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
        const token = jwt.sign({ userId: user._id, role: user.role }, '78bbc0ccc1ec22f85449a2429956de92a6e2079fa34dfdad527db6c890db1964bc279146c3e082fc34d2733442f158984e87983665307c4798389cae756275de');
        res.json({ token, role: user.role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
