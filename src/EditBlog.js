import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const history = useHistory(); // Hook to handle history and redirection
  const [blog, setBlog] = useState({ title: '', body: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the current blog data
    const fetchBlog = async () => {
      const response = await fetch(`http://localhost:5000/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Send PUT request to update the blog
    const response = await fetch(`http://localhost:5000/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });

    if (response.ok) {
      const updatedBlog = await response.json();
      console.log('Blog updated:', updatedBlog);
      history.push('/'); // Redirect to Home page after successful update
    } else {
      console.log('Failed to update blog');
    }

    setIsLoading(false);
  };

  return (
    <div className="edit-blog">
      <h2>Edit Blog</h2>
      {isLoading && <p>Updating...</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={blog.body}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;