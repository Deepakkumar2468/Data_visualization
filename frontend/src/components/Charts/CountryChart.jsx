import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CountryChart = ({ data }) => {
  // Group by country and calculate average intensity
  const chartData = data.reduce((acc, item) => {
    if (item.country && item.country.trim() !== '') {
      const existing = acc.find(x => x.country === item.country);
      if (existing) {
        existing.total += item.intensity || 0;
        existing.count += 1;
      } else {
        acc.push({ 
          country: item.country, 
          total: item.intensity || 0, 
          count: 1 
        });
      }
    }
    return acc;
  }, []).map(item => ({
    country: item.country,
    intensity: parseFloat((item.total / item.count).toFixed(2)),
    records: item.count
  })).sort((a, b) => b.records - a.records).slice(0, 15);

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
        Top 15 Countries by Records & Average Intensity
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" angle={-45} textAnchor="end" height={120} />
          <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="records" fill="#3b82f6" name="Number of Records" />
          <Bar yAxisId="right" dataKey="intensity" fill="#10b981" name="Avg Intensity" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CountryChart;