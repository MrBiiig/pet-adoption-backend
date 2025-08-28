import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pet Adoption Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
