import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const history = useHistory(); // For navigation after deletion or editing
  const [blog, setBlog] = useState(null); // State to store the blog details
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [likes, setLikes] = useState(0); // State for the number of likes
  const [dislikes, setDislikes] = useState(0); // State for the number of dislikes

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blogs?id=${id}`);
        if (!response.ok) {
          throw new Error("Could not fetch the data");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setBlog(data[0]); // Update blog state
        } else {
          setBlog(data); // Update blog state
        }
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the blog");
      }
      // Redirect to the main page after successful deletion
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLike = () => {
    setLikes(likes + 1); // Increment the like counter
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1); // Increment the dislike counter
  };

  const handleEdit = () => {
    history.push(`/edit/${id}`); // Redirect to the edit page for the current blog
  };

  return (
    <div className="blog-details">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>

          {/* Like/Dislike Buttons */}
          <div className="reaction-buttons">
            <button className="like-button" onClick={handleLike}>👍 Like {likes}</button>
            <button className="dislike-button" onClick={handleDislike}>👎 Dislike {dislikes}</button>
          </div>

          <div className="button-container">
            {/* Edit Button */}
            <button className="edit-button" onClick={handleEdit}>Edit</button>

            {/* Delete Button */}
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;