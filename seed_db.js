const dbPromise = require('./config/db');

async function seedDB() {
    try {
        const db = await dbPromise;

        const students = [
            ['Alice', 'Smith', 'alice.smith@university.edu', '2023-09-01', 'Computer Science', 'Active'],
            ['Bob', 'Johnson', 'bob.johnson@university.edu', '2022-09-01', 'Business Administration', 'Active'],
            ['Charlie', 'Davis', 'charlie.davis@university.edu', '2021-09-01', 'Mechanical Engineering', 'Graduated'],
            ['Diana', 'Evans', 'diana.evans@university.edu', '2024-01-15', 'Psychology', 'Active'],
            ['Evan', 'Wright', 'evan.wright@university.edu', '2023-09-01', 'Biology', 'Inactive']
        ];

        console.log("Seeding database...");

        for (const student of students) {
            await db.run(
                `INSERT OR IGNORE INTO students (first_name, last_name, email, enrollment_date, major, status) VALUES (?, ?, ?, ?, ?, ?)`,
                student
            );
        }

        console.log("Database seeded successfully with sample students!");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

seedDB();
