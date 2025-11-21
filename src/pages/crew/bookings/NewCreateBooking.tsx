import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrewServices } from '../../../hooks/useBookings';
import { ArrowLeft, Search, Filter, MapPin, DollarSign, Building2, ChevronDown } from 'lucide-react';

const NewCreateBooking: React.FC = () => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('random');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Fetch services with filters
  const { data, isLoading, error } = useCrewServices({
    search: searchTerm,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    page: currentPage,
    limit: 12,
    sortBy,
  });

  const services = data?.data?.services || [];
  const pagination = data?.data?.pagination || { currentPage: 1, totalPages: 0, totalServices: 0 };

  const handleBookNow = (service: any) => {
    // Navigate to confirmation page or handle booking
    console.log('Book service:', service);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-semibold">New Booking</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Find Your Perfect Service
          </h1>
          <p className="text-gray-600 text-lg">
            Discover professional crew services from verified providers worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                />
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
            >
              <option value="random">Featured</option>
              <option value="name">Name A-Z</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="mt-4 flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Advanced Filters Content (Placeholder) */}
          {filtersOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">Additional filters coming soon...</p>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-700">
            <span className="font-semibold">{pagination.totalServices || 0}</span> services found
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-xl" />
                <div className="bg-white p-4 rounded-b-xl border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            <p>Error loading services. Please try again.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && services.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && !error && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service: any) => (
                <div
                  key={service._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Service Image */}
                  <div className="relative h-48 bg-gradient-to-br from-sky-100 to-blue-100 overflow-hidden">
                    {service.imageURLs?.[0] ? (
                      <img
                        src={service.imageURLs[0]}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    {service.category?.name && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                        {service.category.name}
                      </span>
                    )}
                    {service.isQuotable && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                        Quotable
                      </span>
                    )}
                  </div>

                  {/* Service Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {service.name}
                    </h3>

                    {service.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
                        {service.description}
                      </p>
                    )}

                    {/* Business Info */}
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{service.business?.businessName || 'Service Provider'}</span>
                    </div>

                    {service.business?.address && (
                      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">
                          {service.business.address.city}, {service.business.address.country}
                        </span>
                      </div>
                    )}

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <div className="flex items-center gap-1 text-2xl font-bold text-sky-600">
                          <DollarSign className="w-5 h-5" />
                          {service.price}
                        </div>
                        <p className="text-xs text-gray-500">per service</p>
                      </div>
                      <button
                        onClick={() => handleBookNow(service)}
                        className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium text-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrevPage}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewCreateBooking;
