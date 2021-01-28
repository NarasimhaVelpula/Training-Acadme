import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {addTrainer} from './actions'
import {connect} from 'react-redux'
import Header from './Header'
import { Formik, Form, Field, ErrorMessage } from 'formik';
export class Create extends Component {
    constructor(){
        super()
        this.state={
            trainingName:"",
            institutionName:"",
            learnerCount:"",
            startDate:"",
            endDate:"",
            location:"",
            estimatedCostPerLearner:"",
            status:"",
            skills:[],
            spoc:"",
            contactNumber:'',
            statusChoices:[],
            skillChoices:[],
            trainers:[],
            redirect:false,
        }
    }
    componentDidMount(){
        fetch("https://user-problem-worksheet-india.s3-ap-south-1.amazonaws.com/Json/capstoneProject/filter.json")
        .then(res=>{return res.json()})
        .then(result=>{this.setState({statusChoices:result.statusList,skillChoices:result.skills})})
    }
    handleChange=(e)=>{
        if(e.target.name=="skills"){
                let st=[e.target.value,...this.state.skills]
                this.setState({skills:st})
        }
        else{
        this.setState({[e.target.name]:e.target.value})
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log("sumbit")
        let skills=[]
       
        let noOfSkills=e.target[10].selectedOptions.length
        for(let i=0;i<noOfSkills;i++){
            skills.push(e.target[10].selectedOptions[i].value)
        }
        console.log(skills)
        let training={
            trainingName:e.target[0].value,
            institutionName:e.target[1].value,
            
            startDate:e.target[2].value,
            endDate:e.target[3].value,
            location:e.target[5].value,
            estimatedCostPerLearner:e.target[8].value,
            learnerCount:e.target[4].value,
            status:e.target[9].value,
            skills:skills,
            spoc:e.target[6].value,
            contactNumber:e.target[7].value,
            trainers:[],
        }
        this.props.addTraining(training)
        this.setState({redirect:true})
    }
    render() {
        if(this.state.redirect===false){
        return (
            <>
            <Header />
            <Formik 
            initialValues={{
                trainingName:'',
                institutionName:'',
                startDate:'',
                endDate:'',
                learnerCount:'',
                location:'',
                spoc:'',
                contactNumber:'',
                estimatedCostPerLearner:'',
                status:'',
                skills:[]
            }}
            validate={values=>{
                const errors={}
                if(!values.trainingName)
                {
                    errors.trainingName='required*'
                }
                if(!values.institutionName){
                    errors.institutionName='required*'
                }
                if(!values.startDate){
                    errors.startDate='required*'
                }
                if(!values.endDate){
                    errors.endDate='required*'
                }
                if(!values.learnerCount){
                    errors.learnerCount='required*'
                }
                if(!values.location){
                    errors.location='required*'
                }
                if(!values.spoc){
                    errors.spoc='required*'
                }
                if(!values.contactNumber){
                    errors.contactNumber='required*'
                }
                if(!values.estimatedCostPerLearner){
                    errors.estimatedCostPerLearner='required*'
                }
                if(!values.status){
                    errors.status='required*'
                }
                if(!values.skills){
                    errors.skills='required*'
                }
                return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log("submited")
                
              }}
            >
            {({ isSubmitting }) => (
            <Form id="trainingCreateForm" onSubmit={this.handleSubmit} >
                    <div className="create-entry">
                        <p className="entry-header">Training Name</p>
                        <Field className="create-entry-input" type="text" name="trainingName" placeholder="e.g Java Training" />
                        <ErrorMessage name="trainingName" component="span" style={{color:"red"}}/>
                    </div>
                    <div className="create-entry">
                        <p className="entry-header">Institute Name</p>
                        <Field className="create-entry-input" type="text"  name="institutionName" placeholder="e.g Ebox Colleges" />
                        <ErrorMessage name="institutionName" component="span" style={{color:"red"}}/>
                    </div>
                    <div className="create-entry">
                        <p className="entry-header">Start Date</p>
                        <Field className="create-entry-input" type="date"  name="startDate"  />
                        <ErrorMessage name="startDate" component="span" style={{color:"red"}}/>
                    </div>
                    <div className="create-entry">
                        <p className="entry-header">End Date</p>
                        <Field  className="create-entry-input" type="date"  name="endDate"  />
                        <ErrorMessage name="endDate" component="span" style={{color:"red"}} />
                    </div>
                    <div className="create-entry">
                        <p className="entry-header">Learn Count</p>
                        <Field  className="create-entry-input" type="number"  name="learnerCount"  />
                        <ErrorMessage name="learnerCount" component="span" style={{color:"red"}} />
                    </div>
                    <div className="create-entry">
                        <p className="entry-header">Location</p>
                        <Field  className="create-entry-input" type="text"  name="location"  />
                        <ErrorMessage name="location" component="span" style={{color:"red"}}/>
                    </div>
                    <div className="create-entry">
                        <p className="entry-header">SPOC</p>
                        <Field  className="create-entry-input" type="text"  name="spoc"  />
                        <ErrorMessage name="spoc" component="span" style={{color:"red"}}/>
                    </div>
                    <div className="create-entry">
                        <p className="entry-header">Contact Number</p>
                        <Field  className="create-entry-input" type="text"  name="contactNumber"  />
                        <ErrorMessage name="contactNumber" component="span" style={{color:"red"}} />
                    </div>
                    <div className="create-entry">
                        <p className="entry-header">Estimated Cost per Learner</p>
                        <Field  className="create-entry-input" type="number"  name="estimatedCostPerLearner"  />
                        <ErrorMessage name="estimatedCostPerLearner" component="span" style={{color:"red"}} />
                    </div>

                    <div className="create-entry">
                        <p className="entry-header">Status</p>
                        <select name="status" className="create-entry-input" >
                        {this.state.statusChoices.map(item=>{
                                return(<option value={item}>{item}</option>)
                            })}
                        </select>
                    </div>
                    <div className="create-entry">
                        <p className="entry-header">Skills</p>
                        <select name="skills" className="create-entry-input" multiple>
                        {this.state.skillChoices.map(item=>{
                                return(<option value={item}>{item}</option>)
                            })}
                        </select>
                    </div>
                    <div>
                    <button id="loginButton" className="NewTrainingButton" type="submit" style={{float:"right",margin:"10px"}} disabled={isSubmitting}>Submit</button>
              
 </div>
            </Form>
                )}
            </Formik>
                       </>
        )
                        }
    else{
        return(        <Redirect to="/training" />)
    }
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        addTraining:(data)=>{dispatch(addTrainer(data))}
    }
}
export default connect('',mapDispatchToProps)(Create)
