import React, { Component } from 'react'
import ActiveTrainer from './ActiveTrainer'
import MetricCard from './MetricCard'
import SkillCard from './SkillCard'
import TrainingDetailCard from './TrainingDetailCard'
import BarChart from './BarChartComponent'
import Header from './Header'
import {connect} from 'react-redux'
export class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            metricsData:{},
            skill:{},
            yearlyStatistics:[],
            trainersCount:{},
            trainings:props.trainingData
        }
    }
    componentDidMount(){
        fetch("https://user-problem-worksheet-india.s3-ap-south-1.amazonaws.com/Json/capstoneProject/dashboardStatistics.json")
        .then(res=> res.json())
        .then(result =>this.setState({metricsData:result.metricsData,skill:result.skill,yearlyStatistics:result.yearlyStatistics,trainersCount:result.trainersCount}))
       
    }
    pendingForApproval=()=>{
        let Trainings=this.state.trainings.filter((item)=>{
            if(item.status==="Pending For Approval")
                return item
            return null
        })
        return Trainings
        
    }
    ongoingTrainings=()=>{
        let Trainings=this.state.trainings.filter((item)=>{
            if(item.status==="Ongoing")
                return item
            else
                return null
        })
        return Trainings
    }
    upComingTrainings=()=>{
        let Trainings=this.state.trainings.filter((item)=>{
            if(item.status==="Upcoming"){
                return item
            }
            else
                return null
        })
        return Trainings
    }
    completedTrainings=()=>{
        let Trainings=this.state.trainings.filter((item)=>{
            if(item.status==="Completed"){
                return item
            }
            else
                return null
        })
        return Trainings
    }
    render() {
        let metricsData=Object.keys(this.state.metricsData).map(
            key=>{
                return(<MetricCard count={this.state.metricsData[key]} status={key} />)
            }
        )
        //console.log(this.state.trainings)
        return (
            <>
                            <Header />
            <div className="dashboard">
                {console.log("from store"),
                console.log(this.props.trainingData)}
                <div className="metric">
                {metricsData}
                </div>
                <div className="secondLayer">
                <ActiveTrainer active={this.state.trainersCount.active} total={this.state.trainersCount.total}/>
                <SkillCard image={this.state.skill.image} name={this.state.skill.name} training={this.state.skill.trainingCount} months={this.state.skill.duration} timeperiod={this.state.skill.timePeriod} />
                <BarChart yearlyStatistics={this.state.yearlyStatistics}/>
                </div>
                {this.state.trainings.length>0?<div>
                    
                
                        <div className="Training-heading">Pending for Approval</div>
                        {this.pendingForApproval().map(item=>{
                            return(<TrainingDetailCard trainings={item} />)
                        })}
                        <div className="Training-heading">Upcoming Trainings</div>
                        {this.upComingTrainings().map(item=>{
                            return(<TrainingDetailCard trainings={item} />)
                        })}
                        <div className="Training-heading">Ongoing Trainings</div>
                        {this.ongoingTrainings().map(item=>{
                            return(<TrainingDetailCard trainings={item} />)
                        })}
                        <div className="Training-heading">Completed Trainings</div>
                        {this.completedTrainings().map(item=>{
                            return(<TrainingDetailCard trainings={item} />)
                        })}
                    </div>:""}
            </div>
            </>
        )
    }
}
const mapStateToProps=state=>{
    return state;
}

export default connect(mapStateToProps)(Dashboard)
