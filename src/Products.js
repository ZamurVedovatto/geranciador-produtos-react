import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProductsHome from './ProductsHome'
import Category from './Category'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'

class Products extends Component {

  constructor(props) {
    super(props);

    this.renderCategory = this.renderCategory.bind(this)
    this.handleNewCategory = this.handleNewCategory.bind(this)
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  renderCategory (cat) {
    return (
      <li key={cat.id}>
        <button className="btn p-0" onClick={ () => this.props.removeCategory(cat) }>
          <FontAwesomeIcon className="mr-2" icon={faBomb} size="sm" />
        </button>
        <Link to={`/products/categories/${cat.id}`}>{cat.category}</Link>
      </li>
    )
  }

  handleNewCategory (key) {
    if (key.keyCode === 13) {
      this.props.createCategory({
        category: this.refs.category
      })
      this.refs.category.value = ''
    }
  }

  render() {
    const { match, categories } = this.props

    return (
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <h3>Categories</h3>
          <ul className="pl-0" style={customStyles.ulWithoutBullets}>
            { categories.map(this.renderCategory) }
          </ul>
          <div className="card bg-light p-2">
            <input
              className="form-control p-2"
              type="text"
              ref="category"
              placeholder="New Category"
              onKeyUp={this.handleNewCategory}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <h4 className="text-info">Products</h4>
          <Route exact path={match.url} component={ProductsHome} />
          <Route exact path={match.url + '/categories/:catId'} component={Category} />
        </div>
      </div>
    )
  }
}

export default Products

const customStyles = {
  ulWithoutBullets: {
    "listStyle": "none"
  }
}