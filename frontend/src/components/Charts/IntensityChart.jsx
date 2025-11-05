import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IntensityChart = ({ data }) => {
  // Group by sector and calculate average intensity
  const chartData = data.reduce((acc, item) => {
    if (item.sector && item.intensity) {
      const existing = acc.find(x => x.sector === item.sector);
      if (existing) {
        existing.total += item.intensity;
        existing.count += 1;
      } else {
        acc.push({ sector: item.sector, total: item.intensity, count: 1 });
      }
    }
    return acc;
  }, []).map(item => ({
    sector: item.sector,
    intensity: parseFloat((item.total / item.count).toFixed(2))
  })).sort((a, b) => b.intensity - a.intensity).slice(0, 10);

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
        Average Intensity by Sector (Top 10)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sector" angle={-45} textAnchor="end" height={120} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="intensity" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IntensityChart;