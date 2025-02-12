const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://raze:raze@localhost:5432/quicknotes",
});
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/api/notes", async (req, res) => {
  const results = await pool.query("SELECT * FROM notes ORDER BY id DESC");
  res.json(results.rows); // ✅ Correct method
});
app.post("/api/notes", async (req, res) => {
  const { text } = req.body;
  const results = await pool.query(
    "INSERT INTO notes (text) VALUES ($1) RETURNING *",
    [text]
  );
  res.json(results.rows[0]);
});
app.delete("/api/notes/:id", async (req, res) => {
  await pool.query("DELETE FROM notes WHERE id = $1", [req.params.id]);
  res.json({ message: "note deleted" }); // ✅ Correct method
});
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
