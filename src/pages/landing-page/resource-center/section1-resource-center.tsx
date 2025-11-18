import React, { useEffect, useMemo } from 'react';
import { Search as SearchIcon, Anchor as ExteriorIcon } from 'lucide-react';

type ToggleType = 'Services' | 'Supplies';

interface Section1Props {
  toggle: ToggleType;
  setToggle: (value: ToggleType) => void;
  category: string;
  setCategory: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  type: "service" | "product";
}

interface Category {
  label: string;
  icon: React.ReactNode;
}

interface CategoryOption {
  label: string;
  value: string;
  icon: string;
}

const categories: Category[] = [
  { label: 'Captain', icon: <img src="/RescourceIcon/captain.png" alt="Captain" className="w-7 h-7" /> },
  { label: 'Crew', icon: <img src="/RescourceIcon/crew.png" alt="Crew" className="w-7 h-7" /> },
  { label: 'Engineering', icon: <img src="/RescourceIcon/Engineering.png" alt="Engineering" className="w-7 h-7" /> },
  { label: 'Exterior', icon: <ExteriorIcon className="w-7 h-7" /> },
  { label: 'Galley/Chefs', icon: <img src="/RescourceIcon/chef.png" alt="Galley/Chefs" className="w-7 h-7" /> },
  { label: 'Interior', icon: <img src="/RescourceIcon/Extiorior.png" alt="Interior" className="w-7 h-7" /> },
];

const serviceOptions: string[] = [
  'Vessel Management & Administration',
  'Maritime Legal & Compliance Assistance',
  'Crew Recruitment & Placement Services',
  'Customs & Immigration Assistance',
  'Insurance & Risk Management',
  'Security & Anti-Piracy Training',
  'Safety Equipment Inspections & Compliance',
  'IT & Cybersecurity Services for Yachts',
  'Charter & Itinerary Planning Assistance',
  'Satellite & Internet Connectivity Solutions',
  'Fresh Produce & Gourmet Food Provisioning',
  'Butcher & Seafood Supply Services',
  'Specialty Ingredient Sourcing',
  'Custom Catering & Onboard Chef Services',
  'Galley Equipment Maintenance & Repair',
  'Wine, Spirits & Specialty Beverages Supply',
  'Specialty Coffee & Tea Provisioning',
  'Dry & Frozen Goods Supply',
  'Galley Deep Cleaning & Sanitation Services',
  'Kitchenware & Culinary Equipment Supply',
  'Marine Engine Servicing & Repairs',
  'Generator Installation & Maintenance',
  'HVAC & Refrigeration Services',
  'Watermaker Installation & Repairs',
  'Fuel System Cleaning & Maintenance',
  'Electrical System Troubleshooting',
  'Navigation & Communication System Setup',
  'Hydraulic System Servicing',
  'Welding & Metal Fabrication Services',
  'Spare Parts Sourcing & Logistics',
  'Yacht Interior Cleaning & Housekeeping',
  'Laundry & Dry Cleaning Services',
  'Custom Interior Design & Refurbishment',
  'Florist & Fresh Flower Arrangements',
  'Carpet & Upholstery Cleaning',
  'Event & Party Planning Services',
  'Provisioning for Guest Supplies',
  'Bar & Beverage Supply Services',
  'AV & Entertainment System Installation',
  'Crew Uniform Tailoring & Embroidery',
  'Yacht Detailing & Washdowns',
  'Teak Deck Sanding & Restoration',
  'Varnishing & Paintwork Services',
  'Fiberglass & Gelcoat Repairs',
  'Docking & Line Handling Assistance',
  'Diving & Underwater Hull Cleaning',
  'Fender & Rope Supply & Maintenance',
  'Tender & Jet Ski Servicing',
  'Watersports Equipment Rental & Repairs',
  'Exterior Upholstery & Canvas Work',
  'Mental Health Support',
  'Confidential Therapy',
  'Career Guidance',
  'Legal Consultation',
  'Financial Advisory',
];

