import React, { Component } from 'react'
import learners from './icons/learners.svg'
import calendar from './icons/calendar.svg'
import trainers from './icons/trainers.svg'
import location from './icons/location.svg'
export class TrainingDetailCard extends Component {
    constructor(props){
        
        super(props)
        //console.log(props)
       this.state={
            trainingName:props.trainings.trainingName,
            institutionName:props.trainings.institutionName,
            learnerCount:props.trainings.learnerCount,
            trainers:props.trainings.trainers.filter(item=>{if(item.type==="Delivery"){return item}
        else{
            return null
        }}),
            supporters:props.trainings.trainers.filter(item=>{if(item.type==="Support"){return item}
        else{
            return null
        }}),
            startDate:props.trainings.startDate,
            endDate:props.trainings.endDate,
            location:props.trainings.location,
            status:props.trainings.status,
            skills:props.trainings.skills
            
        }
    }    
    render() {
        let training=this.state
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
                        <img src={trainers} alt="trainers"/>{training.trainers.length} Trainers
                            </div>
                            <div className="detail_block">
                            <img src={trainers} alt="support"/>{training.supporters.length} Support Staff
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
                
            </div>
        )
    }
}

export default TrainingDetailCard
