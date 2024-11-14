import { useContext, useEffect, useCallback } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./styles.module.css";

export default function AddBlog() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSaveToDatabase() {
    try {
      const response = isEdit
        ? await axios.put(`http://localhost:5000/api/blogs/update/${location.state?.getCurrentBlogItem._id}`, {
            title: formData.title,
            description: formData.description,
          })
        : await axios.post("http://localhost:5000/api/blogs/add", {
            title: formData.title,
            description: formData.description,
          });

      if (response.data) {
        setIsEdit(false);
        setFormData({ title: "", description: "" });
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to save the blog:", error);
    }
  }

   useEffect(() => {
    if (location.state?.getCurrentBlogItem) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);
      setFormData({ title: getCurrentBlogItem.title, description: getCurrentBlogItem.description });
    }
  }, [location.state, setFormData, setIsEdit]);

  // Update form data for title
  const handleTitleChange = useCallback(
    (e) => {
      setFormData((prevData) => ({ ...prevData, title: e.target.value }));
    },
    [setFormData]
  );

  // Update form data for description
  const handleDescriptionChange = useCallback(
    (e) => {
      setFormData((prevData) => ({ ...prevData, description: e.target.value }));
    },
    [setFormData]
  );
  
  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit Your Blog" : "Add a blog"}</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Enter blog title"
          id="title"
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
        />
        <textarea
          name="description"
          placeholder="Enter blog description"
          id="description"
          value={formData.description}
          onChange={handleDescriptionChange}
        />
        <button onClick={handleSaveToDatabase}>
          {isEdit ? "Update Blog" : "Add New Blog"}
        </button>
      </div>
    </div>
  );
}
