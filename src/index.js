// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

let db;

async function startServer() {
  try {
    const client = await MongoClient.connect('<URL>', {useUnifiedTopology: true});
    db = client.db('login-system');
    app.listen(3000, () => console.log('listening on 3000'));
  } catch (error) {
    console.error(error);
  }
}

startServer();


// Create the express app
const app = express();


// Define the schema for the user collection
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
// Create the user model
const User = mongoose.model('User', userSchema);

// Define the API routes

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  app.post('/login', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await db.collection('users').findOne({email: email});
      if (user && user.password === password) {
        res.cookie('email', email);
        res.redirect('/page2');
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.error(error);
    }
  });
  
  app.get('/page2', (req, res) => {
    if (req.cookies.email) {
      res.sendFile(__dirname + '/page2.html');
    } else {
      res.redirect('/');
    }
  });
  
  app.post('/submit', (req, res) => {
    const data = req.body.data;
    res.cookie('data', data);
    res.redirect('/page2');
  });
  
  app.post('/search', (req, res) => {
    const search = req.body.search;
    const data = req.cookies.data;
    if (data && data.includes(search)) {
      res.send(`Found: ${search}`);
    } else {
      res.send('Not found');
    }
  });
  
  app.post('/clear', (req, res) => {
    res.clearCookie('data');
    res.redirect('/page2');
  });
  
  app.post('/logout', (req, res) => {
    res.clearCookie('email');
    res.redirect('/');
  });