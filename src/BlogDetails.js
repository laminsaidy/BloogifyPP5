import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import CommentSection from "./CommentSection";

const API_URL = "https://curly-adventure-6jw5jgxj74rc47vx-8000.app.github.dev";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_URL}/blogposts/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch the blog post");
        }
        const data = await response.json();
        setBlog(data);
        setLikes(data.likes || 0); // Default to 0 if not provided
        setDislikes(data.dislikes || 0); // Default to 0 if not provided
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleVote = async (voteType) => {
    try {
      const response = await fetch(`${API_URL}/blogposts/${id}/vote/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote_type: voteType }),
      });
      if (!response.ok) {
        throw new Error("Failed to cast your vote");
      }
      const updatedVote = await response.json();
      if (voteType === "up") {
        setLikes((prevLikes) => prevLikes + 1);
      } else if (voteType === "down") {
        setDislikes((prevDislikes) => prevDislikes + 1);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/blogposts/${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the blog");
      }
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };

  return (
    <div className="blog-details">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.content}</div>

          <div className="reaction-buttons">
            <button onClick={() => handleVote("up")}>
              👍 Like {likes}
            </button>
            <button onClick={() => handleVote("down")}>
              👎 Dislike {dislikes}
            </button>
          </div>

          <div className="button-container">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>

          <CommentSection blogId={id} />
        </article>
      )}
    </div>
  );
};

export default BlogDetails;