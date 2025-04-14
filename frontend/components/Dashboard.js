import React, { useState } from 'react';
import { Grid, MenuItem, Select } from '@mui/material';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import ChartCard from './ChartCard';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

function Dashboard({ data }) {
  const [chartType, setChartType] = useState('line');

  const handleChartChange = (event) => {
    setChartType(event.target.value);
  };

  const chartData = data.head;

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Daily Output" stroke="#8884d8" />
            <Line type="monotone" dataKey="Metal Yield" stroke="#82ca9d" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Daily Output" fill="#8884d8" />
            <Bar dataKey="Metal Yield" fill="#82ca9d" />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie data={chartData} dataKey="Metal Yield" nameKey="Date" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Select value={chartType} onChange={handleChartChange} displayEmpty fullWidth>
          <MenuItem value="line">Line Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
          <MenuItem value="pie">Pie Chart</MenuItem>
        </Select>
      </Grid>

      <Grid item xs={12} md={6}>
        <ChartCard title="Production Overview">
          <ResponsiveContainer width="100%" height={300}>
            {renderChart()}
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <ChartCard title="Metal Yield Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            {renderChart()}
          </ResponsiveContainer>
        </ChartCard>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
