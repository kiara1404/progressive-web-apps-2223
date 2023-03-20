import express from "express";
import ejs from "ejs";
import * as path from "path";
import fetch from "node-fetch";

const app = express();
const port = 8000;

// set templating engine
app.set("view engine", "ejs");
//where the templates are stored
app.set("views", "views");

// public folder location
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// Routing
app.get("/", getIndex);
app.get("/scanner", getScanner);
app.get("/zoeken", getSearch);
app.get("/scanner/:id", fetchData);

const API_URL = "https://world.openfoodfacts.org/api/v0/product/";

function server() {
  console.log(
    "The server is running succesfully! 🎉 at https://http://localhost:8000/"
  );
}

function getIndex(req, res) {
  res.render("index");
}

function getSearch(req, res) {
  res.render("search");
}

function getScanner(req, res) {
  res.render("scanner");
}

// fetch data
async function fetchData(req, res) {
  try {

    const barcode = req.params.id;
    const response = await fetch(API_URL + barcode + "json");
    const data = await response.json();

    res.render("detail", {
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
}

app.listen(port, server);
