import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ isLogged, path, component }) => isLogged ? <Route path={path} component={component}/> : <Redirect to={'/login'}/>

export default connect(({ authReducer }) => ({ isLogged: authReducer.isLogged }))(PrivateRoute)