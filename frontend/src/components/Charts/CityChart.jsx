import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CityChart = ({ data }) => {
  // Group by city and calculate metrics
  const chartData = data.reduce((acc, item) => {
    if (item.city && item.city.trim() !== '') {
      const existing = acc.find(x => x.city === item.city);
      if (existing) {
        existing.intensity += item.intensity || 0;
        existing.likelihood += item.likelihood || 0;
        existing.count += 1;
      } else {
        acc.push({ 
          city: item.city, 
          intensity: item.intensity || 0,
          likelihood: item.likelihood || 0,
          count: 1 
        });
      }
    }
    return acc;
  }, []).map(item => ({
    city: item.city,
    avgIntensity: parseFloat((item.intensity / item.count).toFixed(2)),
    avgLikelihood: parseFloat((item.likelihood / item.count).toFixed(2)),
    records: item.count
  })).sort((a, b) => b.records - a.records).slice(0, 12);

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
        Top 12 Cities - Intensity & Likelihood
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" angle={-45} textAnchor="end" height={120} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgIntensity" fill="#3b82f6" name="Avg Intensity" />
          <Bar dataKey="avgLikelihood" fill="#10b981" name="Avg Likelihood" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CityChart;