import React, { Component } from 'react'

class Category extends Component {
  render () {
    const { catId } = this.props.match.params
    return (
      <div>
        <h6>Category {catId}</h6>
      </div>
    )
  }
}

export default Category