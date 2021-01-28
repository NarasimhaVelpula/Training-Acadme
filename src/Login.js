import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
export class Login extends Component {
    constructor(){
        super()
        this.state={
            email:"",
            password:"",
            redirectToDashboard:false,
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    login=()=>{
        console.log("login clicked")
        
        this.setState({redirectToDashboard:true})
        
    }
    render() {
       if( this.state.redirectToDashboard===false){
        return (
            
            <div className="Login">
                <div className="part1">
                <h1 className="login-text">Login</h1>
                <Formik
                    initialValues={{email:'',password:''}}
                    validate={values=>{
                        const errors={};
                        if(!values.email){
                            errors.email='Required';
                        }
                        if(!values.password){
                            errors.password='Required';
                        }
                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                            this.setState({redirectToDashboard:true})
                    }}
                    >
                        {({ isSubmitting }) => (
               <Form>
                <Field className="inputBox" type="email" placeholder="Email" id="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <Field className="inputBox" type="password" placeholder="Password" id="password"  name="password" />
                <ErrorMessage name="password" component="div" />
                <button id="loginButton" className="loginButton" type="submit" disabled={isSubmitting}>LOG IN</button>
                </Form>
                        )}
                </Formik>
                </div>
                <div className="part2">
                    <p className="TrainingAcademyText">Training Academy</p></div>
            </div>
        )
    }
    else{
        return(<Redirect to="/Dashboard" />)
    }

}
}

export default Login
