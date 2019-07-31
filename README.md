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