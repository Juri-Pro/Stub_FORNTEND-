const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/mern-app");

const configSchema = new mongoose.Schema({
  title: String,
  methodType: String,
  api: String,
  fields: [String],
  isAuthorization :Boolean
});
const methodSchema = new mongoose.Schema({
  name: String,
 
});

const obj = {
  name :'post',
}

const Config = mongoose.model("Config", configSchema);
const Meathod = mongoose.model("Types", methodSchema);

app.post("/api/config", async (req, res) => {
  const { title, methodType, api, fields ,isAuthorization } = req.body;
  const newConfig = new Config({ title, methodType, api, fields ,isAuthorization });
  await newConfig.save();
  res.status(201).json(newConfig);
});
// Create a new configuration
app.post("/api/config", async (req, res) => {
  const config = new Config(req.body);
  try {
    await config.save();
    res.status(201).send(config);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all configurations
app.get("/api/config", async (req, res) => {
  try {
    const configs = await Config.find({}, "title _id");
    res.status(200).send(configs);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/api/types", async (req, res) => {
  try {
    const method = await Meathod.find({});
    res.status(200).send(method);
  } catch (error) {
    res.status(500).send(error);
  }
});



// Get a specific configuration by ID
app.get("/api/config/:id", async (req, res) => {
  try {
    const config = await Config.findById(req.params.id);
    if (!config) {
      return res.status(404).send();
    }
    res.status(200).send(config);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
