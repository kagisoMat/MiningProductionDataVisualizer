import React from 'react';
import { Button } from '@mui/material';
import Papa from 'papaparse';

const UploadSection = ({ setData, setError, setSuccess }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const { data, errors, meta } = results;
          if (errors.length > 0) {
            setError('Error parsing CSV file.');
            setSuccess(null);
          } else {
            setData({
              columns: meta.fields,
              rows: data.length,
              head: data,
            });
            setSuccess('CSV file uploaded successfully!');
            setError(null);
          }
        },
        error: () => {
          setError('Error reading CSV file.');
          setSuccess(null);
        }
      });
    }
  };

  return (
    <div>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload CSV
        </Button>
      </label>
    </div>
  );
};

export default UploadSection;
