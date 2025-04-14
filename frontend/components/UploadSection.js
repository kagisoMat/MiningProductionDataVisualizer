import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Card, Typography, Snackbar, Alert } from '@mui/material';

function UploadSection({ setData, setError }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.error) {
        setError(response.data.error);
        setData({ columns: [], rows: 0, head: [] }); // Reset data
      } else {
        setError(null);
        setData(response.data);
      }
    } catch (err) {
      setError('Error uploading file!');
    }
  };

  return (
    <Card sx={{ padding: 3, boxShadow: 3, marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload CSV or Excel File
      </Typography>
      <input type="file" onChange={handleFileChange} />
      <Button
        onClick={handleUpload}
        variant="contained"
        sx={{
          backgroundColor: '#238636',
          color: 'white',
          borderRadius: '8px',
          padding: '10px 20px',
          marginLeft: '10px',
        }}
      >
        Upload File
      </Button>
    </Card>
  );
}

export default UploadSection;
