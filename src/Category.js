import React, { Component } from 'react'
import axios from 'axios'

class Category extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this)
    this.state = {
      products: [],
      category: {}
    }
  }

  loadData(id) {
    axios.get(`http://localhost:3001/products?category=`+id)
    .then(res => {
      this.setState({
        products: res.data
      })
    })

    axios.get(`http://localhost:3001/categories/`+id)
    .then(res => {
      this.setState({
        category: res.data
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
      <div className="mt-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page"><span style={customStyles.fz08rem}>Category</span> {this.state.category.category}</li>
          </ol>
        </nav>
        {this.state.products.map(this.renderProduto)}
      </div>
    )
  }
}

export default Category


const customStyles = {
  "fz08rem": {
    "fontSize": ".8rem"
  }
}