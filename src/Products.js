import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProductsHome from './ProductsHome'
import NewProduct from './NewProduct'
import ProductEdit from './ProductEdit'
import Category from './Category'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb, faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingCategory: {}
    }

    this.renderCategory = this.renderCategory.bind(this)
    this.handleNewCategory = this.handleNewCategory.bind(this)
  }

  componentDidMount() {
    this.props.loadCategories()
  }

  renderCategory = cat => {
    return (
      <li key={cat.id}>
        {this.state.editingCategory === cat.id &&
          <div className='input-group'>
            <div className="input-group-btn d-flex">
              <input ref={'cat-' + cat.id} onKeyUp={this.handleEditCategory} className="form-control" type="text" defaultValue={cat.category} />
              <button className="btn p-0" onClick={this.cancelEditing} >
                <FontAwesomeIcon className="mr-2" icon={faWindowClose} />
              </button>
            </div>
          </div>
        }

        {this.state.editingCategory !== cat.id &&
          <div>
            <button className="btn p-0" onClick={ () => this.props.removeCategory(cat) }>
              <FontAwesomeIcon className="mr-2" icon={faBomb} size="sm" />
            </button>
            <button className="btn p-0" onClick={ () => this.editCategory(cat) }>
              <FontAwesomeIcon className="mr-2" icon={faEdit} size="sm" />
            </button>
            <Link to={`/products/categories/${cat.id}`}>{cat.category}</Link>
          </div>
        }
      </li>
    )
  }

  handleNewCategory = key => {
    if (key.keyCode === 13) {
      this.props.createCategory({
        category: this.refs.category.value
      })
      this.refs.category.value = ''
    }
  }

  editCategory = category => {
    this.setState({
      editingCategory: category.id
    })
  }

  handleEditCategory = key => {
    if (key.keyCode === 13) {
      this.props.editCategory({
        id: this.state.editingCategory,
        category: this.refs['cat-' + this.state.editingCategory].value
      })

      this.setState({
        editingCategory: ''
      })
    }
  }

  cancelEditing = () => {
    this.setState({
      editingCategory: ''
    })
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
          <Link to={'/products/new'} >
            <button className="mt-2 btn btn-info btn-block">Add Product</button>
          </Link>
        </div>
        <div className="col-md-6 col-sm-12">
          <Route exact path={match.url} component={ProductsHome} />
          <Route exact path={match.url + '/new'} render={(props) => {
            return (
              <NewProduct
                {...props}
                categories={categories}
                createProduct={this.props.createProduct}
              />)
            }
          } />
          <Route exact path={match.url + '/categories/:catId'} render={(props) => {
            return (
              <Category
                {...props}
                category={this.props.category}
                products={this.props.products}
                loadCategory={this.props.loadCategory}
                loadCategories={this.props.loadCategories}
                loadProducts={this.props.loadProducts}
                removeProduct={this.props.removeProduct}
              />
            )
          }} />
          <Route path={match.url + 'edit/:id'} render={(props) => {
            return <ProductEdit
                {...props}
                readProduct={1}
                editProduct={1}
              />
          }} />
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