import React, { Component } from 'react'

export class SkillCard extends Component {
    render() {
        return (
            <div className="skillCard">
                <p className="heading">Skill on demand</p>
                <div style={{textAlign:'center'}}>
                <img src={this.props.image} height="50px" width="50px" alt={this.props.name}/><br />
                {this.props.name}<br />
                {this.props.training+" trainings"}<br />
                {" in past"+this.props.months+" "+this.props.timeperiod}
                </div>
            </div>
        )
    }
}

export default SkillCard
