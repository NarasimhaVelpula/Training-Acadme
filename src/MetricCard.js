import React, { Component } from 'react'

export class MetricCard extends Component {

    render() {
        return (
            <div className="MetricCard">
                <p className="count">{this.props.count}</p>
                <p className={"metric-status "+this.props.status}>{this.props.status}</p>
            </div>
        )
    }
}

export default MetricCard
