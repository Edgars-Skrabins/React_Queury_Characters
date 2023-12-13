import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

const dbName = "characters_db";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to server', err);
        return;
    }

    console.log('Connected to server');

    db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (error) => {
        if (error) {
            console.error('Error creating database', error);
        } else {
            console.log(`Database ${dbName} created or already exists`);
        }

        db.query(`USE ${dbName}`, (useDbError) => {
            if (useDbError) {
                console.error('Error switching to todo_list_db', useDbError);
            } else {
                console.log(`Switched to database "${dbName}"`);

                const createTableQuery = `
                    CREATE TABLE IF NOT EXISTS characters (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        age TEXT,
                        interest TEXT,
                        skill TEXT
                    )
                `;

                db.query(createTableQuery, (tableError) => {
                    if (tableError) {
                        console.error('Error creating characters table', tableError);
                    } else {
                        console.log('characters table created or already exists');
                    }
                });
            }
        });
    });
});

app.use(express.json());

app.get('/characters', (req, res) => {
    db.query('SELECT * FROM characters', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/characters', (req, res) => {
    const newCharacter = req.body;
    newCharacter.id = Math.random();

    db.query('INSERT INTO characters SET ?', newCharacter, (error, result) => {
        if (error) throw error;
        newCharacter.id = result.insertId;
        res.json(newCharacter);
    });
});

app.put('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCharacter = req.body;

    db.query('UPDATE characters SET ? WHERE id = ?', [updatedCharacter, id], (error) => {
        if (error) throw error;
        res.json(updatedCharacter);
    });
});

app.delete('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.query('DELETE FROM characters WHERE id = ?', id, (error) => {
        if (error) throw error;
        res.json({message: 'Characters deleted successfully'});
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
