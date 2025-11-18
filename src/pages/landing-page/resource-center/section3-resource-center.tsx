import React, { useState, useEffect } from 'react';
import {
  Ship,
  User,
  Wrench,
  Anchor,
  ChefHat,
  Sofa,
  Users,
} from "lucide-react";
import { getAllServices } from '../../../services/service/serviceService';
import ServiceCard from './service-card';
import ServiceCardSkeleton from './service-card-skeleton';

interface Service {
  _id: string;
  name?: string;
  description?: string;
  categories?: string | string[];
}

interface ServiceResponse {
  status: boolean;
  data?: Service[];
}

interface ResourceCenterSection4Props {
  type: string;
  category?: string;
  search?: string;
}

export const getCategoryIcon = (category?: string): React.ReactElement => {
  const iconClass = "text-[#0487D9] text-[32px]";
  
  switch (category?.toLowerCase()) {
    case 'captain':
      return <Ship className={iconClass} />;
    case 'crew':
      return <User className={iconClass} />;
    case 'engineering':
      return <Wrench className={iconClass} />;
    case 'exterior':
      return <Anchor className={iconClass} />;
    case 'galley/chefs':
      return <ChefHat className={iconClass} />;
    case 'interior':
      return <Sofa className={iconClass} />;
    default:
      return <Users className={iconClass} />;
  }
};

const ResourceCenterSection3: React.FC<ResourceCenterSection4Props> = ({ 
  type, 
  category, 
  search 
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  // Responsive items per page
  const getItemsPerPage = (): number => {
    if (isMobile) return 3;
    if (isTablet) return 6;
    return 9;
  };

  const itemsPerPage = getItemsPerPage();

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 768); // md breakpoint
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [type]);

  const fetchServices = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const response: ServiceResponse = await getAllServices(type);
      
      if (response.status && response.data) {
        setServices(response.data);
        setFilteredServices(response.data);
      } else {
        setError('Invalid response format from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filterServices();
  }, [category, search, services]);

  const filterServices = (): void => {
    let filtered = [...services];

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(service =>
        service.name?.toLowerCase().includes(searchLower) ||
        service.description?.toLowerCase().includes(searchLower) ||
        (service.categories && (
          Array.isArray(service.categories) 
            ? service.categories.some(cat => cat?.toLowerCase().includes(searchLower))
            : service.categories.toLowerCase().includes(searchLower)
        ))
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(service => {
        const serviceCategories = service.categories;
        const selectedCategory = category.toLowerCase();
        
        if (Array.isArray(serviceCategories)) {
          return serviceCategories.some(cat => 
            cat?.toLowerCase() === selectedCategory ||
            cat?.toLowerCase().includes(selectedCategory) ||
            selectedCategory.includes(cat?.toLowerCase())
          );
        } else if (typeof serviceCategories === 'string') {
          return serviceCategories.toLowerCase() === selectedCategory ||
                 serviceCategories.toLowerCase().includes(selectedCategory) ||
                 selectedCategory.includes(serviceCategories.toLowerCase());
        }
        
        return false;
      });
    }

    setFilteredServices(filtered);
    setPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  // Simple pagination component
  const PaginationComponent = () => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const showFirstLast = !isMobile;
    const siblingCount = isMobile ? 0 : 1;

    const getVisiblePages = (): number[] => {
      if (totalPages <= 5 || !siblingCount) {
        return pages;
      }

      const leftSibling = Math.max(1, page - siblingCount);
      const rightSibling = Math.min(totalPages, page + siblingCount);

      const visiblePages: number[] = [];
      
      if (showFirstLast && leftSibling > 2) {
        visiblePages.push(1);
        if (leftSibling > 3) visiblePages.push(-1); // -1 represents ellipsis
      }

      for (let i = leftSibling; i <= rightSibling; i++) {
        visiblePages.push(i);
      }

      if (showFirstLast && rightSibling < totalPages - 1) {
        if (rightSibling < totalPages - 2) visiblePages.push(-2);
        visiblePages.push(totalPages);
      }

      return visiblePages;
    };

    const visiblePages = getVisiblePages();

    return (
      <div className="flex justify-center mt-3 sm:mt-4 md:mt-4 mb-2 sm:mb-3 md:mb-3">
        <div className="flex items-center gap-1 sm:gap-2">
          {showFirstLast && (
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base md:text-lg font-medium rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
          )}
          
          <button
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base md:text-lg font-medium rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹
          </button>

          {visiblePages.map((pageNum, idx) => {
            if (pageNum < 0) {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 py-1">
                  ...
                </span>
              );
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base md:text-lg font-medium rounded transition-colors ${
                  page === pageNum
                    ? 'bg-[#0487D9] text-white hover:bg-[#034D92]'
                    : 'hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base md:text-lg font-medium rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ›
          </button>

          {showFirstLast && (
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base md:text-lg font-medium rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="flex justify-center p-1 sm:p-1.5 md:p-1.5">
              <div className="w-full max-w-full">
                <ServiceCardSkeleton />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-600 p-8">
          <p className="mb-4 text-base">Error: {error}</p>
          <button
            onClick={fetchServices}
            className="mt-2 px-6 py-2 bg-gradient-to-r from-[#0487D9] to-[#034D92] 
            text-white rounded hover:from-[#034D92] hover:to-[#0487D9] transition-all cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center text-gray-600 py-16">
          <h3 className="text-xl font-semibold">
            No services found matching your criteria.
          </h3>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full">
            {paginatedServices.map((service) => (
              <div 
                key={service._id} 
                className="flex justify-center p-1 sm:p-1.5 md:p-1.5"
              >
                <div className="w-full max-w-full">
                  <ServiceCard service={service} type={type} />
                </div>
              </div>
            ))}
          </div>
          <PaginationComponent />
        </>
      )}
    </div>
  );
};

export default ResourceCenterSection3