import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Snackbar, Alert } from '@mui/material';
import { getTheme } from './theme';
import ThemeToggle from './components/ThemeToggle';
import Dashboard from './components/Dashboard';
import UploadSection from './components/UploadSection';

function App() {
  const [mode, setMode] = useState('dark');
  const [data, setData] = useState({ columns: [], rows: 0, head: [] });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // ✅ Added success state

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Container sx={{ paddingY: 4 }}>
        <ThemeToggle mode={mode} toggleMode={toggleMode} />
        <UploadSection setData={setData} setError={setError} setSuccess={setSuccess} /> {/* ✅ pass setSuccess */}
        {data.head.length > 0 && <Dashboard data={data} />}
        
        {/* Error Snackbar */}
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
        </Snackbar>

        {/* ✅ Success Snackbar */}
        <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
          <Alert onClose={() => setSuccess(null)} severity="success">{success}</Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;