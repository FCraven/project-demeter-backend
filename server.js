require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan')
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const { User } = require('./db')


process.env.NODE_ENV === 'production' ?
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
:
  mongoose.connect('mongodb://localhost/project-demeter-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

app.use(morgan('dev'))
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})),

app.get('/', (req,res,next)=> {
  res.send('<h1>Basic server get route at / </h1>')
})

app.get('/api/users', async (req,res,next)=> {
  try {
    const users = await User.find({});
    res.json(users)
  }catch(err) {
    next(err)
  }
})

app.post('/api/users', async (req,res,next) => {
  try {
    const userData = req.body;
    const newUser = await User.create(userData)
    console.log('new User --> ', newUser)
    res.json(newUser)
  } catch(err) {
      next(err)
  }
})


app.listen(PORT, ()=> {
  console.log(`Server listening on https://localhost:${PORT}`)
});
