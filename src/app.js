const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3333;

// Define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to server
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Sonu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "Sonu",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Don't help him",
    name: "Sonu",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    error: "Help article not found.",
    name: "Sonu",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    error: "Page not found.",
    name: "Sonu",
  });
});

app.listen(port, () => {
  console.log("Server is up and running at port " + port);
});
