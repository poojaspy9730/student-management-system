const dbPromise = require('./config/db');

async function initializeDB() {
    try {
        const db = await dbPromise;

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                enrollment_date TEXT NOT NULL,
                major TEXT NOT NULL,
                status TEXT DEFAULT 'Active',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        await db.exec(createTableQuery);
        console.log("Students table created or already exists (SQLite).");
        console.log("Database initialization complete.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

initializeDB();
