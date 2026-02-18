const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 3000;

let client;

async function connectWithRetry() {
    while (true) {
        try {
            
            client = new Client({
                host: "db",
                user: "user",
                password: "password",
                database: "mydb",
                port: 5432
            });

            await client.connect();
            console.log("Connected to Postgres!");
            break;

        } catch (err) {
            console.log("Waiting for database...");
            await new Promise(res => setTimeout(res, 2000));
        }
    }
}


async function start() {
    await connectWithRetry();

    // Create table if not exists
    await client.query(`
        CREATE TABLE IF NOT EXISTS visitors (
          id SERIAL PRIMARY KEY,
          visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    app.get("/", async (req, res) => {
        await client.query("INSERT INTO visitors DEFAULT VALUES");
        const result = await client.query("SELECT COUNT(*) FROM visitors")

        res.send(`<h1>Total Visits: ${result.rows[0].count}</h1>`);
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}

start();