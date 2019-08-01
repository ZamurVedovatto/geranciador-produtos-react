import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProductEdit extends Component {

  constructor(props) {
    super(props)

    this.handleEditProduct = this.handleEditProduct.bind(this)
    this.state = {
      redirect: '',
      product: {}
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.readProduct(id)
      .then((res) => {
        // use in case that defaultValue dont work
        // this.refs.product.value = res.data.description
        this.refs.category.value = res.data.category
        this.setState({
          product: res.data
        })
      })
  }

  renderSelectCategory(cat) {
    return (
      <option key={cat.id} value={cat.id}>{cat.category}</option>
    )
  }

  handleEditProduct() {
    const id = this.props.match.params.id

    const product = {
      id,
      description: this.refs.product.value,
      category: this.refs.category.value
    }

    this.props.editProduct(product)
      .then(() => {
        this.setState({
          redirect: '/products/categories/' + product.category
        })
      })
  }

  render () {
    const { categories } = this.props

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div className="mt-2">
        <h4>Edit Product</h4>
        <select className="form-control mb-1" ref="category">
          {categories.map(this.renderSelectCategory)}
        </select>
        <input placeholder="Description" className="form-control mb-1" ref="product" defaultValue={this.state.product.description}></input>
        <button className="btn btn-primary btn-block" onClick={this.handleEditProduct}>Confirm Edition</button>
      </div>
    )
  }
}

export default ProductEdit