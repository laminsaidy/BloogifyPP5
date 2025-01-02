import React, { useState, useEffect } from "react";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [editingComment, setEditingComment] = useState(null); 
  const [editText, setEditText] = useState(""); 

  // Fetch comments only for the current blog
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/comments?blogId=${blogId}`);
        if (!response.ok) {
          throw new Error("Could not fetch comments");
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err.message);
      }
    };

    fetchComments();
  }, [blogId]); // Runs when blogId changes

  const handleAddComment = async (e) => {
    e.preventDefault();
    const commentToAdd = {
      id: Math.random().toString(36).substr(2, 9),
      blogId, // Link the comment to the current blog
      text: newComment,
      name: name.trim() || "Anonymous",
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentToAdd),
      });
      if (!response.ok) {
        throw new Error("Failed to post comment");
      }
      setComments((prevComments) => [...prevComments, commentToAdd]);
      setNewComment("");
      setName("");
    } catch (err) {
      console.error("Error posting comment:", err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err.message);
    }
  };

  const startEditingComment = (comment) => {
    setEditingComment(comment.id);
    setEditText(comment.text); 
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/comments/${editingComment}`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit comment");
      }

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editingComment ? { ...comment, text: editText } : comment
        )
      );
      setEditingComment(null); 
      setEditText("");
    } catch (err) {
      console.error("Error editing comment:", err.message);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            {editingComment === comment.id ? (
              <form onSubmit={handleEditComment} className="edit-form">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  required
                  className="edit-textarea"
                />
                <div className="edit-buttons">
                  <button type="submit" className="save-button">Save</button>
                  <button type="button" onClick={() => setEditingComment(null)} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="comment-content">
                <p>{comment.text}</p>
                <small>
                  By {comment.name || "Unknown"} on {new Date(comment.date).toLocaleString()}
                </small>
                <div className="comment-actions">
                  <button
                    onClick={() => startEditingComment(comment)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddComment} className="add-comment-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="name-input"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment here..."
          required
          className="comment-input"
        />
        <button type="submit" className="post-button">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;