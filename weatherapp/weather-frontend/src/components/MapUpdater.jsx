import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import '../style/MapContainer.css';

function MapUpdater({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.setView(coords, map.getZoom());
    }
  }, [coords, map]);

  return null;
}

export default MapUpdater;
