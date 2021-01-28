import React, { Component } from 'react'
import FilterCard from './FilterCard'
import Header from './Header'
import TrainingDetailCard from './TrainingDetailsCard2'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
export class TrainingList extends Component {
    constructor(props){
        super(props)
        this.state={
            Name:"",
            InstituteName:"",
            StartDate:"",
            EndDate:"",
            Status:"",
            Skills:"",
            trainings:[],
            trainingData:props.trainingData
        }
    }
  
    ChangeParm=(e)=>{
      this.setState({
          Name:e.Name,
          InstituteName:e.InstituteName,
          StartDate:e.StartDate,
          EndDate:e.EndDate,
          Status:e.Status,
          Skills:e.Skills,
          trainingData:this.props.trainingData
      })
    }
    render() {
        //console.log("from store")
        //console.log(this.state.trainingData)
                //console.log(trainings)
        //console.log(this.state.Name)
        let trainings=this.state.trainingData.filter(item=>{
            let ex1=RegExp(this.state.Name,'i')
            let ex2=RegExp(this.state.InstituteName,'i')
            if(item.trainingName.search(ex1)!==-1){
                if(item.institutionName.search(ex2)!==-1)
                {
                    if(this.state.StartDate==="" || this.state.StartDate===item.startDate){
                        if(this.state.EndDate==="" || this.state.EndDate===item.endDate){
                            if(this.state.Status==="" || item.status===this.state.Status){
                                return item
                            }
                        }
                    }
                      
                }
            }
        })
        //console.log(trainings)
        return (
            <>
            <Header />
            <div className="NewTrainingButton"><div class="TrainingButton"><Link to="/create">New Training</Link></div></div>
            
            <div className="TrainingList">
               {console.log(trainings)}
                <FilterCard  state={this.state} function={this.ChangeParm}/>
               { trainings.map(item=>{
                    
                    return(<TrainingDetailCard trainings={item} key={item.trainingName}/>)
                })}
            </div>
            </>
        )
    }
}
const mapStateToProps=state=>{
    return state
}


export default connect(mapStateToProps)(TrainingList)
