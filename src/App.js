import React, { Component } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import TrainingList from './TrainingList'
import Create from './Create'
import Login from './Login'
import {connect} from 'react-redux'
import {initiate} from './actions'
export class App extends Component {
  componentDidMount(){
    fetch("https://user-problem-worksheet-india.s3-ap-south-1.amazonaws.com/Json/capstoneProject/trainings.json")
    .then(res=> res.json())
    .then(result =>{
        
        this.props.initiate(result)
    }
    )

  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
         
          <Route exact path="/"  component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/training" component={TrainingList} />
          <Route exact path="/create" component={Create} />
        
          </Switch>
         
        </Router>
      </div>
    )
  }
}
const mapDispatchToProps=dispatch=>{
  return{
  initiate:data=>{dispatch(initiate(data))}
  }
}
export default connect('',mapDispatchToProps)(App)
