import React, { Component } from 'react'

export class ActiveTrainer extends Component {
    render() {
        return (
            <div className="ActiveTrainer">
                <p className="heading">Active Trainer</p>
                <center>
                <p className="value">{this.props.active}/{this.props.total}</p>
                </center>
            </div>
        )
    }
}

export default ActiveTrainer
