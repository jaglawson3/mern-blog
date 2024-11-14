const express = require('express');
const cors = require('cors');
const blogRouter = require('./route/blog-route')

require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter)

app.use('/api', (req, res) => {
    res.send('Hello There');
});

app.listen(5000, () => console.log('App is running on port 5000...'));
