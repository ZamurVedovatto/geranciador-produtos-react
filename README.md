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