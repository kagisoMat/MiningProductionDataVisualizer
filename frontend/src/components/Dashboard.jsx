import React, { useState, useMemo } from 'react';
import {
  Grid, Card, CardContent, Typography, ToggleButton, ToggleButtonGroup,
  Box, TextField, IconButton, Table, TableHead, TableRow, TableCell, TableBody, Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
  ResponsiveContainer, LineChart, BarChart, AreaChart, Area, Bar, Line,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const COLORS = ['#4e79a7', '#f28e2c', '#e15759'];

function Dashboard({ data }) {
  const [chartType, setChartType] = useState('line');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const chartData = useMemo(() => {
    let filtered = data.head;
    if (startDate) filtered = filtered.filter(item => dayjs(item.Date).isAfter(dayjs(startDate).subtract(1, 'day')));
    if (endDate) filtered = filtered.filter(item => dayjs(item.Date).isBefore(dayjs(endDate).add(1, 'day')));
    return filtered;
  }, [data, startDate, endDate]);

  const totalOutput = chartData.reduce((sum, item) => sum + (item["Daily Output"] || 0), 0);
  const avgYield = chartData.length ? (chartData.reduce((sum, item) => sum + (item["Metal Yield"] || 0), 0) / chartData.length).toFixed(2) : 0;

  const handleChartTypeChange = (event, newType) => {
    if (newType) setChartType(newType);
  };

  const exportChartAsImage = () => {
    const input = document.getElementById('chartContainer');
    html2canvas(input, { backgroundColor: '#1e1e2f' }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'production_chart.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const exportDashboardAsPDF = () => {
    const input = document.getElementById('dashboard');
    html2canvas(input, { backgroundColor: '#1e1e2f' }).then(canvas => {
      const pdf = new jsPDF('landscape');
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
      pdf.save('production_dashboard.pdf');
    });
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Daily Output" fill={COLORS[0]} />
            <Bar dataKey="Metal Yield" fill={COLORS[1]} />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Daily Output" stroke={COLORS[0]} fill="#4e79a766" />
            <Area type="monotone" dataKey="Metal Yield" stroke={COLORS[1]} fill="#f28e2c66" />
          </AreaChart>
        );
      default:
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Daily Output" stroke={COLORS[0]} strokeWidth={2} isAnimationActive />
            <Line type="monotone" dataKey="Metal Yield" stroke={COLORS[1]} strokeWidth={2} isAnimationActive />
          </LineChart>
        );
    }
  };

  return (
    <Box id="dashboard">
      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} md={3}>
          <Card sx={{ borderRadius: '16px', boxShadow: 3, background: '#4e79a7', color: '#fff' }}>
            <CardContent>
              <Typography variant="subtitle2">Total Output</Typography>
              <Typography variant="h5">{totalOutput.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ borderRadius: '16px', boxShadow: 3, background: '#f28e2c', color: '#fff' }}>
            <CardContent>
              <Typography variant="subtitle2">Average Yield</Typography>
              <Typography variant="h5">{avgYield}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth size="small" />}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth size="small" />}
          />
        </Grid>
      </Grid>

      {/* Chart Controls */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          size="small"
          color="primary"
        >
          <ToggleButton value="line">Line</ToggleButton>
          <ToggleButton value="bar">Bar</ToggleButton>
          <ToggleButton value="area">Area</ToggleButton>
        </ToggleButtonGroup>

        <Box>
          <IconButton onClick={exportChartAsImage} sx={{ color: '#fff' }}><DownloadIcon /></IconButton>
          <IconButton onClick={exportDashboardAsPDF} sx={{ color: '#fff' }}><PictureAsPdfIcon /></IconButton>
        </Box>
      </Box>

      {/* Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: '16px', boxShadow: 4, background: 'linear-gradient(135deg, #1e1e2f, #2c2c3c)', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Production & Yield Trends</Typography>
              <Box id="chartContainer">
                <ResponsiveContainer width="100%" height={350}>
                  {renderChart()}
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Table */}
      <Grid item xs={12} mt={4}>
        <Card sx={{ borderRadius: '16px', boxShadow: 3, background: '#1e1e2f', color: '#fff' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Production Data Table</Typography>
            <Paper sx={{ background: 'rgba(255,255,255,0.05)' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {data.columns.map((col, index) => (
                      <TableCell key={index} sx={{ color: '#fff' }}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chartData.map((row, idx) => (
                    <TableRow key={idx}>
                      {data.columns.map((col, index) => (
                        <TableCell key={index} sx={{ color: '#ddd' }}>{row[col]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}

export default Dashboard;
