import { useEffect, useState } from "react";
import axios from "axios";
import './css/Map.css';
import Review from "./Review";
import Search from "./Search";

const { Tmapv3 } = window;

export const Map = () => {
  const [map, setMap] = useState(null);
  const [initMap, setInitMap] = useState(false);
  const [marker, setMarker] = useState(null);
  const mapDiv = document.getElementById('map_div');

  useEffect(() => {
    if (!map_div.firstChild) {
      const center = new Tmapv3.LatLng(35.1018535, 129.0258616);
      const newMap = new Tmapv3.Map("map_div", {
        center: center,
        width: "100%",
        height: "623px",
        zoom: 13, // 확대, 축소
      });

      // 마커 생성
      const newMarker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(35.1018535, 129.0258616),
        map: newMap
      });

      setMap(newMap);
      setMarker(newMarker);
    }
  }, [initMap, marker]);

  return (
    <div className="wrap_map">
      <div id="map_div"></div>
      <Search />
      <Review />
    </div>
  );
}

export default Map