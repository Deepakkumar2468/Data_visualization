import React from 'react';
import { X } from 'lucide-react';

const Filters = ({ filters, setFilters, filterOptions }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      swot: '',
      country: '',
      city: ''
    });
  };

  const filterConfig = [
    { key: 'end_year', label: 'End Year', options: filterOptions.endYears },
    { key: 'topic', label: 'Topic', options: filterOptions.topics },
    { key: 'sector', label: 'Sector', options: filterOptions.sectors },
    { key: 'region', label: 'Region', options: filterOptions.regions },
    { key: 'pestle', label: 'PEST', options: filterOptions.pestles },
    { key: 'source', label: 'Source', options: filterOptions.sources },
    { key: 'swot', label: 'SWOT', options: filterOptions.swots },
    { key: 'country', label: 'Country', options: filterOptions.countries },
    { key: 'city', label: 'City', options: filterOptions.cities }
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Filters</h2>
        <button
          onClick={clearFilters}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          <X size={16} />
          Clear All
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
      }}>
        {filterConfig.map(({ key, label, options }) => (
          <div key={key}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              {label}
            </label>
            <select
              value={filters[key]}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">All</option>
              {options?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;