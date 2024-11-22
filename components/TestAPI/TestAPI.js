// TestAPI.js
import React, { useState, useEffect } from 'react';

const TestAPI = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  // Structured test data matching your format
  const metricWithSubmetrics = {
    name: "Accountability",
    submetrics: [
      {
        name: "Timeliness",
        start_date: "2023-01-01T00:00:00Z",
        end_date: "2023-01-31T23:59:59Z",
        data: {
          completed: 45,
          total: 50
        }
      },
      {
        name: "Accuracy",
        start_date: "2023-01-01T00:00:00Z",
        end_date: "2023-01-31T23:59:59Z",
        data: {
          errors: 3,
          total_checks: 150
        }
      }
    ]
  };

  // Fetch dashboard data (GET request)
  const fetchDashboard = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/dashboard/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.headers.get("content-type")?.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(JSON.stringify(errorData));
        } else {
          const textError = await response.text();
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      setDashboardData(data);
      setResponseMessage('Successfully fetched dashboard data');
    } catch (error) {
      setError(`Error fetching dashboard: ${error.message}`);
      console.error('Full error:', error);
    }
  };

  // Create metric with submetrics (POST request)
  const createMetricWithSubmetrics = async () => {
    try {
      console.log('Sending data:', JSON.stringify(metricWithSubmetrics, null, 2));
      
      const response = await fetch('http://127.0.0.1:8000/api/metrics/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metricWithSubmetrics)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        if (response.headers.get("content-type")?.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(JSON.stringify(errorData));
        } else {
          const textError = await response.text();
          throw new Error(`Server error: ${response.status} ${response.statusText}\n${textError}`);
        }
      }

      const data = await response.json();
      setResponseMessage(`Created metric with submetrics. Metric ID: ${data.id}`);
      fetchDashboard(); // Refresh dashboard data
    } catch (error) {
      setError(`Error creating metric with submetrics: ${error.message}`);
      console.error('Full error:', error);
    }
  };

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Test Component</h1>
      
      {/* Server Status */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Backend URL: http://127.0.0.1:8000</h3>
      </div>

      {/* Test buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={fetchDashboard}
          style={{ marginRight: '10px', padding: '10px' }}
        >
          Fetch Dashboard Data
        </button>
        
        <button 
          onClick={createMetricWithSubmetrics}
          style={{ marginRight: '10px', padding: '10px' }}
        >
          Create Metric with Submetrics
        </button>
      </div>

      {/* Response message */}
      {responseMessage && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: '#e6ffe6',
          border: '1px solid #00cc00' 
        }}>
          {responseMessage}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: '#ffe6e6',
          border: '1px solid #cc0000' 
        }}>
          <pre>{error}</pre>
        </div>
      )}

      {/* Display the data being sent */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Data to be sent:</h2>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px',
          borderRadius: '5px',
          overflowX: 'auto'
        }}>
          {JSON.stringify(metricWithSubmetrics, null, 2)}
        </pre>
      </div>

      {/* Display dashboard data */}
      <div>
        <h2>Dashboard Data:</h2>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px',
          borderRadius: '5px',
          overflowX: 'auto'
        }}>
          {JSON.stringify(dashboardData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TestAPI;