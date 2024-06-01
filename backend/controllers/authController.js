const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res) => {
    const { first_name, last_name, gender, date_of_birth, email, password } = req.body;

    try {
        const existingUser = await new Promise((resolve, reject) => {
            User.findByEmail(email, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            first_name,
            last_name,
            gender,
            date_of_birth,
            email,
            password: hashedPassword,
            profile_image: req.file ? path.join('/uploads', req.file.filename) : null
        };

        await new Promise((resolve, reject) => {
            User.create(newUser, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login };
