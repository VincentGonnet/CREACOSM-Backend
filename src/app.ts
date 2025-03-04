import express, { Application } from "express";
import db from "./models"; // Ensure this path is correct or the module exists

const app: Application = express();

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello World ! Here is your Express.js backend")
});

async function authenticateDatabase(retries = 5, delay = 3000) {
    while (retries > 0) {
        try {
            await db.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            break;
        } catch (error) {
            console.error('Unable to connect to the database');
            retries -= 1;
            console.log(`Retries left: ${retries}`);
            if (retries === 0) {
                console.error('All retries exhausted. Exiting.');
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

async function startServer() {
    try {
        // Wait for database connection
        await authenticateDatabase();

        // Synchronize models with database
        await db.sequelize.sync();
        console.log('Database synchronized');

        // Start the server
        app.listen(3000, () => {
            console.log('Server is up and listening on port 3000');
        });
        
    } catch (error) {
        console.error('Unable to start the server :', error);
    }
}

startServer();