import React from 'react';
import { render, screen } from '@testing-library/react';
import UploadSection from './UploadSection'; // adjust the path as needed

describe('UploadSection Component', () => {
  test('renders without crashing', () => {
    render(<UploadSection />); // Renders the component

    // Check if the Upload Section text is in the document
    expect(screen.getByText(/Upload CSV or Excel File/i)).toBeInTheDocument();

    // Check if the "Upload File" button is in the document
    expect(screen.getByText(/Upload File/i)).toBeInTheDocument();
  });
});
