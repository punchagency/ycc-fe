// ServiceCardWithErrorBoundary.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";
import { getCategoryIcon } from "./section3-resource-center";
import { useReduxAuth } from "@/hooks/useReduxAuth";

/* ----------------------------- Types ----------------------------- */
export type Service = {
  _id: string;
  name?: string;
  description?: string;
  image?: string;
  categories?: string | string[];
  category?: string | string[];
  location?: string;
  email?: string;
  supplier?: { location?: string; email?: string };
  vendor?: { email?: string };
  // any other fields...
};

type ServiceCardProps = {
  service: Service;
  type: "service" | "product" | string;
};

/* ------------------------- Image error hook ----------------------- */
const useImageError = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => setImageError(true), []);
  const handleImageLoad = useCallback(() => setImageError(false), []);
  const resetImageError = useCallback(() => setImageError(false), []);

  return { imageError, handleImageError, handleImageLoad, resetImageError };
};

/* ---------------------- Navigation hook logic --------------------- */
const useServiceNavigation = (type: string) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useReduxAuth();

  const handleAction = useCallback(
    (service: Service) => {
      const token = localStorage.getItem("token");

      // If user not authenticated and we are going to checkout pages for guest flow:
      if ((!isAuthenticated || !token) && type === "service") {
        navigate(`/service-checkout/${service._id}`, { state: { service } });
        return;
      } else if ((!isAuthenticated || !token) && type === "product") {
        navigate(`/product-checkout/${service._id}`, { state: { product: service } });
        return;
      }

      // Authenticated flows:
      if (type === "service") {
        navigate("/crew/booking/confirm-booking", { state: { service } });
      } else {
        navigate("/crew/orders-management", { state: { service } });
      }
    },
    [navigate, isAuthenticated, type]
  );

  return { handleAction };
};

/* ---------------------- Helpers for service data ------------------ */
const getDisplayCategories = (service?: Service): string[] => {
  if (!service) return [];
  if (Array.isArray(service.categories)) return service.categories;
  if (service.categories) return [service.categories];
  if (service.category) {
    return typeof service.category === "string" ? [service.category] : service.category;
  }
  return [];
};

const getContactInfo = (service?: Service) => {
  return {
    location: service?.supplier?.location || service?.location || "Location not specified",
    email:
      service?.supplier?.email ||
      service?.email ||
      service?.vendor?.email ||
      "Email not specified",
  };
};

/* ------------------------- ServiceCard ---------------------------- */
const ServiceCardInner: React.FC<ServiceCardProps> = React.memo(({ service, type }) => {
  const { imageError, handleImageError, handleImageLoad, resetImageError } = useImageError();
  const { handleAction } = useServiceNavigation(type);

  const displayCategories = useMemo(() => getDisplayCategories(service), [service]);
  const contactInfo = useMemo(() => getContactInfo(service), [service]);

  // Reset image error when image or service changes
  useEffect(() => {
    resetImageError();
  }, [service?.image, resetImageError]);

  const handleCardClick = useCallback(() => {
    handleAction(service);
  }, [handleAction, service]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick]
  );

  if (!service) return null;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${type === "service" ? "Service" : "Product"} card for ${service.name}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyPress}
      className="group relative h-[400px] flex flex-col rounded-2xl bg-slate-50 shadow-sm transition-transform duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-slate-100">
        {!imageError && service.image ? (
          <img
            key={service._id}
            src={service.image}
            alt={`${service.name ?? "service"} - ${type} image`}
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
            className="w-full h-full object-cover transition-opacity"
          />
        ) : (
          <div
            role="img"
            aria-label={`${type} placeholder image`}
            className="w-full h-full flex flex-col items-center justify-center text-slate-500"
          >
            <div className="text-4xl mb-1">{getCategoryIcon(displayCategories[0] || "")}</div>
            <span className="text-sm text-slate-400">{type === "service" ? "Service Image" : "Product Image"}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 capitalize leading-tight mb-1">
            {service.name}
          </h3>

          {/* Categories */}
          {displayCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {displayCategories.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-sm font-medium px-3 py-1 rounded-md bg-blue-50 text-blue-700"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <p
          className="text-sm text-slate-700 leading-relaxed overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {service.description}
        </p>

        {/* Contact info */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0 text-slate-500" aria-hidden />
            <span className="truncate" title={contactInfo.location}>
              {contactInfo.location}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Mail className="w-4 h-4 flex-shrink-0 text-slate-500" aria-hidden />
            <span className="truncate" title={contactInfo.email}>
              {contactInfo.email}
            </span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="p-4 pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          aria-label={`${type === "service" ? "Request quote for" : "Order"} ${service.name}`}
          className="w-full inline-flex items-center justify-center py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#0487D9] to-[#034D92] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
        >
          {type === "service" ? "Request Quote" : "Order Now"}
        </button>
      </div>
    </article>
  );
});

ServiceCardInner.displayName = "ServiceCardInner";

/* ----------------------- Error Boundary --------------------------- */
type ErrorBoundaryState = { hasError: boolean; error?: Error | null };

class ServiceCardErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console or external service
    // eslint-disable-next-line no-console
    console.error("ServiceCard Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl p-6 text-center bg-red-50 text-red-800">
          <h4 className="text-lg font-semibold mb-2">Something went wrong with this service card</h4>
          <p className="text-sm">Please try refreshing the page or contact support if the problem persists.</p>
          {import.meta.env.NODE_ENV === "development" && (
            <pre className="mt-3 text-xs text-left p-2 bg-white/50 rounded">{String(this.state.error?.message ?? "")}</pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

/* -------------------- Wrapped export component -------------------- */
const ServiceCardWithErrorBoundary: React.FC<ServiceCardProps> = ({ service, type }) => {
  return (
    <ServiceCardErrorBoundary>
      <ServiceCardInner service={service} type={type} />
    </ServiceCardErrorBoundary>
  );
};

ServiceCardWithErrorBoundary.displayName = "ServiceCardWithErrorBoundary";

export default ServiceCardWithErrorBoundary;