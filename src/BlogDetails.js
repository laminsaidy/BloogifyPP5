import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import CommentSection from "./CommentSection";

const API_URL = "https://drf-api-5-7396418269ad.herokuapp.com/"; // Your API URL

// Fetch initial counts (likes and dislikes) for the blog post
const getCounts = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/blogposts/${postId}`);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return { likes: data[0].likes || 0, dislikes: data[0].dislikes || 0 };
    }
    return { likes: 0, dislikes: 0 };
  } catch (error) {
    console.error("Error fetching counts:", error);
    return { likes: 0, dislikes: 0 };
  }
};

// Update like count in the backend
const updateLikes = async (postId, likes) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    });
    return response.json();
  } catch (error) {
    console.error("Error updating likes:", error);
  }
};

// Update dislike count in the backend
const updateDislikes = async (postId, dislikes) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dislikes }),
    });
    return response.json();
  } catch (error) {
    console.error("Error updating dislikes:", error);
  }
};

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
        const response = await fetch(`${API_URL}/blogposts/${id}`);
        if (!response.ok) {
          throw new Error("Could not fetch the data");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setBlog(data[0]); // Update blog state
          // Fetch the like/dislike counts for the blog
          const { likes, dislikes } = await getCounts(id);
          setLikes(likes);
          setDislikes(dislikes);
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
      const response = await fetch(`${API_URL}/blogposts/${id}`, {
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

  const handleLike = async () => {
    const newLikes = likes + 1;
    await updateLikes(id, newLikes); // Update the like count in the backend
    setLikes(newLikes); // Update the state
  };

  const handleDislike = async () => {
    const newDislikes = dislikes + 1;
    await updateDislikes(id, newDislikes); // Update the dislike count in the backend
    setDislikes(newDislikes); // Update the state
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
            <button className="like-button" onClick={handleLike}>
              👍 Like {likes}
            </button>
            <button className="dislike-button" onClick={handleDislike}>
              👎 Dislike {dislikes}
            </button>
          </div>

          <div className="button-container">
            {/* Edit Button */}
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>

            {/* Delete Button */}
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>

          {/* Comment Section */}
          <CommentSection blogId={id} />
        </article>
      )}
    </div>
  );
};

export default BlogDetails;