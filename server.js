const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(dirname, "dist")));

// Handle all other requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve(dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});