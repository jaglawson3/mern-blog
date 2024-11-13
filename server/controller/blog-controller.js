const mongoose = require("mongoose");
const Blog = require("../model/Blog");

// fetch list of blogs

const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(error);
  }

  if (!blogList) {
    return res.status(404).json({ message: "No blogs were found" });
  }

  return res.status(200).json({ blogList });
};


//add a new blog

const addANewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blog({
    title,
    description,
    date: currentDate,
  });

  try {
    await newlyCreatedBlog.save();
  } catch (e) {
    console.log(e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save({ session });
    session.commitTransaction();
  } catch (e) {
    return res.send(500).json({ message: "Error saving blog" });
  }

  return res.status(200).json({ newlyCreatedBlog });
};


//delete a blog

const deleteABlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(400).json({ message: "Error deleting blog" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Unable to delete blog, please try again" });
  }
};


//update a blog

const updateABlog = async (req, res) => {
  const id = req.params.id;

  const { title, description } = req.body;

  let currentBlogToUpdate;

  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });

    if (!currentBlogToUpdate) {
      return res.status(400).json({ message: "Error updating blog" });
    }

    return res.status(200).json(currentBlogToUpdate);

  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Unable to update blog, please try again" });
  }
};

module.exports = {fetchListOfBlogs, addANewBlog, deleteABlog, updateABlog}
