import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import CommentSection from "./CommentSection";

const API_URL = "https://cuddly-computing-machine-qw64wq5w65rhx4qq-8000.app.github.dev/";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [blogs, setBlogs] = useState([]); // Change to an array for multiple blogs
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogposts`);
        if (!response.ok) {
          throw new Error("Failed to fetch the blog posts");
        }
        const data = await response.json();
        // Initialize likes and dislikes to 0 if undefined
        const updatedBlogs = data.map((blog) => ({
          ...blog,
          likes: typeof blog.likes === "number" ? blog.likes : 0,
          dislikes: typeof blog.dislikes === "number" ? blog.dislikes : 0,
        }));
        setBlogs(updatedBlogs);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleVote = async (blogId, voteType) => {
    try {
      const response = await fetch(`${API_URL}/blogposts/${blogId}/vote/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote_type: voteType }),
      });
      if (!response.ok) {
        throw new Error("Failed to cast your vote");
      }

      // Update the likes and dislikes count in the blog list
      const updatedBlogs = blogs.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              likes: voteType === "up" ? blog.likes + 1 : blog.likes,
              dislikes: voteType === "down" ? blog.dislikes + 1 : blog.dislikes,
            }
          : blog
      );
      setBlogs(updatedBlogs);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`${API_URL}/blogposts/${blogId}/`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the blog");
      }
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (blogId) => {
    history.push(`/edit/${blogId}`);
  };

  return (
    <div className="blog-details">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <article key={blog.id}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <div>{blog.content}</div>

            <div className="reaction-buttons">
              <button onClick={() => handleVote(blog.id, "up")}>
                👍 Like {blog.likes}
              </button>
              <button onClick={() => handleVote(blog.id, "down")}>
                👎 Dislike {blog.dislikes}
              </button>
            </div>

            <div className="button-container">
              <button onClick={() => handleEdit(blog.id)}>Edit</button>
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
            </div>

            <CommentSection blogId={blog.id} />
          </article>
        ))
      )}
    </div>
  );
};

export default BlogDetails;