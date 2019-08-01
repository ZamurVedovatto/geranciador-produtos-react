import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

class Category extends Component {
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this)
    this.renderProduct = this.renderProduct.bind(this)
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

  renderProduct(prod) {
    const id = this.props.match.params.catId
    return (
      <div key={prod.id}>
        <div className='bg-light p-2'>
          <p>
            {prod.description}
            <button className="btn p-0" onClick={ () => {
              this.props.removeProduct(prod)
                .then(() => this.loadData(id))
              }
            }
            >
              <FontAwesomeIcon className="ml-2" icon={faBomb} size="sm" />
            </button>
            <Link to={'/products/edit/' + prod.id }>
              <button className="btn p-0">
                <FontAwesomeIcon className="ml-2" icon={faEdit} size="sm" />
              </button>
            </Link>
          </p>

        </div>

      </div>

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
        {this.props.products.length === 0 &&
          <p className="alert alert-danger">No registered products</p>
        }
        {this.props.products.map(this.renderProduct)}
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