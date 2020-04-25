const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ea2efeb1c850f39541a6034')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const port =  process.env.PORT || 3000;

mongoose
  .connect(
    'mongodb+srv://FirstDatabase:YowrxDQweYMkKBnm@cluster0-vfbhi.mongodb.net/Shop'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Vivek',
          email: 'guptavivek23198@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
