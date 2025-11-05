import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const YearChart = ({ data }) => {
  // Group by year and calculate average intensity, likelihood, and relevance
  const chartData = data.reduce((acc, item) => {
    if (item.year && item.year > 0) {
      const existing = acc.find(x => x.year === item.year);
      if (existing) {
        existing.intensity += item.intensity || 0;
        existing.likelihood += item.likelihood || 0;
        existing.relevance += item.relevance || 0;
        existing.count += 1;
      } else {
        acc.push({
          year: item.year,
          intensity: item.intensity || 0,
          likelihood: item.likelihood || 0,
          relevance: item.relevance || 0,
          count: 1
        });
      }
    }
    return acc;
  }, []).map(item => ({
    year: item.year,
    intensity: parseFloat((item.intensity / item.count).toFixed(2)),
    likelihood: parseFloat((item.likelihood / item.count).toFixed(2)),
    relevance: parseFloat((item.relevance / item.count).toFixed(2))
  })).sort((a, b) => a.year - b.year);

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
        Trends Over Years (Intensity, Likelihood, Relevance)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="intensity" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="likelihood" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="relevance" stroke="#f59e0b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearChart;