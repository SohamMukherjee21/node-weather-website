const express = require("express");
const hbs = require("hbs");
const path = require("path");
const web = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicpathDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

const port = process.env.PORT || 3000;

web.use(express.static(publicpathDirectory));

web.set("view engine", "hbs");
web.set("views", viewPath);
//This is done to show that you can change the name and set it to something different than views(or keep the name same but don't put "views" folder in the project root), but to make things work as earlier, inside web.set() we have to give the key as "views" and the corresponding value will be the path to reach that directory
hbs.registerPartials(partialsPath);
//registerPartials takes a path to the directory where the partials live

web.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Soham Mukherjee",
  });
});

//res.render(...., ....):=> The first arguement should be just the name of the hbs file,just the name and the second object (which is optional contains various key,value pairs)

web.get("/about", (req, res) => {
  res.render("about", {
    title: "About the site",
    author: "Soham Mukherjee",
  });
});

web.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "This is a helpful message",
    title: "Help",
    author: "Soham Mukherjee",
  });
});

web.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      Error: "You must provide an address",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          res.send({
            Error: error,
          });
        } else {
          forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
              res.send({
                Error: error,
              });
            } else {
              res.send({
                Latitude: latitude,
                Longitude: longitude,
                Forecast: forecastData,
                Location: location,
                Address: req.query.address,
              });
            }
          });
        }
      }
    );
  }
});

web.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

web.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    author: "Soham Mukherjee",
    errorMessage: "Help article not found",
  });
});

web.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    author: "Soham Mukherjee",
    errorMessage: "No such page exists",
  });
});

web.listen(port, () => {
  console.log("Server started on port port");
});

//  1) Something about header.hbs(inside the partials folder) and nodemon
// 1.a) this file in partials doesn't accept whole html files, it accepts a part of them like a header tag, a paragraph etc
// 1.b) to take into consideration the changes made to hbs, we need to configure nodemon by writing in the terminal the command: nodemon src/app.js -e js,hbs . -e means the extensions nodemon should look after

// 2) something about loading partials from header.hbs to filer like index.hbs, about.hbs etc
// 2.a) Inside the curly braces, we just provide the file name of partials and not the whole directory  for example, you need to just write {{>header}} as header.hbs is the file

// 2.b) Still things will not work as expected as nodemon doesn't restart on saving the hbs file, it only is affected by changes in app.js file, we need to fix this(look into 1.b note)
