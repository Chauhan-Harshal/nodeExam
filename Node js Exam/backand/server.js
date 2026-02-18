const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const commentRoutes = require('./routes/comments');
// initialize mongoose connection
const mongo = require('./models/mongo');

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middleware setups
app.use(express.json());
app.use(cookieParser());

// connect to MongoDB
mongo.connect();

//  user for templates if token is present (optional auth)
app.use((req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (token) {
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      
    }
  }
  res.locals.user = req.user;
  next();
});

// routes
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
// comments nested under articles
app.use('/articles/:articleId/comments', commentRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
