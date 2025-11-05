// import React, { useState, useEffect } from 'react';
// import { getData, getFilterOptions, getStats } from '../Services/api';
// import Filters from './Filters';
// import IntensityChart from './Charts/IntensityChart';
// import RegionChart from './Charts/RegionChart';
// import LikelihoodChart from './Charts/LikelihoodChart';
// import { BarChart3, TrendingUp, Target, Database } from 'lucide-react';


// const Dashboard = () => {
//   const [data, setData] = useState([]);
//   const [filterOptions, setFilterOptions] = useState({
//     endYears: [],
//     topics: [],
//     sectors: [],
//     regions: [],
//     pestles: [],
//     sources: [],
//     swots: [],
//     countries: [],
//     cities: []
//   });
//   const [filters, setFilters] = useState({
//     end_year: '',
//     topic: '',
//     sector: '',
//     region: '',
//     pestle: '',
//     source: '',
//     swot: '',
//     country: '',
//     city: ''
//   });
//   const [stats, setStats] = useState({
//     totalRecords: 0,
//     avgIntensity: 0,
//     avgLikelihood: 0,
//     avgRelevance: 0
//   });
//   const [loading, setLoading] = useState(true);

//   // Fetch filter options on mount
//   useEffect(() => {
//     const fetchFilterOptions = async () => {
//       try {
//         const options = await getFilterOptions();
//         setFilterOptions(options);
//       } catch (error) {
//         console.error('Error fetching filter options:', error);
//       }
//     };
//     fetchFilterOptions();
//   }, []);

//   // Fetch data when filters change
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [result, statsData] = await Promise.all([
//           getData(filters),
//           getStats()
//         ]);
//         setData(result);
//         setStats(statsData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [filters]);

//   const StatCard = ({ title, value, icon: Icon, color }) => (
//     <div style={{
//       backgroundColor: '#fff',
//       padding: '20px',
//       borderRadius: '8px',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     }}>
//       <div>
//         <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>{title}</p>
//         <h3 style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: '700' }}>
//           {typeof value === 'number' ? value.toFixed(2) : value}
//         </h3>
//       </div>
//       <div style={{
//         backgroundColor: color,
//         padding: '12px',
//         borderRadius: '8px'
//       }}>
//         <Icon size={24} color="white" />
//       </div>
//     </div>
//   );

//   if (loading && data.length === 0) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         fontSize: '18px'
//       }}>
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#f3f4f6',
//       padding: '20px'
//     }}>
//       <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
//         {/* Header */}
//         <div style={{
//           backgroundColor: '#fff',
//           padding: '30px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//           marginBottom: '20px'
//         }}>
//           <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#111827' }}>
//             Blackcoffer Data Visualization Dashboard
//           </h1>
//           <p style={{ margin: '5px 0 0 0', color: '#6b7280' }}>
//             Interactive analytics and insights
//           </p>
//         </div>

//         {/* Filters */}
//         <Filters
//           filters={filters}
//           setFilters={setFilters}
//           filterOptions={filterOptions}
//         />

//         {/* Stats Cards */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//           gap: '20px',
//           marginBottom: '20px'
//         }}>
//           <StatCard
//             title="Total Records"
//             value={data.length}
//             icon={Database}
//             color="#3b82f6"
//           />
//           <StatCard
//             title="Avg Intensity"
//             value={stats.avgIntensity}
//             icon={BarChart3}
//             color="#10b981"
//           />
//           <StatCard
//             title="Avg Likelihood"
//             value={stats.avgLikelihood}
//             icon={TrendingUp}
//             color="#f59e0b"
//           />
//           <StatCard
//             title="Avg Relevance"
//             value={stats.avgRelevance}
//             icon={Target}
//             color="#ef4444"
//           />
//         </div>

//         {/* Charts */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
//           gap: '20px',
//           marginBottom: '20px'
//         }}>
//           <IntensityChart data={data} />
//           <RegionChart data={data} />
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//           <LikelihoodChart data={data} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
















import React, { useState, useEffect } from 'react';
import { getData, getFilterOptions, getStats } from '../Services/api';
import Filters from './Filters';
import IntensityChart from './Charts/IntensityChart';
import RegionChart from './Charts/RegionChart';
import LikelihoodChart from './Charts/LikelihoodChart';
import YearChart from './Charts/YearChart';
import CountryChart from './Charts/CountryChart';
import TopicsChart from './Charts/TopicsChart';
import CityChart from './Charts/CityChart';
import { BarChart3, TrendingUp, Target, Database } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    endYears: [],
    topics: [],
    sectors: [],
    regions: [],
    pestles: [],
    sources: [],
    swots: [],
    countries: [],
    cities: []
  });
  const [filters, setFilters] = useState({
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
  const [stats, setStats] = useState({
    totalRecords: 0,
    avgIntensity: 0,
    avgLikelihood: 0,
    avgRelevance: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch data when filters change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [result, statsData] = await Promise.all([
          getData(filters),
          getStats()
        ]);
        setData(result);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>{title}</p>
        <h3 style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: '700' }}>
          {typeof value === 'number' ? value.toFixed(2) : value}
        </h3>
      </div>
      <div style={{
        backgroundColor: color,
        padding: '12px',
        borderRadius: '8px'
      }}>
        <Icon size={24} color="white" />
      </div>
    </div>
  );

  if (loading && data.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#111827' }}>
            Blackcoffer Data Visualization Dashboard
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#6b7280' }}>
            Interactive analytics and insights
          </p>
        </div>

        {/* Filters */}
        <Filters
          filters={filters}
          setFilters={setFilters}
          filterOptions={filterOptions}
        />

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <StatCard
            title="Total Records"
            value={data.length}
            icon={Database}
            color="#3b82f6"
          />
          <StatCard
            title="Avg Intensity"
            value={stats.avgIntensity}
            icon={BarChart3}
            color="#10b981"
          />
          <StatCard
            title="Avg Likelihood"
            value={stats.avgLikelihood}
            icon={TrendingUp}
            color="#f59e0b"
          />
          <StatCard
            title="Avg Relevance"
            value={stats.avgRelevance}
            icon={Target}
            color="#ef4444"
          />
        </div>

        {/* Charts Row 1 - Intensity & Region */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <IntensityChart data={data} />
          <RegionChart data={data} />
        </div>

        {/* Charts Row 2 - Year Trends & Topics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <YearChart data={data} />
          <TopicsChart data={data} />
        </div>

        {/* Charts Row 3 - Country & City */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <CountryChart data={data} />
          <CityChart data={data} />
        </div>

        {/* Full Width Chart - Likelihood Trends */}
        <div style={{ marginBottom: '20px' }}>
          <LikelihoodChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;