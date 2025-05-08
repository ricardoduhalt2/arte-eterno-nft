import React from 'react';
import { globalErrorHandler } from '../utils/errorHandler';

/**
 * Component to display user-friendly error messages
 * 
 * @param {Object} props
 * @param {Error} props.error - The error object
 * @param {Function} props.onRetry - Optional callback function to retry the operation
 * @param {boolean} props.showDetails - Whether to show technical details (for development)
 */
const ErrorHandler = ({ error, onRetry, showDetails = false }) => {
  // Process the error to get user-friendly information
  const errorInfo = globalErrorHandler(error);
  
  return (
    <div className="error-container" style={styles.container}>
      <div className={`error-card ${errorInfo.severity}`} style={styles.card}>
        <h3 style={styles.title}>{errorInfo.title}</h3>
        <p style={styles.message}>{errorInfo.message}</p>
        
        {onRetry && (
          <button 
            onClick={onRetry}
            style={styles.retryButton}
          >
            Intentar de nuevo
          </button>
        )}
        
        {showDetails && (
          <div style={styles.details}>
            <h4>Detalles técnicos:</h4>
            <pre style={styles.pre}>
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
  },
  title: {
    color: '#d32f2f',
    marginTop: 0,
  },
  message: {
    fontSize: '16px',
    lineHeight: 1.5,
  },
  retryButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '15px',
  },
  details: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '12px',
    color: '#666',
  },
};

export default ErrorHandler;