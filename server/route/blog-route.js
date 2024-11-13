const express = require("express");
const blogRouter = express.Router();

const {
  fetchListOfBlogs,
  addANewBlog,
  deleteABlog,
  updateABlog,
} = require("../controller/blog-controller");

blogRouter.get('/', fetchListOfBlogs);
blogRouter.post('/add', addANewBlog);
blogRouter.delete('/delete/:id', deleteABlog);
blogRouter.put('/update/:id', updateABlog);

module.exports = blogRouter;
