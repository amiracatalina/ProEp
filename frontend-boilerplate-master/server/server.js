require('@babel/register')({
  "presets": [
    ["@babel/env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
})


const express = require('express'),
    app = express();
const path = require('path');
const nunjucks = require("./njkConfiguration");
const RestaurantService = require('./RestaurantCall');
nunjucks.nunj(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Running on PORT: ' + port));
app.use('/static', express.static(path.resolve(__dirname, '../dist/static')));

//redirect to home page
app.all('/', async (req, res) => {
  res.redirect('/home');
})

//store data
let categoryData =[]
let data = {
  cardsData: {
    cards:
      {
        "id": "",
        "nameRestaurant": "",
        "src": "",
        "rating": "",
        "type": "",
        "nrReviews": "",
        "locationRestaurant": " "
      }
  }
}

//Home page render
app.use('/home', async(req, res) => {
  //get data in array
  data.cardsData.cards = await RestaurantService.getAllRestaurants();
  categoryData = data.cardsData.cards

  //parse data and sort,find first 3 with the biggest rating
  data.cardsData.cards = RestaurantService.getTopRated(categoryData)
  res.render('home', data);

  return categoryData
});

//Search page with a list of restaurant
app.use('/search',  async (req, res) => {
  //get all restaurants
  categoryData = data.cardsData.cards
  res.render('search', data);
});

app.use('/singleRestaurant/:id', async (req, res) => {
  req.params.id = id;
  data.cardsData = await RestaurantService.getSingleRestaurantByID(categoryData, req.params.id)
  res.render('singleRestaurant', data)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
});

module.exports = app;
