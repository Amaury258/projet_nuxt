import mysql from "mysql2/promise";
import bluebird from "bluebird";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "myForums",
        Promise: bluebird
    });  


    await connection.query(`
        CREATE TABLE IF NOT EXISTS User (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role INT NOT NULL
        )
    `);
    
    await connection.query(`
        INSERT INTO User (username, password, role) VALUES
        ("admin", "admin", 1);
    `)
    
    await connection.query(`
        CREATE TABLE IF NOT EXISTS Forums (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titre VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );
    `);

    await connection.query(`
        INSERT INTO Forums (titre, description) VALUES
        ("Consigne d'utilisation du forum", "Les différentes consignes d'utilisation du forum et les explications des différentes fonctionnalités");
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS Sujet (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            forum_id INT NOT NULL,
            FOREIGN KEY (forum_id) REFERENCES Forums(id)
        );
    `);

    await connection.query(`
    INSERT INTO Sujet (title, description, forum_id) VALUES
    ("Règles d'utilisation", "Les règles d'utilisation du forum", 1),
    ("Comment poster un message", "Explication sur comment poster un message sur le forum", 1),
    ("Comment répondre à un message", "Explication sur comment répondre à un message sur le forum", 1);
`);


    await connection.query(`
        CREATE TABLE IF NOT EXISTS Message (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content TEXT NOT NULL,
            sujet_id INT NOT NULL,
            user_id INT NOT NULL,
            CONSTRAINT Message_fk1 FOREIGN KEY (sujet_id) REFERENCES Sujet(id),
            CONSTRAINT Message_fk2 FOREIGN KEY (user_id) REFERENCES User(id)
        );
    `);

    await connection.query(`
        INSERT INTO Message (content, sujet_id, user_id) VALUES
        ("Les règles d'utilisation sont les suivantes : ...", 1, 1),
        ("Pour poster un message, il suffit de cliquer sur le bouton 'Nouveau message'", 2, 1),
        ("Pour répondre à un message, il suffit de cliquer sur le bouton 'Répondre'", 3, 1);
    `);

    return {
        response: {
            status: 200,
            body: "Database initialized"
        }
    }
})