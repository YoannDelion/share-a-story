import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Components/Navbar'
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom'
import HomePage from './Components/HomePage'
import StoryListPage from './Components/StoryListPage'

import '../css/app.css'
import 'bulma'

const App = () => {
    // Allow access to the history object
    const NavbarWithRouter = withRouter(Navbar)

    return (
      <HashRouter>
          <NavbarWithRouter/>
          <Switch>
              <Route path="/stories" component={StoryListPage}/>
              <Route path="/" component={HomePage}/>
          </Switch>
      </HashRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))


