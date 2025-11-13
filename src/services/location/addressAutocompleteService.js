/**
 * Address Autocomplete Service
 * Uses Google Places API with intelligent caching
 */

const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_PREFIX = 'ycc_address_cache_';

/**
 * Cache manager for address data
 */
class AddressCache {
  static get(key) {
    try {
      const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
        return null;
      }

      console.log('📦 Cache hit for:', key);
      return data;
    } catch (err) {
      console.error('Cache read error:', err);
      return null;
    }
  }

  static set(key, data) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheData));
      console.log('💾 Cached:', key);
    } catch (err) {
      console.error('Cache write error:', err);
    }
  }

  static clear() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
      console.log('🗑️ Cache cleared');
    } catch (err) {
      console.error('Cache clear error:', err);
    }
  }
}

/**
 * Get cities for a specific state/country using Google Places API
 * @param {string} countryCode - ISO country code
 * @param {string} stateCode - State code
 * @param {string} searchTerm - Search term for filtering
 * @returns {Promise<Array>} Array of city suggestions
 */
export const getCitySuggestions = async (countryCode, stateCode, searchTerm = '') => {
  console.log('🔧 getCitySuggestions called with:', { countryCode, stateCode, searchTerm });
  
  if (!searchTerm || searchTerm.length < 2) {
    console.log('⚠️ Search term too short or empty');
    return [];
  }

  // Only support US cities for now
  if (countryCode !== 'US') {
    console.log('⚠️ Only US cities supported currently');
    return [];
  }

  const cacheKey = `city_${countryCode}_${stateCode}_${searchTerm.toLowerCase()}`;
  const cached = AddressCache.get(cacheKey);
  if (cached) {
    console.log('📦 Returning cached cities:', cached);
    return cached;
  }

  console.log('🔍 Searching local cities database...');

  try {
    // Dynamic import to avoid circular dependencies
    const { searchCities } = await import('../../data/citiesData');
    
    const cities = searchCities(stateCode, searchTerm);
    console.log('✅ Found cities from local database:', cities);
    console.log(`🏙️ Found ${cities.length} cities`);
    
    if (cities.length > 0) {
      AddressCache.set(cacheKey, cities);
    }
    
    return cities;
  } catch (error) {
    console.error('❌ Exception in getCitySuggestions:', error);
    console.error('❌ Error details:', error.message);
    return [];
  }
};

/**
 * Get street address suggestions using Google Places API
 * @param {string} countryCode - ISO country code
 * @param {string} stateCode - State code
 * @param {string} city - City name
 * @param {string} searchTerm - Search term for street address
 * @returns {Promise<Array>} Array of address suggestions
 */
export const getStreetSuggestions = async (countryCode, stateCode, city, searchTerm = '') => {
  console.log('🔧 getStreetSuggestions called - Street validation disabled (using free text)');
  // Street validation disabled - users can enter any street address
  // No API calls needed
  return [];
};

/**
 * Validate complete address using Google Geocoding API
 * @param {Object} address - Address object
 * @returns {Promise<Object>} Validation result
 */
export const validateAddress = async (address) => {
  const { street, city, state, country, zip } = address;

  console.log('✅ Validating address:', address);

  try {
    const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ Google Places API key not configured');
      return { valid: true, message: 'API key not configured' };
    }

    const fullAddress = `${street}, ${city}, ${state}, ${zip || ''}, ${country}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      return {
        valid: true,
        formatted: result.formatted_address,
        location: result.geometry.location,
        message: 'Address verified',
      };
    }

    return {
      valid: false,
      message: 'Address could not be verified. Please check and try again.',
    };
  } catch (error) {
    console.error('Error validating address:', error);
    return {
      valid: false,
      message: 'Error validating address',
    };
  }
};

/**
 * Clear address cache (useful for debugging or after updates)
 */
export const clearAddressCache = () => {
  AddressCache.clear();
};

export default {
  getCitySuggestions,
  getStreetSuggestions,
  validateAddress,
  clearAddressCache,
};
