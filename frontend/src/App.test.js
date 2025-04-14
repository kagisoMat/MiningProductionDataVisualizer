import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock the UploadSection component to simulate file upload behavior
jest.mock('./components/UploadSection', () => ({
  __esModule: true,
  default: ({ setData, setError, setSuccess }) => {
    return (
      <div>
        <button
          onClick={() => setSuccess('File uploaded successfully!')}
        >
          Simulate Success
        </button>
        <button
          onClick={() => setError('Failed to upload file.')}
        >
          Simulate Error
        </button>
      </div>
    );
  },
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    
    // Check if the upload section buttons exist
    expect(screen.getByText(/Simulate Success/i)).toBeInTheDocument();
    expect(screen.getByText(/Simulate Error/i)).toBeInTheDocument();
  });

  it('shows success Snackbar when file upload succeeds', async () => {
    render(<App />);

    // Simulate success button click
    fireEvent.click(screen.getByText(/Simulate Success/i));

    // Wait for the success Snackbar to appear
    await waitFor(() => screen.getByText(/File uploaded successfully!/));

    expect(screen.getByText(/File uploaded successfully!/)).toBeInTheDocument();
  });

  it('shows error Snackbar when file upload fails', async () => {
    render(<App />);

    // Simulate error button click
    fireEvent.click(screen.getByText(/Simulate Error/i));

    // Wait for the error Snackbar to appear
    await waitFor(() => screen.getByText(/Failed to upload file./));

    expect(screen.getByText(/Failed to upload file./)).toBeInTheDocument();
  });
});
