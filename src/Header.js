import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
export class Header extends Component {
    constructor(){
        super()
        this.state={
            redirect:false,
        }
    }
    logout=()=>{
        this.setState({redirect:true})
    }
    render() {
        console.log("el")
        if(this.state.redirect===false){
        return (
            <div>
                <div className="main-header">
                    <div className="logo">Training Academy</div>
                    <div className="menu">
                        <center><Link to="/dashboard" style={{marginRight:"10px"}}>Dashboard</Link><Link to="/training">Training</Link></center>
                    </div>
                    <div className="Logout" onClick={this.logout}>Logout</div>
                </div>
            </div>
        )
        }
        else{
            return(<Redirect to='/' />)
        }
    }
}

export default Header
