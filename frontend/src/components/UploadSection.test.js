import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadSection from './UploadSection';

describe('UploadSection Component', () => {
  test('renders without crashing', () => {
    render(
      <UploadSection 
        setData={() => {}} 
        setError={() => {}} 
        setSuccess={() => {}} 
      />
    );

    // Check if the "Upload CSV" button is in the document
    expect(screen.getByText(/Upload CSV/i)).toBeInTheDocument();
  });
});
