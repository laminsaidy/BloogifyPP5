import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const history = useHistory(); // For navigation after deletion
  const [blog, setBlog] = useState(null); // State to store the blog details
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

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

  return (
    <div className="blog-details">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <div className="button-container">
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
