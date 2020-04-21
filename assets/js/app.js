import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import Navbar from './Components/Navbar'
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom'
import HomePage from './Components/Pages/HomePage'
import StoryListPage from './Components/Pages/StoryListPage'
import store, { persistore } from './store'
import LoginPage from './Components/Pages/LoginPage'
import PrivateRoute from './Components/PrivateRoute'
import PublicRoute from './Components/PublicRoute'
import StoryPage from './Components/Pages/StoryPage'
import SignupPage from './Components/Pages/SignupPage'
import AddStoryPage from './Components/Pages/AddStoryPage'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import '../css/app.scss'
import { PersistGate } from 'redux-persist/integration/react'

// Set up Toast notifications
toast.configure({
    position: toast.POSITION.BOTTOM_LEFT
})

const App = () => {
    // Allow access to the history object
    const NavbarWithRouter = withRouter(Navbar)

    return (
      <Provider store={store}>
          {/* todo: loading component  */}
          <PersistGate loading={null} persistor={persistore}>
              <HashRouter>
                  <NavbarWithRouter/>
                  <Switch>
                      <PrivateRoute path="/stories/new" component={AddStoryPage}/>
                      <PrivateRoute path="/stories/:id" component={StoryPage}/>
                      <PrivateRoute path="/stories" component={StoryListPage}/>
                      <PublicRoute path="/signup" component={SignupPage}/>
                      <PublicRoute path="/login" component={LoginPage}/>
                      <Route path="/" component={HomePage}/>
                  </Switch>
              </HashRouter>
          </PersistGate>
      </Provider>)
}

ReactDOM.render(<App/>, document.getElementById('app'))


