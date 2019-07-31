# Product Management

## **React app**

### 1. First route configuration

```
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

<Router>
<Route exact path='/' component={Home} />
<Link className="nav-link text-light" to="/about">About</Link>
```

### 2. Products route
```
/* inside the Product component */
<Route exact path={this.props.match.url} component={ProductsHome} />
```

### 3. Mapping Categories and using URL parameters
```
const { match } = this.props
<Link to='products/categories/1'>Category 1</Link>
<Route exact path={match.url + '/categories/:catId'} component={Category} />
```

### 4. Recover URL parameters
```
<h6>Category {JSON.stringify(this.props.match)}</h6>
<h6>Category {this.props.match.params.catId}</h6>
```

### 5. Load category data from server
```
componentDidMount() {
  axios
    .get('http://localhost:3001/categories')
    .then(res => {
      this.setState({
        categories: res.data
      })
    })
}

renderCategory(cat) {
  return (
    <li key={cat.id}>
      <Link to={`/products/categories/${cat.id}`}>{cat.category}</Link>
    </li>
  )
}

{ categories.map(this.renderCategory) }

```

### 6. Load product data from server
```
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
```

### 7. Removing categories
```
removeCategory = cat => {
  axios
    .delete('http://localhost:3001/categories/' +  cat.id)
    .then(() => {
      this.loadCategories();
      this.notifySuccess();
    })
}

<button className="btn p-0" onClick={ ()=>this.removeCategory(cat) }>
  <FontAwesomeIcon className="mr-2" icon={faBomb} size="sm" />
</button>

```