import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import ProductsHome from './ProductsHome'
import Category from './Category'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({
  autoClose: 2000,
  draggable: false,
  pauseOnFocusLoss: true
});

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    this.loadCategories();
  }

  notifySuccess = () => {
    toast("Success");
  }

  loadCategories = () => {
    axios
    .get('http://localhost:3001/categories')
    .then(res => {
      this.setState({
        categories: res.data
      })
    })
  }

  removeCategory = cat => {
    axios
      .delete('http://localhost:3001/categories/' +  cat.id)
      .then(() => {
        this.loadCategories();
        this.notifySuccess();
      })
  }



  renderCategory = (cat) => {
    return (
      <li key={cat.id}>
        <button className="btn p-0" onClick={ ()=>this.removeCategory(cat) }>
          <FontAwesomeIcon className="mr-2" icon={faBomb} size="sm" />
        </button>
        <Link to={`/products/categories/${cat.id}`}>{cat.category}</Link>
      </li>
    )
  }

  handleNewCategory = key => {
    if (key.keyCode === 13) {
      axios
        .post('http://localhost:3001/categories', {
          category: this.refs.category.value
        })
        .then(() => {
          this.refs.category.value = ''
          this.loadCategories();
        })

    }
  }

  render() {
    const { match } = this.props
    const { categories } = this.state

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