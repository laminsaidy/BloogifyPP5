import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Create from './CreateBlog';
import About from './About';
import BlogDetails from './BlogDetails';
import EditBlog from './EditBlog';
import SearchResults from './SearchResults';
import NotFound from './NotFound'; // Create a reusable NotFound component

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onSearch={handleSearch} />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/blogs/:id" component={BlogDetails} />
            <Route exact path="/edit/:id" component={EditBlog} />
            <Route
              exact
              path="/search"
              render={(props) => <SearchResults {...props} searchTerm={searchTerm} />}
            />
            <Route component={NotFound} /> {/* Fallback route */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;