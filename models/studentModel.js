const dbPromise = require('../config/db');

class StudentModel {
    static async getAll(search = '', sortBy = 'id', order = 'ASC') {
        const allowedSortColumns = ['id', 'first_name', 'last_name', 'email', 'enrollment_date', 'major', 'status'];
        const actualSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'id';
        const actualOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        let query = `SELECT * FROM students`;
        const params = [];

        if (search) {
            query += ` WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR major LIKE ?`;
            const searchParam = `%${search}%`;
            params.push(searchParam, searchParam, searchParam, searchParam);
        }

        query += ` ORDER BY ${actualSortBy} ${actualOrder}`;

        const db = await dbPromise;
        const rows = await db.all(query, params);
        return rows;
    }

    static async getById(id) {
        const db = await dbPromise;
        const row = await db.get('SELECT * FROM students WHERE id = ?', [id]);
        return row;
    }

    static async create(studentData) {
        const { first_name, last_name, email, enrollment_date, major, status } = studentData;
        const db = await dbPromise;
        const result = await db.run(
            `INSERT INTO students (first_name, last_name, email, enrollment_date, major, status) VALUES (?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, email, enrollment_date, major, status]
        );
        return result.lastID;
    }

    static async update(id, studentData) {
        const { first_name, last_name, email, enrollment_date, major, status } = studentData;
        const db = await dbPromise;
        const result = await db.run(
            `UPDATE students SET first_name=?, last_name=?, email=?, enrollment_date=?, major=?, status=? WHERE id=?`,
            [first_name, last_name, email, enrollment_date, major, status, id]
        );
        return result.changes;
    }

    static async delete(id) {
        const db = await dbPromise;
        const result = await db.run('DELETE FROM students WHERE id = ?', [id]);
        return result.changes;
    }
}

module.exports = StudentModel;
