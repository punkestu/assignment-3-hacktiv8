const express = require("express");
const app = express();
app.use(express.json());

const routes = require("../route");
app.use(routes);

module.exports = app;