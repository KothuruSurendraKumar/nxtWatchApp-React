import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import login from './components/login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={login} />
    <ProtectedRoute exact path="/" component={Home} />
  </Switch>
)

export default App
