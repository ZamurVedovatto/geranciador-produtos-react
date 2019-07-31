import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProductsHome from './ProductsHome'
import Category from './Category'

class Products extends Component {
  render() {
    const { match } = this.props

    return (
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <h3>Categories</h3>
          <Link to='products/categories/1'>Category 1</Link>
        </div>
        <div className="col-md-6 col-sm-12">
          <h1>Products</h1>
          <Route exact path={match.url} component={ProductsHome} />
          <Route exact path={match.url + '/categories/:catId'} component={Category} />
        </div>
      </div>
    )
  }
}

export default Products