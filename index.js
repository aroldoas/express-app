import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory data
let items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
];

// Routes

// GET all
app.get("/items", (req, res) => {
  res.json(items);
});

// GET one
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ error: "Item not found" });
});

// POST
app.post("/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name || `Item ${items.length + 1}`,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.name = req.body.name || item.name;
  res.json(item);
});

// DELETE
app.delete("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  const [deleted] = items.splice(index, 1);
  res.json(deleted);
});

// Health check
app.get("/", (req, res) => {
  res.send("Express app with ES modules is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
