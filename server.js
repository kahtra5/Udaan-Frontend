import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 8000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle all other requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});