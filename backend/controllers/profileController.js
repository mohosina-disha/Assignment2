const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');

const getProfile = async (req, res) => {
    try {
        User.findById(req.user.id, (err, user) => {
            if (err) return res.status(500).json({ message: 'Server error' });
            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user[0]);
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateProfile = async (req, res) => {
    const { first_name, last_name, gender, date_of_birth, email, password } = req.body;

    try {
        User.findById(req.user.id, async (err, user) => {
            if (err) return res.status(500).json({ message: 'Server error' });
            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const updatedData = { first_name, last_name, gender, date_of_birth, email };
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updatedData.password = hashedPassword;
            }

            User.update(req.user.id, updatedData, (err, result) => {
                if (err) return res.status(500).json({ message: 'Server error' });
                res.json({ message: 'Profile updated successfully' });
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteProfile = async (req, res) => {
    try {
        User.delete(req.user.id, (err, result) => {
            if (err) return res.status(500).json({ message: 'Server error' });
            res.json({ message: 'Account deleted successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const uploadProfileImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = path.join('/uploads', req.file.filename);

    try {
        await User.update(req.user.id, { profile_image: imagePath });
        res.json({ message: 'Profile image updated successfully', profile_image: imagePath });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProfile, updateProfile, deleteProfile, uploadProfileImage };