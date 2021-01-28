import React, { Component } from 'react'

export class FilterCard extends Component {
    constructor(){
        super()
        this.state={
            Name:'',
          InstituteName:'',
          StartDate:'',
          EndDate:'',
          Status:'',
          Skills:[],
            statusChoices:[],
            skillChoices:[]
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
    setInitial=()=>{
        this.props.function({
            Name:'',
            InstituteName:'',
            StartDate:'',
            EndDate:'',
            Status:'',
            Skills:[],
              
        })
        this.setState({
            Name:'',
            InstituteName:'',
            StartDate:'',
            EndDate:'',
            Status:'',
            Skills:[],
            statusChoices:this.state.statusChoices,
            skillChoices:this.state.skillChoices
        })
        
    }
     render() {
        return (
            <div>
                <h1 style={{marginTop:"10px"}}>Trainings</h1>
                <div className="card">
                    <div className="entry">
                        <p className="entry-header">Training Name</p>
                        <input className="entry-input" type="text" value= {this.state.Name} onChange={this.handleChange } name="Name" placeholder="e.g Java Training" />
                    </div>
                    <div className="entry">
                        <p className="entry-header">Institue Name</p>
                        <input className="entry-input" type="text" value= {this.state.InstituteName} onChange={this.handleChange } name="InstituteName" placeholder="e.g Java Training" />
                    </div>
                    <div className="entry">
                        <p className="entry-header">Start Date</p>
                        <input className="entry-input" type="date" value= {this.state.StartDate} onChange={this.handleChange } name="StartDate" placeholder="e.g Java Training" />
                    </div>
                    <div className="entry">
                        <p className="entry-header">End Date</p>
                        <input  className="entry-input" type="date" value= {this.state.EndDate} onChange={this.handleChange } name="EndDate" placeholder="e.g Java Training" />
                    </div>
                    <div className="entry">
                        <p className="entry-header">Status</p>
                        <select className="entry-input"  onChange={this.handleChange }  name="Status" placeholder="E.g Completed">
                            <option></option>
                            {this.state.statusChoices.map(item=>{
                                return(<option>{item}</option>)
                            })}
                        </select>
                    </div>
                    <div className="entry">
                        <p>Skills</p>
                        <select className="entry-input"  onChange={this.handleChange } name="Skills" multiple placeholder="E.G Java">
                            <option></option>
                            {this.state.skillChoices.map(item=>{
                                return(<option >{item}</option>)
                            })}
                        </select>
                    </div>
                    <button onClick={()=>{this.props.function(this.state)}}>Search</button>
                    <button onClick={this.setInitial}>Clear</button>
                </div>
            </div>
        )
    }
}

export default FilterCard
