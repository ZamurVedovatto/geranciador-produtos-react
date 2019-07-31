import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import About from './About'
import Products from './Products'

class App extends Component {

  constructor(props) {
    super(props);

    this.loadCategories = this.loadCategories.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
    this.createCategory = this.createCategory.bind(this)

    this.state = {
      categories: []
    }
  }

  loadCategories () {
    this.props.api.loadCategories()
    .then(res => {
      this.setState({
        categories: res.data
      })
    })
  }

  removeCategory (cat) {
    this.props.api.deleteCategory(cat.id)
      .then(() => {
        this.loadCategories();
      })
  }

  createCategory (category) {
    this.props.api.createCategory(category)
      .then(() => this.loadCategories())
  }

  render () {
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
            <Route path='/about' component={About} />
            <Route exact path='/products' render={ (props) => {
              return (
                <Products
                  {...props}
                  loadCategories={this.loadCategories}
                  removeCategory={this.removeCategory}
                  createCategory={this.createCategory}
                  categories={this.state.categories}
                />)
              }
            }
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App