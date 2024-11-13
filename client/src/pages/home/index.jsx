import { useEffect, useContext } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { FaTrash, FaEdit } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import classes from './styles.module.css'

export default function Home() {
  const {blogList, setBlogList, pending, setPending, isEdit, setIsEdit} =
    useContext(GlobalContext);

  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;

    if (result && result.blogList && result.blogList.length){
        setBlogList(result.blogList);
        setPending(false);
    } else {
        setPending(false);
        setBlogList('');
    }
  }

  async function handleDeleteBlog(getCurrentId){
    const response = await axios.delete(
        `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;
    if(result?.message) {
        fetchListOfBlogs(result.message); 
    }
  }

  function handleEditBlog(getCurrentBlogItem){
    navigate('/add-blog', {state: {getCurrentBlogItem}})
  }

  useEffect(() => {
    fetchListOfBlogs();
  });
  
  return (
    <div>
      <h1>Blog List</h1>
      {
        pending ? <h4>Loading Blogs...</h4> :
        <div className={classes.blogList}>
            {
                blogList && blogList.length ? blogList.map(blogItem => (
                <div className={classes.blogCard} key={blogItem._id}>
                    <h4>{blogItem.title}</h4>
                    <p>{blogItem.description}</p>
                    <FaEdit onClick={() => handleEditBlog(blogItem)} size={20} color='gray' />
                    <FaTrash onClick={() => handleDeleteBlog(blogItem._id)} size={20} color='red' />
                </div>
                )) : <h3>No blogs added yet.</h3>
            }
        </div>  
      }
    </div>
  );
}
