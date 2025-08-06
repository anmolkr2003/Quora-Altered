const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const { v4: uuidv4 } = require('uuid');
uuidv4();  // Initialize UUID for unique IDs


let posts = [
    {
        id: uuidv4(),
        username: 'JohnDoe',
        content: 'This is my first post!'
    },
    {
        id: uuidv4(),
        username: 'JaneSmith',
        content: 'Hello everyone, I am new here!'
    },
    {
        id: uuidv4(),
        username: 'Alice',
        content: 'Loving the community so far!'
    }
];


app.get('/posts', (req, res) => {
  res.render('Home.ejs', { posts: posts });   
  
});

app.get('/posts/new', (req, res) => {
  res.render('new.ejs');    
});

app.post('/posts', (req, res) => {
    let {username, content} = req.body;
    let id  = uuidv4();
    posts.push({
        id, username,
        content});
    res.redirect('/posts');
  });

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  // console.log("Requested ID:", id);

  const post = posts.find(p => p.id === id);
  // console.log("Found post:", post);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render('show.ejs', { post });
}) ;


app.patch('/posts/:id', (req, res) => {
  const { id } = req.params; 
  let newContent = req.body.content;
  let post = posts.find(p => p.id === id);
  post.content = newContent;
  // console.log("Updated post:", post);
  res.redirect('/posts');

  

});

app.get('/posts/:id/edit', (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render('edit.ejs', { post });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});