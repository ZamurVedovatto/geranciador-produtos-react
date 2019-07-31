import React, { Component } from 'react'
import axios from 'axios'

class Category extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this)
    this.state = {
      products: []
    }
  }

  loadData(id) {
    axios.get(`http://localhost:3001/products?category=`+id)
    .then(res => {
      this.setState({
        products: res.data
      })
    })
  }

  componentDidMount() {
    const id = this.props.match.params.catId
    this.loadData(id)
  }

  componentWillReceiveProps(newProps) {
    const id = newProps.match.params.catId;
    this.loadData(id)
  }

  renderProduto(prod) {
    return (
      <p className='bg-light p-2' key={prod.id}>{prod.description}</p>
    )
  }

  render () {
    return (
      <div>
        <h4>Category {this.props.match.params.catId}</h4>
        {this.state.products.map(this.renderProduto)}
      </div>
    )
  }
}

export default Category