import React, { useState, useEffect } from 'react';

function SearchResults({ searchTerm }) {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from your data source (replace with actual fetching logic)
    const fetchedBlogs = [
      { id: '1', title: 'My First Blog', category: 'Technology' },
      { id: '2', title: 'Opening Party!', category: 'Lifestyle' },
      { id: '2128', title: 'Vivek', category: 'Food' },
    ];
    setBlogs(fetchedBlogs);
  }, []);

  useEffect(() => {
    // Filter blogs based on the search term
    const results = blogs.filter((blog) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          (blog.category && blog.category.toLowerCase().includes(searchTermLower)) ||
          (blog.title && blog.title.toLowerCase().includes(searchTermLower)) ||
          (blog.body && blog.body.toLowerCase().includes(searchTermLower)) 
          
        );
      });
    setFilteredBlogs(results); // Set filtered blogs state
  }, [searchTerm, blogs]); // Re-run the filter whenever the searchTerm or blogs change

  return (
    <div>
      <h2>Search Results for "{searchTerm}"</h2>
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map(blog => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>Category: {blog.category}</p>
          </div>
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
}

export default SearchResults;