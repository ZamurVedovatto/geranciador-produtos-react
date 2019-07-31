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