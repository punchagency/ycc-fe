import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '../../../hooks/useBookings';
import {
  ArrowLeft,
  Plus,
  Filter,
  ChevronDown,
  Calendar,
  MapPin,
  Building2,
  X,
  FileText,
  Clock,
  CreditCard
} from 'lucide-react';

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();

  // Filter states
  const [bookingStatus, setBookingStatus] = useState('all');
  const [quoteStatus, setQuoteStatus] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const limit = 10;

  // Build filter params
  const filterParams = {
    status: bookingStatus !== 'all' ? bookingStatus : undefined,
    paymentStatus: paymentStatus !== 'all' ? paymentStatus : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    page: currentPage,
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc' as const,
  };

  // Fetch bookings
  const { data, isLoading, error } = useBookings(filterParams);

  const bookings = data?.data || [];
  const pagination = data?.pagination || { currentPage: 1, totalPages: 0, totalItems: 0 };

  // Count active filters
  const activeFiltersCount = [
    bookingStatus !== 'all',
    quoteStatus !== 'all',
    paymentStatus !== 'all',
    startDate,
    endDate,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setBookingStatus('all');
    setQuoteStatus('all');
    setPaymentStatus('all');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
      case 'declined':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-2xl font-bold">Bookings</span>
          </button>

          <button
            onClick={() => navigate('/crew/booking/new-create-booking')}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Create Booking</span>
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden transition-all">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <Filter className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Filter Bookings</h3>
                <p className="text-xs text-gray-500">
                  {activeFiltersCount > 0
                    ? `${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''}`
                    : 'No filters applied'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <span className="px-2.5 py-0.5 bg-sky-600 text-white text-xs font-semibold rounded-full">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${filtersOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          {filtersOpen && (
            <div className="p-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Booking Status */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    <Clock className="w-4 h-4 text-sky-600" />
                    Booking Status
                  </label>
                  <select
                    value={bookingStatus}
                    onChange={(e) => {
                      setBookingStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="declined">Declined</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Quote Status */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    <FileText className="w-4 h-4 text-sky-600" />
                    Quote Status
                  </label>
                  <select
                    value={quoteStatus}
                    onChange={(e) => {
                      setQuoteStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  >
                    <option value="all">All Statuses</option>
                    <option value="not_required">Not Required</option>
                    <option value="pending">Pending</option>
                    <option value="provided">Provided</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Payment Status */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    <CreditCard className="w-4 h-4 text-sky-600" />
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => {
                      setPaymentStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    Date Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all text-sm"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 bg-gray-200 rounded w-32" />
                  <div className="h-6 bg-gray-200 rounded w-24" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            <p>Error loading bookings. Please try again.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first booking</p>
            <button
              onClick={() => navigate('/crew/booking/new-create-booking')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Booking
            </button>
          </div>
        )}

        {/* Bookings List */}
        {!isLoading && !error && bookings.length > 0 && (
          <>
            <div className="space-y-4">
              {bookings.map((booking: any) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex-1 space-y-3">
                      {/* Booking ID and Status */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.bookingId || booking._id}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status || 'Pending'}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                            booking.paymentStatus
                          )}`}
                        >
                          {booking.paymentStatus || 'Pending'}
                        </span>
                      </div>

                      {/* Service Details */}
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.services?.[0]?.service?.name || 'Service'}
                          </p>
                          <p className="text-xs">{booking.vendorName || 'Vendor'}</p>
                        </div>
                      </div>

                      {/* Location */}
                      {booking.serviceLocation && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <p>
                            {booking.serviceLocation.city}, {booking.serviceLocation.state}
                          </p>
                        </div>
                      )}

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <p>
                          {booking.bookingDate
                            ? new Date(booking.bookingDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'Date not set'}
                        </p>
                      </div>
                    </div>

                    {/* Right Content - Actions */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => navigate(`/crew/booking/details/${booking._id}`)}
                        className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium text-sm"
                      >
                        View Details
                      </button>
                      <p className="text-xs text-gray-500">
                        Created {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage >= pagination.totalPages}
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

export default BookingsPage;
