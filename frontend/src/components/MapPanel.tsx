import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import type { Challenge } from "../types";
import { categoryColor } from "./StatusBadge";

const JHARKHAND_CENTER: [number, number] = [23.6, 85.8];

export function MapPanel({ challenges, height = 480 }: { challenges: Challenge[]; height?: number }) {
  return (
    <div className="overflow-hidden rounded-xl2 border border-slate-200 dark:border-white/10" style={{ height }}>
      <MapContainer center={JHARKHAND_CENTER} zoom={7} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {challenges.map((c) => (
          <CircleMarker
            key={c.id}
            center={[c.lat, c.lng]}
            radius={7 + Math.min(6, c.affectedCitizens / 500)}
            pathOptions={{ color: categoryColor(c.category), fillColor: categoryColor(c.category), fillOpacity: 0.75, weight: 1.5 }}
          >
            <Popup>
              <div className="min-w-[220px] font-sans">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{c.displayId}</div>
                <div className="mb-1 font-semibold text-slate-900">{c.title}</div>
                <div className="mb-1 text-sm text-slate-500">{c.district} · {c.category}</div>
                <div className="mb-1 text-sm text-slate-500">{c.severity} priority · {c.affectedCitizens.toLocaleString("en-IN")} affected</div>
                <div className="mb-2 text-sm text-slate-500">Status: {c.status} ({c.progress}%)</div>
                <Link to={`/track/${c.displayId}`} className="text-sm font-medium text-royal-600 hover:underline">
                  View challenge →
                </Link>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
