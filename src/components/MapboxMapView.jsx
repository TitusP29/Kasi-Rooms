import React, { useRef, useEffect, useState } from 'react';
// Install mapbox-gl: npm install mapbox-gl
import mapboxgl from 'mapbox-gl';

// Using environment variable for Mapbox access token
const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapboxMapView = ({ rooms, center = { lat: -26.2, lng: 28.1 }, radius = 0, onRadiusChange }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const circleLayerId = 'radius-circle';
  const [mapError, setMapError] = useState(null);

  // Check if we have a valid access token
  if (!accessToken || accessToken === 'your_mapbox_access_token_here') {
    return (
      <div style={{
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        border: '1px solid #ddd',
        borderRadius: '8px',
        flexDirection: 'column',
        color: '#666'
      }}>
        <h3>Map Unavailable</h3>
        <p>Mapbox access token is not configured.</p>
        <p>Found {rooms.length} rooms in this area.</p>
      </div>
    );
  }

  mapboxgl.accessToken = accessToken;

  useEffect(() => {
    try {
      if (!map.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [center.lng, center.lat],
          zoom: 11,
        });
        
        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          setMapError('Failed to load map. Please check your internet connection.');
        });
      } else {
        map.current.setCenter([center.lng, center.lat]);
      }
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map.');
      return;
    }
    // Remove existing markers
    map.current.markers && map.current.markers.forEach(m => m.remove());
    // Add room markers
    map.current.markers = rooms.map(room => {
      const marker = new mapboxgl.Marker()
        .setLngLat([room.lng, room.lat])
        .setPopup(new mapboxgl.Popup().setText(room.title))
        .addTo(map.current);
      return marker;
    });
    // Draw radius circle
    if (map.current.getLayer(circleLayerId)) {
      map.current.removeLayer(circleLayerId);
      map.current.removeSource(circleLayerId);
    }
    if (radius > 0) {
      const circle = createGeoJSONCircle([center.lng, center.lat], radius);
      map.current.addSource(circleLayerId, { type: 'geojson', data: circle });
      map.current.addLayer({
        id: circleLayerId,
        type: 'fill',
        source: circleLayerId,
        layout: {},
        paint: {
          'fill-color': '#1976d2',
          'fill-opacity': 0.15,
        },
      });
    }
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.markers && map.current.markers.forEach(m => m.remove());
        if (map.current.getLayer(circleLayerId)) {
          map.current.removeLayer(circleLayerId);
          map.current.removeSource(circleLayerId);
        }
      }
    };
  }, [rooms, center, radius]);

  // Helper to create a GeoJSON circle
  function createGeoJSONCircle(center, radiusInKm, points = 64) {
    const coords = {
      latitude: center[1],
      longitude: center[0],
    };
    const km = radiusInKm;
    const ret = [];
    const distanceX = km / (111.320 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;
    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);
      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [ret],
      },
    };
  }

  if (mapError) {
    return (
      <div style={{
        width: '100%',
        height: 340,
        borderRadius: 10,
        margin: '16px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        border: '1px solid #ddd',
        flexDirection: 'column',
        color: '#666'
      }}>
        <h3>Map Error</h3>
        <p>{mapError}</p>
        <p>Found {rooms.length} rooms in this area.</p>
      </div>
    );
  }

  return <div ref={mapContainer} style={{ width: '100%', height: 340, borderRadius: 10, margin: '16px 0' }} />;
};

export default MapboxMapView;
