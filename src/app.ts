import express, { Application } from "express";
import db from "./models"; // Ensure this path is correct or the module exists

const app: Application = express();

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello World ! Here is your Express.js backend")
});

// Synchronize models with database
db.sequelize.sync().then(() => {
    console.log('Database synchronized');
    // http://localhost:3000/
    app.listen(3000, () => {
        console.log('Server is up and listening on port 3000');
    });
});