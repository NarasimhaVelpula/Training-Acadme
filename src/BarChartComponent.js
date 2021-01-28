import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

export class BarChartComponent extends Component {
    render() {
        const data=this.props.yearlyStatistics.map(item=>{
            return({name:item.name,uv:item.count})
        });
        return (
            <div className="BarChart">
                <p className="heading">Skill on demand</p>
                <BarChart width={800} height={200} data={data}>
    <XAxis dataKey="name" stroke="#8884d8" />
    <YAxis />
   
    
    <Bar dataKey="uv" fill="#CD5C5C" barSize={30} />
  </BarChart>
            </div>
        )
    }
}

export default BarChartComponent
