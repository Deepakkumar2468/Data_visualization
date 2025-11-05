import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
  '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16'
];

const TopicsChart = ({ data }) => {
  // Count records by topic
  const chartData = data.reduce((acc, item) => {
    if (item.topic && item.topic.trim() !== '') {
      const existing = acc.find(x => x.name === item.topic);
      if (existing) {
        existing.value += 1;
        existing.totalRelevance += item.relevance || 0;
      } else {
        acc.push({ 
          name: item.topic, 
          value: 1,
          totalRelevance: item.relevance || 0
        });
      }
    }
    return acc;
  }, []).map(item => ({
    name: item.name,
    value: item.value,
    avgRelevance: parseFloat((item.totalRelevance / item.value).toFixed(2))
  })).sort((a, b) => b.value - a.value).slice(0, 10);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
        Top 10 Topics Distribution
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => [
              `${value} records (Avg Relevance: ${props.payload.avgRelevance})`,
              props.payload.name
            ]}
          />
          <Legend 
            layout="vertical" 
            align="right" 
            verticalAlign="middle"
            formatter={(value, entry) => `${value} (${entry.payload.value})`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicsChart;