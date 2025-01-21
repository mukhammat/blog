import express from "express"; const app = express();
import router from "./routers";

app.use(express.json());
app.use("/api", router);

const PORT = 3000;
const HOST = "http://localhost";

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});