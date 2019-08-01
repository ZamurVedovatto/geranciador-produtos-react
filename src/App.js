import React, { Component } from 'react'
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
    super(props)

    this.loadCategory = this.loadCategory.bind(this)
    this.loadCategories = this.loadCategories.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
    this.createCategory = this.createCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.readProduct = this.readProduct.bind(this)
    this.editProduct = this.editProduct.bind(this)
    this.removeProduct = this.removeProduct.bind(this)
    this.loadProducts = this.loadProducts.bind(this)

    this.state = {
      category: null,
      categories: [],
      products: []
    }
  }

  loadCategory (category) {
    this.props.api.loadCategory(category)
      .then((res) => {
        this.setState({
          category: res.data
        })
      })
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
        this.loadCategories()
      })
  }

  createCategory (category) {
    this.props.api.createCategory(category)
      .then(() => this.loadCategories())
  }

  editCategory (category) {
    this.props.api.editCategory(category)
      .then(() => this.loadCategories())
  }

  createProduct (product) {
    return this.props.api.createProduct(product)
  }

  removeProduct (product) {
    return this.props.api.deleteProduct(product.id)
  }

  readProduct(id) {
    return this.props.api.readProduct(id)
  }

  editProduct(product) {
    return this.props.api.editProduct(product)
  }

  loadProducts(category) {
    this.props.api.loadProducts(category)
      .then(res => {
        this.setState({
          products: res.data
        })
      })
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
            <Route path='/products' render={ (props) => {
              return (
                <Products
                  {...props}
                  category={this.state.category}
                  categories={this.state.categories}
                  products={this.state.products}
                  loadCategory={this.loadCategory}
                  loadCategories={this.loadCategories}
                  removeCategory={this.removeCategory}
                  createCategory={this.createCategory}
                  editCategory={this.editCategory}
                  createProduct={this.createProduct}
                  editProduct={this.editProduct}
                  readProduct={this.readProduct}
                  removeProduct={this.removeProduct}
                  loadProducts={this.loadProducts}
                />)
              }
            }
            />
          </div>
        </div>
      </Router>
    )
  }
}

export default App