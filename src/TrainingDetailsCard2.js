import React, { Component } from 'react'
import learners from './icons/learners.svg'
import calendar from './icons/calendar.svg'
import trainers from './icons/trainers.svg'
import location from './icons/location.svg'
export class TrainingDetailCard2 extends Component {
    constructor(props){
        
        super(props)
        //console.log(props)
       this.state={
           show:"right",
           showTrainerInvoice:"trainers",
            trainingName:props.trainings.trainingName,
            institutionName:props.trainings.institutionName,
            learnerCount:props.trainings.learnerCount,
            trainers:props.trainings.trainers,
            startDate:props.trainings.startDate,
            endDate:props.trainings.endDate,
            location:props.trainings.location,
            status:props.trainings.status,
            skills:props.trainings.skills,
            contactNumber:props.trainings.contactNumber,
            estimatedCostPerLearner:props.trainings.estimatedCostPerLearner,
            spoc:props.trainings.spoc,
            users:[],
            buttonDisable:false,
        }
    }    
    componentDidMount(){
        fetch("https://user-problem-worksheet-india.s3-ap-south-1.amazonaws.com/Json/capstoneProject/users.json")
        .then(res=>{return res.json()})
        .then(result=>{this.setState({users:result})})
    }
    changeShow=()=>{
        if(this.state.show==="right"){
            this.setState({show:"down"})
        }
        else{
            this.setState({show:"right"})
        }
    }
    addTempTrainer=(e)=>{
        let reqUser=this.state.users[e.target.value]
       let temp=this.state.trainers.filter(item=>{
           if(item.name===reqUser.name){
               return item
           }
           else{
               return null
           }
       })
       
       if(temp.length){
           this.setState({buttonDisable:true,tempTrainer:e.target.value})
       }
       else{
        this.setState({tempTrainer:e.target.value,buttonDisable:false})
       }
    }
    addToTrainers=()=>{
        let trains=this.state.trainers
        let tr=this.state.users[this.state.tempTrainer]
        tr.type="None"
       // console.log(this.state.tempTrainer.name)
        trains.push(tr)
        this.setState({trainers:trains})
    }
    changeType=(ind,type)=>{
        let tr=this.state.trainers
        tr[ind].type=type
        this.setState({trainers:tr})
    }
    changedropdown=(option)=>{
        this.setState({showTrainerInvoice:option})
    }
    render() {
        let training=this.state
        let DlTrainers=training.trainers.filter(item=>{if(item.type==="Delivery"){return item}
        else{
            return null
        }})
        let supporters=training.trainers.filter(item=>{if(item.type==="Support"){return item}
        else{
            return null
        }})
        return (
            <div className="trainingCard">
             <div className="Training_info">
                        <div className="trainingName">{training.trainingName}</div>
                        <div className="instituteName">{training.institutionName}</div>
            </div>
                        <div className={"status "+training.status}>{training.status}</div>
                <div className="Training_details">
                        <div className="detail_block">
                            <img src={learners} alt="learners"/>{training.learnerCount+"learners"}
                            </div>
                        <div className="detail_block">
                        <img src={trainers} alt="trainers"/>{DlTrainers.length} Trainers
                            </div>
                            <div className="detail_block">
                            <img src={trainers} alt="support"/>{supporters.length} Support Staff
                                </div>
                            <div className="detail_block">
                            <img src={calendar} alt="start"/>   Starts on {training.startDate}
                                </div>
                            <div className="detail_block">
                            <img src={calendar} alt="ends" />  Ends on {training.endDate}
                                </div>
                            <div className="detail_block">
                            <img src={location} alt="location" />    {training.location}
                                </div>
                     </div>   
                
                    {training.skills.map(item=>{
                        return(
                        <div className="skills">
                           {item} 
                       </div>
                        )
                    })}
                    <div style={{float:'right',padding:"2px"}}><button onClick={this.changeShow}><i class={"arrow "+this.state.show}></i></button></div>
                {this.state.show==="down"?
                
                <div className="modifyCard">
                        <div style={{margin:"10px"}}><span style={{margin:"10px"}} onClick={()=>{this.changedropdown("trainers")}}>Trainers</span><span onClick={()=>{this.changedropdown("invoice")}}>Invoice</span></div>
                       {this.state.showTrainerInvoice==="trainers"?
                        <div className="trainerCards">
                            <div>
                                <select  className="AddTrainer" onChange={this.addTempTrainer} value={this.state.tempTrainer}>
                                    {this.state.users.map((item,ind)=>{
                                        return(<option value={ind}>{item.name}</option>)
                                    })}
                                </select>
                                <button style={{marginLeft:"5px",borderRadius:"5px",padding:"5px"}} onClick={this.addToTrainers} disabled={this.state.buttonDisable}>Add</button>
                            </div>
                            {this.state.buttonDisable?<div style={{color:"red"}}>User alredy exists</div>:''}
                                {this.props.trainings.trainers.map((item,ind)=>{
                                    return(
                                        <div class="trainer-row">
                                        <div className="row-col">
                                               { item.name} 
                                        </div>
                                        
                                        <div className="row-col" style={{float:"right"}}>
                                            <span className={"type "+"None"+item.type} onClick={()=>{this.changeType(ind,"None")}}>None</span><span className={"type "+"Delivery"+item.type} onClick={()=>{this.changeType(ind,"Delivery")}}>Delivery</span><span className={"type "+"Support"+item.type} onClick={()=>{this.changeType(ind,"Support")}}>Support</span>
                                        </div>
                                        <div className="row-col" style={{float:"right"}}>
                                            {item.skills.toString()}
                                        </div>
                                        </div>
                                    )
                                })}
                            </div>:<div className="invoice">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Training Name</td>
                                            <td>{this.state.trainingName}</td>
                                        </tr>
                                        <tr>
                                            <td>Institute Name</td>
                                            <td>{this.state.institutionName}</td>
                                        </tr>
                                        <tr>
                                            <td>Start Date</td>
                                            <td>{this.state.startDate}</td>
                                        </tr>
                                        <tr>
                                            <td>End Date</td>
                                            <td>{this.state.endDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Learner Count</td>
                                            <td>{this.state.learnerCount}</td>
                                        </tr>
                                        <tr>
                                            <td>Trainer Count</td>
                                            <td>{DlTrainers.length}</td>
                                        </tr>
                                        <tr>
                                            <td>Support Staff</td>
                                            <td>{supporters.length}</td>
                                        </tr>
                                        <tr>
                                            <td>Contact Number</td>
                                            <td>{this.state.contactNumber}</td>
                                        </tr>
                                        <tr>
                                            <td>Location</td>
                                            <td>{this.state.location}</td>
                                        </tr>
                                        <tr>
                                            <td>SPOC</td>
                                            <td>{this.state.spoc}</td>
                                        </tr>
                                        <tr>
                                            <td>Estimated Cost Per learner</td>
                                            <td>{this.state.estimatedCostPerLearner}</td>
                                        </tr>
                                        <tr>
                                            <td>Skills</td>
                                            <td>{this.state.skills.toString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>}
                </div>:""}
            </div>
        )
    }
}

export default TrainingDetailCard2
