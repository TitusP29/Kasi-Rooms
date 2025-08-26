import React, { useEffect, useRef } from 'react';

// NOTE: You must add your Google Maps API key in the script src below or use an .env variable
// For demo, this component expects rooms to have { id, title, location, lat, lng }
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const loadScript = (url) => {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
};

const MapView = ({ rooms, center = { lat: -26.2, lng: 28.1 }, radius = 0, onRadiusChange }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`);
    }
    const interval = setInterval(() => {
      if (window.google && window.google.maps && mapRef.current && !mapInstance.current) {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 12,
        });
        // Add markers
        rooms.forEach(room => {
          new window.google.maps.Marker({
            position: { lat: room.lat, lng: room.lng },
            map: mapInstance.current,
            title: room.title,
          });
        });
        // Draw radius
        if (radius > 0) {
          circleRef.current = new window.google.maps.Circle({
            strokeColor: '#1976d2',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#1976d2',
            fillOpacity: 0.15,
            map: mapInstance.current,
            center,
            radius: radius * 1000,
            draggable: false,
            editable: !!onRadiusChange,
          });
          if (onRadiusChange) {
            window.google.maps.event.addListener(circleRef.current, 'radius_changed', () => {
              onRadiusChange(circleRef.current.getRadius() / 1000);
            });
          }
        }
      }
    }, 300);
    return () => clearInterval(interval);
  }, [rooms, center, radius, onRadiusChange]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: 340, borderRadius: 10, margin: '16px 0' }} />
    </div>
  );
};

export default MapView;
