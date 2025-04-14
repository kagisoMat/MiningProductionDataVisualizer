import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ChartCard({ title, children }) {
  return (
    <Card sx={{ borderRadius: '16px', boxShadow: 3, background: 'rgba(255,255,255,0.05)' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export default ChartCard;
