const connection = require('../config/db');

const User = {
    create: (userData, callback) => {
        const query = 'INSERT INTO users SET ?';
        connection.query(query, userData, callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        connection.query(query, [id], callback);
    },
    update: (id, userData, callback) => {
        const query = 'UPDATE users SET ? WHERE id = ?';
        connection.query(query, [userData, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        connection.query(query, [id], callback);
    }
};

module.exports = User;
