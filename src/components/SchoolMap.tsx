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

// Mock school areas with problems (using Warsaw coordinates as example)
const schoolAreas = [
  {
    id: 1,
    position: [52.2297, 21.0122] as [number, number], // Warsaw center
    name: "Stołówka",
    address: "Główne piętro, skrzydło wschodnie",
    problems: [
      { title: "Jakość jedzenia", priority: "high", status: "active" },
      { title: "Długie kolejki", priority: "medium", status: "active" },
    ]
  },
  {
    id: 2,
    position: [52.2307, 21.0132] as [number, number], 
    name: "Korytarze",
    address: "Parter i pierwsze piętro",
    problems: [
      { title: "Hałas między lekcjami", priority: "medium", status: "active" },
      { title: "Brak miejsc do siedzenia", priority: "low", status: "active" },
    ]
  },
  {
    id: 3,
    position: [52.2287, 21.0112] as [number, number],
    name: "Plac Zabaw",
    address: "Dziedzinec szkolny",
    problems: [
      { title: "Uszkodzone huśtawki", priority: "high", status: "resolved" },
      { title: "Brak ławek", priority: "low", status: "active" },
    ]
  },
  {
    id: 4,
    position: [52.2317, 21.0142] as [number, number],
    name: "Biblioteka",
    address: "Drugie piętro, skrzydło zachodnie",
    problems: [
      { title: "Za mało komputerów", priority: "medium", status: "active" },
      { title: "Stare książki", priority: "low", status: "active" },
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

export default function SchoolMap() {
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
        center={[52.2297, 21.0122]}
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
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {schoolAreas.map((area) => (
          <Marker
            key={area.id}
            position={area.position}
            icon={getMarkerIcon(area.problems)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-gray-900 mb-1">{area.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{area.address}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-800">Aktualne problemy:</h4>
                  {area.problems.map((problem, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="flex-1">{problem.title}</span>
                      <div className="flex items-center gap-1">
                        <span className={`font-medium ${getPriorityColor(problem.priority)}`}>
                          {problem.priority === 'high' ? 'pilne' : problem.priority === 'medium' ? 'średnie' : 'niskie'}
                        </span>
                        <span className={getStatusColor(problem.status)}>
                          {problem.status === 'resolved' ? 'rozwiązane' : 'aktywne'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-600">
                    Aktywne problemy: {area.problems.filter(p => p.status === 'active').length}
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
