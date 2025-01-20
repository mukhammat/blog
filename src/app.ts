import express from "express";
const app = express();
import {config} from "dotenv"; config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";

console.log(process.env.PORT);

app.listen(3000, (err) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`Server is running on ${HOST}:${PORT}`);
});