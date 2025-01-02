import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);  // Pass search term back to App.js
    history.push(`/search?term=${searchTerm}`);  // Redirect to the /search route with the search term as a query parameter
  };

  return (
    <nav className="navbar">
      <h1>Blogify</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">New Blog</Link>
      </div>
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;