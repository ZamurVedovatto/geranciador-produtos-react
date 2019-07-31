import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import About from './About'
import Products from './Products'

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark d-flex flex-row-reverse">
          <a className="navbar-brand text-white font-weight-bold" href="/">Product Management</a>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <div className="container mt-3">
          <Route exact path='/' component={Home} />
          <Route path='/products' component={Products} />
          <Route exact path='/about' component={About} />
        </div>
      </div>
    </Router>
  );
}

export default App