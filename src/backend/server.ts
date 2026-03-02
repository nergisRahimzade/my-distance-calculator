import express from "express";
import cors from "cors";

const app = express();
app.use(cors({origin: "http://localhost:5173"})); //your Vite dev server

app.get("/api/distance", async (req, res) => {
  const { origin, destination, mode } = req.query;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&mode=${mode}&key=${process.env.VITE_GOOGLE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  res.json(data);
});

app.listen(3000, () => console.log('Server is alive on PORT 3000!'));
