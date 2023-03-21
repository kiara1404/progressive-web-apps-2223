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
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/scanner", (req, res) => {
  res.render("scanner");
});

app.get("/zoeken", (req, res) => {
  res.render("search");
});

app.post("/bewaren", (req, res) => {
  const productId = req.body.product_id;
  console.log(req.body.product_id);
  res.redirect(`/products/${productId}`);
});

// search
app.get("/zoek", async (req, res) => {
  const response = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${req.query.query}&search_simple=1&action=process&json=1`
  );
  const data = await response.json();
  const cleanProductsArray = data.products.map(item => {
    try {
      return {
        id: item._id,
        name: item.brands,
        image: item.image_front_url,
      };
    } catch (e) {
      console.log(e);
    }
  });
  res.render("results", {
    data: cleanProductsArray.slice(0, 5),
    query: req.query.query,
  });
});

app.get("/products/:id", async (req, res) => {
  const API_URL = "https://world.openfoodfacts.org/api/v0/product/";
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
});

app.listen(port, () => {
  console.log(
    "The server is running succesfully! 🎉 at https://http://localhost:8000/"
  );
});
