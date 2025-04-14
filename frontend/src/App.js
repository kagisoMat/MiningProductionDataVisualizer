import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Snackbar, Alert, Grid, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getTheme } from './theme';
import ThemeToggle from './components/ThemeToggle';
import Dashboard from './components/Dashboard';
import UploadSection from './components/UploadSection';

function App() {
  const [mode, setMode] = useState('dark');
  const [data, setData] = useState({ columns: [], rows: 0, head: [] });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container sx={{ paddingY: 4 }}>
          <ThemeToggle mode={mode} toggleMode={toggleMode} />
          
          {/* Upload Section */}
          <UploadSection setData={setData} setError={setError} setSuccess={setSuccess} />

          {/* Dashboard with uploaded data */}
          {data.head.length > 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ borderRadius: '16px', boxShadow: 3, padding: 2, background: 'rgba(255,255,255,0.05)' }}>
                  <Dashboard data={data} />
                </Paper>
              </Grid>
            </Grid>
          )}
          
          {/* Error Snackbar */}
          <Snackbar 
            open={!!error} 
            autoHideDuration={6000} 
            onClose={() => setError(null)}
          >
            <Alert onClose={() => setError(null)} severity="error">
              {error}
            </Alert>
          </Snackbar>

          {/* Success Snackbar */}
          <Snackbar 
            open={!!success} 
            autoHideDuration={6000} 
            onClose={() => setSuccess(null)}
          >
            <Alert onClose={() => setSuccess(null)} severity="success">
              {success}
            </Alert>
          </Snackbar>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
