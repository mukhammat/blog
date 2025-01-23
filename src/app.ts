import express from "express"; const app = express();
import router from "./routers";
import {setupSwagger} from "./utils/swagger";
import { config } from "dotenv"; config();

app.use(express.json());
app.use("/api", router);
setupSwagger(app);


const PORT = 3000;
const HOST = "http://localhost";

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});