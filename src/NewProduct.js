import React, { Component } from 'react'

class NewProduct extends Component {
  constructor(props) {
    super(props)
    this.handleNewProduct = this.handleNewProduct.bind(this)
  }

  handleNewProduct() {
    const product = {
      description: this.refs.product.value,
      category: Number(this.refs.category.value)
    }
    this.props.createProduct(product);
  }

  renderSelectCategory(cat) {
    return (
      <option key={cat.id} value={cat.id}>{cat.category}</option>
    )
  }

  render () {
    const { categories } = this.props
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