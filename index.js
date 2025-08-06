const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


let posts = [
    {
        username: 'JohnDoe',
        content: 'This is my first post!'
    },
    {
        username: 'JaneSmith',
        content: 'Hello everyone, I am new here!'
    },
    {
        username: 'Alice',
        content: 'Loving the community so far!'
    }
];


app.get('/posts', (req, res) => {
  res.render('Home.ejs', { posts: posts });   
  
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});