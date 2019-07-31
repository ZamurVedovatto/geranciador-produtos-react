# Product Management

## React app

### First route configuration

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