const Data = require('../models/Data');

// Get all data with filters
const getData = async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city
    } = req.query;

    // Build filter object
    let filter = {};
    
    if (end_year && end_year !== '') filter.end_year = end_year;
    if (topic && topic !== '') filter.topic = topic;
    if (sector && sector !== '') filter.sector = sector;
    if (region && region !== '') filter.region = region;
    if (pestle && pestle !== '') filter.pestle = pestle;
    if (source && source !== '') filter.source = source;
    if (swot && swot !== '') filter.swot = swot;
    if (country && country !== '') filter.country = country;
    if (city && city !== '') filter.city = city;

    const data = await Data.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get filter options
const getFilterOptions = async (req, res) => {
  try {
    const [
      endYears,
      topics,
      sectors,
      regions,
      pestles,
      sources,
      swots,
      countries,
      cities
    ] = await Promise.all([
      Data.distinct('end_year'),
      Data.distinct('topic'),
      Data.distinct('sector'),
      Data.distinct('region'),
      Data.distinct('pestle'),
      Data.distinct('source'),
      Data.distinct('swot'),
      Data.distinct('country'),
      Data.distinct('city')
    ]);

    res.json({
      endYears: endYears.filter(y => y !== ''),
      topics: topics.filter(t => t !== ''),
      sectors: sectors.filter(s => s !== ''),
      regions: regions.filter(r => r !== ''),
      pestles: pestles.filter(p => p !== ''),
      sources: sources.filter(s => s !== ''),
      swots: swots.filter(s => s !== ''),
      countries: countries.filter(c => c !== ''),
      cities: cities.filter(c => c !== '')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics
const getStats = async (req, res) => {
  try {
    const totalRecords = await Data.countDocuments();
    
    const avgIntensity = await Data.aggregate([
      { $group: { _id: null, avg: { $avg: '$intensity' } } }
    ]);
    
    const avgLikelihood = await Data.aggregate([
      { $group: { _id: null, avg: { $avg: '$likelihood' } } }
    ]);
    
    const avgRelevance = await Data.aggregate([
      { $group: { _id: null, avg: { $avg: '$relevance' } } }
    ]);

    res.json({
      totalRecords,
      avgIntensity: avgIntensity[0]?.avg || 0,
      avgLikelihood: avgLikelihood[0]?.avg || 0,
      avgRelevance: avgRelevance[0]?.avg || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getData,
  getFilterOptions,
  getStats
};