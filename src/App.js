import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './CreateBlog';
import About from './About';
import BlogDetails from './BlogDetails';
import EditBlog from './EditBlog';  // Import the EditBlog component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/create" component={Create} />
            <Route path="/blogs/:id" component={BlogDetails} />
            <Route path="/edit/:id" component={EditBlog} />  {/* Add the EditBlog route */}

            {/* Catch-all route for unmatched paths */}
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