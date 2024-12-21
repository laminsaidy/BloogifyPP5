import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const BlogList = ({ blogs, title, handleDelete }) => {
  const [showMenu, setShowMenu] = useState(null); // Tracks which blog menu is open

  const toggleMenu = (id) => {
    setShowMenu(showMenu === id ? null : id); // Toggle the menu for a specific blog
  };

  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          <div className="blog-content">
            {/* Link added to the blog title */}
            <Link to={`/blogs/${blog.id}`}>
              <h3>{blog.title}</h3>
            </Link>
            <p>{blog.body}</p>
            <p><i>By {blog.author}</i></p>
          </div>
          <div className="menu">
            <button onClick={() => toggleMenu(blog.id)}>⋮</button>
            {showMenu === blog.id && (
              <div className="dropdown-menu">
                <button
                  onMouseEnter={(e) => (e.target.textContent = "Are you sure?")}
                  onMouseLeave={(e) => (e.target.textContent = "Delete")}
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;