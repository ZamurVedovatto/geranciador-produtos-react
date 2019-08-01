import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class NewProduct extends Component {
  constructor(props) {
    super(props)
    this.handleNewProduct = this.handleNewProduct.bind(this)
    this.state = {
      redirect: false
    }
  }

  handleNewProduct() {
    const product = {
      description: this.refs.product.value,
      category: Number(this.refs.category.value)
    }
    this.props.createProduct(product)
      .then((res) => {
        this.setState({
          redirect: '/products/categories/' + product.category
        })
      })
  }

  renderSelectCategory(cat) {
    return (
      <option key={cat.id} value={cat.id}>{cat.category}</option>
    )
  }

  render () {
    const { categories } = this.props
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div className="mt-2">
        <h4>New Product</h4>
        <select className="form-control mb-1" ref="category">
          {categories.map(this.renderSelectCategory)}
        </select>
        <input placeholder="Description" className="form-control mb-1" ref="product"></input>
        <button className="btn btn-primary btn-block" onClick={this.handleNewProduct}>Save</button>
      </div>
    )
  }
}

export default NewProduct