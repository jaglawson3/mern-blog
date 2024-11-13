import { useContext } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./styles.module.css";

export default function AddBlog() {
  const { formData, setFormData } = useContext(GlobalContext);
  const navigate = useNavigate();

  async function handleSaveToDatabase() {
    const response = await axios.post("http://localhost:5000/api/blogs/add", {
      title: formData.title,
      description: formData.description,
    });

    const result = await response.data;

    console.log(result);
    if (result) {
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  console.log(formData);
  return (
    <div className={classes.wrapper}>
      <h1>Add a blog</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Enter blog title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter blog description"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
        <button onClick={handleSaveToDatabase}>Add New Blog</button>
      </div>
    </div>
  );
}
