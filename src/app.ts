import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import petRouter from "./routes/pet.route";
import adoptionRouter from "./routes/adoption.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/pets", petRouter);
app.use("/api/adoptions", adoptionRouter);

app.get("/", (req, res) => {
  res.send("Pet Adoption Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
