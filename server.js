require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan')
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const { User } = require('./db')
const routes = require('./controllers')


if(process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
} else {
  console.log('Using local database =-> demeter')
  mongoose.connect('mongodb://localhost/demeter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

app.use(morgan('dev'))
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})),

app.use(routes)

app.listen(PORT, ()=> {
  console.log(`Server listening on https://localhost:${PORT}`)
});
