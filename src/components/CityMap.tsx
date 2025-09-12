"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Custom colored markers for different priority levels
const createColoredIcon = (color: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const highPriorityIcon = createColoredIcon('#ef4444'); // red-500
const mediumPriorityIcon = createColoredIcon('#f97316'); // orange-500
const lowPriorityIcon = createColoredIcon('#eab308'); // yellow-500
const resolvedIcon = createColoredIcon('#22c55e'); // green-500

// Mock city districts with problems (using New York coordinates as example)
const cityDistricts = [
  {
    id: 1,
    position: [40.7589, -73.9851] as [number, number], // Times Square area
    name: "Downtown District",
    address: "Manhattan Central Business District",
    problems: [
      { title: "Traffic Congestion", priority: "high", status: "active" },
      { title: "Street Lighting", priority: "medium", status: "active" },
    ]
  },
  {
    id: 2,
    position: [40.7614, -73.9776] as [number, number], // Central Park area
    name: "Residential District",
    address: "Upper East Side Neighborhood",
    problems: [
      { title: "Noise Complaints", priority: "medium", status: "active" },
      { title: "Parking Issues", priority: "low", status: "active" },
    ]
  },
  {
    id: 3,
    position: [40.7505, -73.9934] as [number, number], // Chelsea area
    name: "Industrial District",
    address: "Chelsea Manufacturing Zone",
    problems: [
      { title: "Air Quality", priority: "high", status: "resolved" },
      { title: "Waste Management", priority: "medium", status: "active" },
    ]
  },
  {
    id: 4,
    position: [40.7831, -73.9712] as [number, number], // Central Park North
    name: "Parks & Recreation",
    address: "Central Park and Surrounding Areas",
    problems: [
      { title: "Park Maintenance", priority: "low", status: "active" },
      { title: "Public Restrooms", priority: "medium", status: "active" },
    ]
  }
];

const getMarkerIcon = (problems: Array<{ priority: string; status: string }>) => {
  const activeProblems = problems.filter(p => p.status === 'active');
  if (activeProblems.length === 0) return resolvedIcon;
  
  const hasHigh = activeProblems.some(p => p.priority === 'high');
  const hasMedium = activeProblems.some(p => p.priority === 'medium');
  
  if (hasHigh) return highPriorityIcon;
  if (hasMedium) return mediumPriorityIcon;
  return lowPriorityIcon;
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-400';
    case 'medium': return 'text-orange-400';
    case 'low': return 'text-yellow-400';
    default: return 'text-gray-400';
  }
};

const getStatusColor = (status: string) => {
  return status === 'resolved' ? 'text-green-400' : 'text-white';
};

export default function CityMap() {
  useEffect(() => {
    // Fix for leaflet icons in Next.js
    delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <MapContainer
        center={[40.7589, -73.9851]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        dragging={true}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        {cityDistricts.map((district) => (
          <Marker
            key={district.id}
            position={district.position}
            icon={getMarkerIcon(district.problems)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-gray-900 mb-1">{district.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{district.address}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-800">Current Issues:</h4>
                  {district.problems.map((problem, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="flex-1">{problem.title}</span>
                      <div className="flex items-center gap-1">
                        <span className={`font-medium ${getPriorityColor(problem.priority)}`}>
                          {problem.priority}
                        </span>
                        <span className={getStatusColor(problem.status)}>
                          {problem.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-600">
                    Active Issues: {district.problems.filter(p => p.status === 'active').length}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: #1f2937;
          color: white;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
        
        .custom-popup .leaflet-popup-tip {
          background: #1f2937;
        }
        
        .custom-popup .leaflet-popup-close-button {
          color: rgba(255, 255, 255, 0.6) !important;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          top: 8px;
          right: 8px;
        }
        
        .custom-popup .leaflet-popup-close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white !important;
        }
        
        .custom-div-icon {
          background: none !important;
          border: none !important;
        }
        
        .leaflet-container {
          background: #0f172a !important;
        }
        
        .leaflet-control-container {
          display: none !important;
        }
        
        .leaflet-tile {
          opacity: 0.9;
        }
        
        /* Dark theme for popup text */
        .custom-popup h3 {
          color: white !important;
        }
        
        .custom-popup h4 {
          color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .custom-popup p {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        
        .custom-popup .text-gray-900 {
          color: white !important;
        }
        
        .custom-popup .text-gray-600 {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        
        .custom-popup .text-gray-800 {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        
        .custom-popup .border-gray-200 {
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
