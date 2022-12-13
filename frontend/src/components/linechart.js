import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class TrendChart extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  getMin() {
    if (this.props.data.length === 0) {
        return 0
    }
    const minValue = this.props.data.reduce((prev, curr) => prev.amount < curr.amount ? prev.amount : curr.amount)
    return Math.ceil(minValue/100) * 100 - 500
  }
  getMax() {
    if (this.props.data.length === 0) {
        return 0
    }
    const maxValue = this.props.data.reduce((prev, curr) => prev.amount > curr.amount ? prev.amount : curr.amount)
    return Math.ceil(maxValue/100) * 100 + 500
  }
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[this.getMin(), this.getMax()]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}