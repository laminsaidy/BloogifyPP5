import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './CreateBlog';
import About from './About';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            
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