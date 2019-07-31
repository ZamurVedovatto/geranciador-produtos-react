import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ProductsHome from './ProductsHome'

class Products extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <h3>Categories</h3>
          LINK PARA CATEGORIA
        </div>
        <div className="col-md-10">
          <h1>Products</h1>
          <Route exact path={this.props.match.url} component={ProductsHome} />
        </div>
      </div>
    )
  }
}

export default Products