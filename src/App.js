import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Create from './CreateBlog';
import About from './About';
import BlogDetails from './BlogDetails';
import EditBlog from './EditBlog';
import SearchResults from './SearchResults';  // Import the SearchResults component

function App() {
  const [searchTerm, setSearchTerm] = useState('');  // Keep this state for passing to Navbar

  const handleSearch = (term) => {
    setSearchTerm(term);  // Update search term when submitted from Navbar
  };

  return (
    <Router>
      <div className="App">
        <Navbar onSearch={handleSearch} />  {/* Pass search handler to Navbar */}
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/create" component={Create} />
            <Route path="/blogs/:id" component={BlogDetails} />
            <Route path="/edit/:id" component={EditBlog} />
            <Route 
              path="/search" 
              render={(props) => <SearchResults {...props} searchTerm={searchTerm} />} 
            />
            <Route>
              <div>
                <h2>Page Not Found</h2>
                <p>Sorry, the page you're looking for doesn't exist.</p>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;