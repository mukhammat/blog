import express from "express";
const app = express();
import {config} from "dotenv"; config();
import {sequelize} from "./config/sequelize";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";

console.log(process.env.PORT);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server is running on ${HOST}:${PORT}`));
    } catch (err) {
        console.error(err);
    }
};

start();