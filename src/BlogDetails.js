import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from the URL
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
        debugger;
        if(Array.isArray(data) && data.length > 0){
          setBlog(data[0]); // Update blog state
        }
        else{
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

  return (
    <div className="blog-details">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;