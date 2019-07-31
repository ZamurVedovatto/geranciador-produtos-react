import React, { Component } from 'react'

class Category extends Component {
  render () {
    return (
      <div>
        <h6>Category {this.props.match.params.catId}</h6>
      </div>
    )
  }
}

export default Category