const categoryOptions: CategoryOption[] = [
  {
    label: "Navigation Equipment",
    value: "Navigation Equipment",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/navigation1.png",
  },
  {
    label: "Safety Gear",
    value: "Safety Gear",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/safety1.png",
  },
  {
    label: "Marine Electronics",
    value: "Marine Electronics",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/electronics1.png",
  },
  {
    label: "Deck Equipment",
    value: "Deck_Equipment",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/deck1.png",
  },
  {
    label: "Engine & Propulsion",
    value: "Engine & Propulsion",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/engine1.png",
  },
  {
    label: "Anchoring System",
    value: "Anchoring System",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/anchor1.png",
  },
  {
    label: "Sailing Equipment",
    value: "Sailing Equipment",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/sailing1.png",
  },
  {
    label: "Water Sports Gear",
    value: "Water Sports Gear",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/sports1.png",
  },
  {
    label: "Fishing Equipment",
    value: "Fishing Equipment",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/fishing1.png",
  },
  {
    label: "Marine Furniture",
    value: "Marine Furniture",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/furniture1.png",
  },
  {
    label: "Galley Equipment",
    value: "Galley Equipment",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/galley1.png",
  },
  {
    label: "Refrigeration",
    value: "Refrigeration",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/refrigeration1.png",
  },
  {
    label: "Water Systems",
    value: "Water Systems",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/water1.png",
  },
  {
    label: "Electrical Systems",
    value: "Electrical Systems",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/electrical1.png",
  },
  {
    label: "Hull Maintenance",
    value: "Hull Maintenance",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/maintenance1.png",
  },
  {
    label: "Mooring Equipment",
    value: "Mooring Equipment",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/mooring1.png",
  },
  {
    label: "Communication Systems",
    value: "Communication Systems",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/communication1.png",
  },
  {
    label: "Sea Food Storage",
    value: "Sea Food Storage",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/food_storage1.png",
  },
  {
    label: "Bilge Systems",
    value: "Bilge Systems",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/bilge1.png",
  },
  {
    label: "HVAC Systems",
    value: "HVAC Systems",
    icon: import.meta.env.PUBLIC_URL + "/RescourceIcon/hvac1.png",
  },
];

// Helper function to get random items from an array
const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Section1ResourceCenter: React.FC<Section1Props> = ({ 
  toggle, 
  setToggle, 
  category, 
  setCategory, 
  search, 
  setSearch, 
  type 
}) => {
  // Get 6 random categories based on the type
  const displayCategories = useMemo(() => {
    if (type === 'product') {
      // For products, use categoryOptions
      return getRandomItems(categoryOptions, 6);
    } else {
      // For services, use serviceOptions keys
      return getRandomItems(serviceOptions, 6).map(key => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: key,
        icon: categories.find(cat => cat.label.toLowerCase() === key)?.icon || categories[0].icon
      }));
    }
  }, [type]);

  // Reset category when type changes to avoid invalid selections
  useEffect(() => {
    setCategory('');
  }, [type, setCategory]);

  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-1 py-4 md:py-4 px-4 font-inter">
      <h1 className="font-semibold text-center text-[28px] md:text-4xl mb-0.5 font-inter">
        Navigate The Yachting World With<br />Confidence And Ease
      </h1>
      
      <p className="text-[#555] text-center max-w-[700px] mb-5 font-inter text-base font-normal">
        Explore verified service providers and supplies tailored to the Yachting industry. Search by department, region or keyword or ask our assistant for help.
      </p>

      <div className="flex gap-6 mb-5 justify-center">
        <button
          onClick={() => setToggle('Services')}
          className={`
            px-8 font-medium font-inter text-base h-11 rounded-lg min-w-[120px]
            border border-[#e3f2fd] shadow-none transition-colors cursor-pointer
            ${toggle === 'Services' 
              ? 'bg-[#1976d2] text-white hover:bg-[#1565c0]' 
              : 'bg-white text-[#222] hover:bg-[#f5f5f5]'
            }
          `}
        >
          Services
        </button>
        
        <button
          onClick={() => setToggle('Supplies')}
          className={`
            px-8 font-medium font-inter text-base h-11 rounded-lg min-w-[120px]
            border border-[#e3f2fd] shadow-none transition-colors cursor-pointer
            ${toggle === 'Supplies' 
              ? 'bg-[#1976d2] text-white hover:bg-[#1565c0]' 
              : 'bg-white text-[#222] hover:bg-[#f5f5f5]'
            }
          `}
        >
          Supplies
        </button>
      </div>

      <div className="flex gap-1 flex-wrap justify-center mb-5">
        {displayCategories.map(cat => {
          const isSelected = category === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setCategory(isSelected ? '' : cat.label)}
              className={`
                rounded-lg min-w-[120px] font-medium font-inter text-base h-11 px-4 py-0
                border border-[#e3f2fd] flex items-center justify-center transition-colors cursor-pointer
                ${isSelected 
                  ? 'bg-[#1976d2] text-white hover:bg-[#1565c0]' 
                  : 'bg-white text-[#222] hover:bg-[#f5f5f5]'
                }
              `}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-[600px] mb-0">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search by service, product or keyword..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              w-full h-14 pl-14 pr-8 rounded-2xl bg-white font-inter text-base
              border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1976d2] focus:border-transparent
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Section1ResourceCenter;