const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { application } = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDir));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    owner: "Vladimir Putin.",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Helping brings satisfaction",
    title: "Help others",
    owner: "Jim Moriarty",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: " About Page",
    owner: "Naval Fleet",
  });
});

app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    owner: "Jack Ryan",
    errorMessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    owner: "Jack Ryan",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is On at port 3000");
});

// app.get("", (req, res) => {
//   res.send("<h1>Hello Express</h1>");
// });
// app.get("/help", (req, res) => {
//   res.send({
//     name: "Reacher",
//     age: 21,
//   });
// });

// console.log(__dirname);
// console.log(path.join(__dirname, "../public/index.html"));
