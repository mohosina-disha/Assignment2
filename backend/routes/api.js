const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const { getProfile, updateProfile, deleteProfile, uploadProfileImage } = require('../controllers/userController');
const { authenticate } = require('../middlewares');
const User = require('../models/User');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/register', upload.single('profile_image'), async (req, res) => {
    const { first_name, last_name, gender, date_of_birth, email, password } = req.body;
    const profile_image = req.file ? req.file.path : null;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            first_name,
            last_name,
            gender,
            date_of_birth,
            email,
            password: hashedPassword,
            profile_image_url: profile_image
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Server error:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token (add JWT implementation here)
        const token = 'generated-jwt-token';

        res.json({ token });
    } catch (err) {
        console.error('Server error:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.delete('/profile', authenticate, deleteProfile);
router.post('/profile/image', authenticate, upload.single('profile_image'), uploadProfileImage);

module.exports = router;
