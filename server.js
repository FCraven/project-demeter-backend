const express = require('express');
const app = express();
const morgan = require('morgan')
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})),

app.get('/', (req,res,next)=> {
  res.send('<h1>Basic server get route at / </h1>')
})


app.listen(PORT, ()=> {
  console.log(`Server listening on https://localhost:${PORT}`)
});
