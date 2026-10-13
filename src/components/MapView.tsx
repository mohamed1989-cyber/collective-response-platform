import { useEffect, useRef } from 'react';
import L from 'leaflet';

export type MarkerKind = 'report' | 'critical' | 'team' | 'inspector' | 'vehicle' | 'incident' | 'project' | 'zone';

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  kind?: MarkerKind;
  /** small line shown in the popup, e.g. "حي النرجس • قيد التنفيذ" */
  label?: string;
  popup?: string;
}

export interface MapPolygon {
  points: [number, number][];
  color?: string;
  label?: string;
  dashed?: boolean;
}

export interface MapPolyline {
  points: [number, number][];
  color?: string;
  dashed?: boolean;
}

export interface MapZoneCircle {
  center: [number, number];
  radius: number;
  color?: string;
  label?: string;
}

export interface MapLegendEntry {
  label: string;
  color: string;
}

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  polygons?: MapPolygon[];
  polylines?: MapPolyline[];
  zones?: MapZoneCircle[];
  /** Fit the view to the provided features when they change */
  fitBounds?: boolean;
  height?: number | string;
  className?: string;
  legend?: MapLegendEntry[];
  showLegend?: boolean;
  onMarkerClick?: (m: MapMarker) => void;
}

const kindColors: Record<MarkerKind, string> = {
  report: '#f59e0b',
  critical: '#ef4444',
  team: '#0b2545',
  inspector: '#06b6d4',
  vehicle: '#8b5cf6',
  incident: '#dc2626',
  project: '#10b981',
  zone: '#64748b',
};

const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

export function MapView({
  center = [24.7136, 46.6753],
  zoom = 12,
  markers = [],
  polygons = [],
  polylines = [],
  zones = [],
  fitBounds = false,
  height = 360,
  className = '',
  legend,
  showLegend = true,
  onMarkerClick,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const themeRef = useRef<string>('light');

  // Create map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
    });
    const tile = L.tileLayer(LIGHT_TILES, {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    });
    tile.addTo(map);
    const layer = L.layerGroup().addTo(map);
    mapRef.current = map;
    tileRef.current = tile;
    layerRef.current = layer;
    setTimeout(() => map.invalidateSize(), 200);
    return () => {
      map.remove();
      mapRef.current = null;
      tileRef.current = null;
      layerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Theme-aware tiles
  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    if (theme === themeRef.current) return;
    themeRef.current = theme;
    const map = mapRef.current;
    const tile = tileRef.current;
    if (!map || !tile) return;
    tile.setUrl(theme === 'dark' ? DARK_TILES : LIGHT_TILES);
  });

  // Features
  const signature = JSON.stringify({
    m: markers.map((m) => [m.id, m.lat, m.lng]),
    p: polygons.map((p) => p.points),
    l: polylines.map((p) => p.points),
    z: zones.map((z) => [z.center, z.radius]),
  });

  useEffect(() => {
    const map = mapRef.current;
    const group = layerRef.current;
    if (!map || !group) return;
    group.clearLayers();
    const bounds: [number, number][] = [];

    polygons.forEach((poly) => {
      L.polygon(poly.points, {
        color: poly.color ?? '#2c5fa2',
        weight: 2,
        fillColor: poly.color ?? '#2c5fa2',
        fillOpacity: 0.1,
        dashArray: poly.dashed ? '6,6' : undefined,
      })
        .bindTooltip(poly.label ?? 'منطقة', { direction: 'top' })
        .addTo(group);
      poly.points.forEach((pt) => bounds.push(pt));
    });

    zones.forEach((z) => {
      L.circle(z.center, {
        radius: z.radius,
        color: z.color ?? '#ef4444',
        weight: 1.5,
        fillColor: z.color ?? '#ef4444',
        fillOpacity: 0.12,
      })
        .bindTooltip(z.label ?? 'نطاق تأثر', { direction: 'top' })
        .addTo(group);
      bounds.push(z.center);
    });

    polylines.forEach((line) => {
      L.polyline(line.points, {
        color: line.color ?? '#10b981',
        weight: 3,
        dashArray: line.dashed ? '8,8' : undefined,
      }).addTo(group);
      line.points.forEach((pt) => bounds.push(pt));
    });

    markers.forEach((m) => {
      const color = kindColors[m.kind ?? 'report'];
      const isCritical = m.kind === 'critical';
      const html = `<span style="display:block;width:15px;height:15px;border-radius:50%;background:${color};border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4)"></span>${
        isCritical
          ? `<span style="position:absolute;inset:-6px;border-radius:50%;border:2px solid ${color};opacity:.6;animation:crp-ping 1.4s ease-out infinite"></span>`
          : ''
      }`;
      const marker = L.marker([m.lat, m.lng], {
        icon: L.divIcon({
          className: 'crp-divicon',
          html: `<div style="position:relative;display:flex;align-items:center;justify-content:center;width:15px;height:15px">${html}</div>`,
          iconSize: [15, 15],
          iconAnchor: [7, 7],
        }),
        title: m.title,
      });
      const popupLines = [`<b style="font-size:13px">${m.title}</b>`];
      if (m.label) popupLines.push(`<span style="color:#64748b;font-size:11px">${m.label}</span>`);
      if (m.popup) popupLines.push(`<span style="font-size:11px">${m.popup}</span>`);
      marker.bindPopup(popupLines.join('<br/>'), { maxWidth: 240 });
      if (onMarkerClick) marker.on('click', () => onMarkerClick(m));
      marker.addTo(group);
      bounds.push([m.lat, m.lng]);
    });

    if (fitBounds && bounds.length > 0) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 14 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, fitBounds]);

  useEffect(() => {
    const timer = setTimeout(() => mapRef.current?.invalidateSize(), 250);
    return () => clearTimeout(timer);
  });

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ height }}>
      <div ref={containerRef} className="absolute inset-0 z-0" />
      {showLegend && legend && legend.length > 0 && (
        <div className="absolute z-[50] bottom-3 start-3 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-card px-3 py-2.5 space-y-1.5">
          {legend.map((entry) => (
            <div key={entry.label} className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
              {entry.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
