import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';



export default class StockPieChart extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

//   data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//   ];

  
  COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  RADIAN = Math.PI / 180;
  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * this.RADIAN);
    const y = cy + radius * Math.sin(-midAngle * this.RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`} - {this.props.data[index].name}
      </text>
    );
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={this.props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={this.renderCustomizedLabel}
            outerRadius={300}
            fill="#8884d8"
            dataKey="value"
          >
            {this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
