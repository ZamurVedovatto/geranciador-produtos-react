import React, { Component } from 'react'

class Category extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this)
    this.state = {
      id: null
    }
  }

  loadData(id) {
    this.setState({ id })
    this.props.loadProducts(id)
    this.props.loadCategory(id)
  }

  componentDidMount() {
    const id = this.props.match.params.catId
    this.loadData(id)
  }

  componentWillReceiveProps(newProps) {
    const id = newProps.match.params.catId;
    if (id !== this.state.id) {
      this.loadData(id)
    }
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
            <li className="breadcrumb-item active" aria-current="page">
              <span style={customStyles.fz08rem}>Category</span>
              {this.props.category &&
                <span className="ml-1">
                  {this.props.category.category}
                </span>
              }
            </li>
          </ol>
        </nav>
        {this.props.products.map(this.renderProduto)}
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