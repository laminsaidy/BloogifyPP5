import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from './BlogList'; // Import BlogList component

function SearchResults({ searchTerm }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/blogposts/search', {
          params: { q: searchTerm }, // Pass searchTerm as query parameter
        });
        setBlogs(response.data); // Set fetched blogs to state
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchBlogs();
    } else {
      setBlogs([]); // Clear the blogs if searchTerm is empty
    }
  }, [searchTerm]); // Trigger fetching whenever the searchTerm changes

  return (
    <div>
      <h2>Search Results for "{searchTerm}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BlogList blogs={blogs} /> // Pass the blogs state to BlogList component
      )}
    </div>
  );
}

export default SearchResults;