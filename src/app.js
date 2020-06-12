const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//DEFINE Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory serve
app.use(express.static(publicDirectoryPath));


app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "TATO PIPO",
    age: 'POWERFULL'
  });
});

app.get('/help', (req,res) => {
  res.render('help', {
    name: 'Michelito',
    helpText: 'HElp',
    author: 'MIRELITO',
    title: 'HelpME!'
  })
})

app.get("/about", (req, res) => {
  res.render('about', {
    title: 'PERRO ASESINO',
    name:'PERRITO'

  });
})

//  app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>');
//  })

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'Enter a valid CITY'
    })
  }else {
    geocode(req.query.address, (error, data) => {
      if(error != undefined){
        return res.send({
           error: error
        })
      }else {
        forecast(data, (error, data) => {
          if(error != undefined){
            return res.send({
              error
            })
          }else {
            res.send(data);
          }
        })
      }    
    })
  }
  

});

app.get('/products', (req, res) => {

  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query);

  res.send({
    products: []
  })
})


app.get('/help/*', (req, res) => {
  res.render('404error', {
    name: 'Michel',
    title: '404 page',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404error', {
    name: 'Michel',
    title: '404 page',
    errorMessage: "Page not found"
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
