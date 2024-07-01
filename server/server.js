const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const dataFilePath = path.join(__dirname, "data.json");

// Helper function to read data from the JSON file
const readData = () => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
};

app.get("/", (req, res) => {
    res.send("Welcome to the server");
    });
// Get all records
app.get("/api/records", (req, res) => {
  const data = readData();
  res.json(data);
});

// Get a single record by id
app.get("/api/records/:id", (req, res) => {
  const data = readData();
  const record = data.find((r) => r.id === parseInt(req.params.id));
  if (record) {
    res.json(record);
  } else {
    res.status(404).json({ message: "Record not found" });
  }
});

// Create a new record
app.post("/api/records", (req, res) => {
  const data = readData();
  const newRecord = { id: Date.now(), ...req.body };
  data.push(newRecord);
  writeData(data);
  res.status(201).json(newRecord);
});

// Update an existing record by id
app.put("/api/records/:id", (req, res) => {
  const data = readData();
  const recordIndex = data.findIndex((r) => r.id === parseInt(req.params.id));
  if (recordIndex !== -1) {
    const updatedRecord = { ...data[recordIndex], ...req.body };
    data[recordIndex] = updatedRecord;
    writeData(data);
    res.json(updatedRecord);
  } else {
    res.status(404).json({ message: "Record not found" });
  }
});

// Delete a record by id
app.delete("/api/records/:id", (req, res) => {
  const data = readData();
  const newData = data.filter((r) => r.id !== parseInt(req.params.id));
  if (newData.length !== data.length) {
    writeData(newData);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Record not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
