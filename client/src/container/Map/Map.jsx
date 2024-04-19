import { useContext, useEffect, useState } from "react";
import axios from "axios";
import './css/Map.css';
import Review from "./Review";
import Search from "./Search";
import { dtContext } from '../../App';
import { useNavigate } from "react-router-dom";
import { loginContext } from '../../App';
const { Tmapv3 } = window;

export const Map = () => {
  const [map, setMap] = useState(null);
  const navigate = useNavigate();
  const [initMap, setInitMap] = useState(false);
  const [marker, setMarker] = useState(null);
  const mapDiv = document.getElementById('map_div');
  const { destId } = useContext(dtContext);
  const { loginUser } = useContext(loginContext);
  const [showReview, setShowReview] = useState(false);
  const [destinationCoords, setDestinationCoords] = useState({ x: null, y: null });

  useEffect(() => {
    if (!map_div.firstChild) {
      const center = new Tmapv3.LatLng(35.1018535, 129.0258616);
      const newMap = new Tmapv3.Map("map_div", {
        center: center,
        width: "100%",
        height: "623px",
        zoom: 13, // 확대, 축소
      });

      setMap(newMap);
    }
  }, [initMap]);

  // 좌표얻어오는 useEffect
  useEffect(() => {
    if (map && destId) {
      const fetchDestinationCoords = async () => {
        try {
          const res = await axios.get('http://localhost:3000/destinationCoords', {
            params: {
              id: destId,
            }
          });
          const { loc_x, loc_y } = res.data;
          setDestinationCoords({ x: loc_x, y: loc_y });
        } catch (error) {
          console.error('Error fetching destination coordinates: ', error);
        }
      };

      if (destId !== null) {
        fetchDestinationCoords();
      }
    }
  }, [map, destId]);

  // 마커생성 useEffect
  useEffect(() => {
    if (map && destinationCoords.x && destinationCoords.y) {
      const newMarker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(destinationCoords.x, destinationCoords.y),
        map: map
      });
      map.zoomIn();
      map.setZoom(18);
      map.panTo(new Tmapv3.LatLng(destinationCoords.x, destinationCoords.y));
      setMarker(newMarker);
    }
  }, [map, destinationCoords]);

  const handleDestinationClick = (id) => {
    setShowReview(true);
  };

  const handleClick = () => {
    if (loginUser.flag == false) {
      alert("로그인이 필요합니다.")
      navigate('/login');
    }else{
      navigate('/add');
    }
  };

  return (
    <>
      <div className="wrap_map">
        <div id="map_div"></div>
        <Search onDestinationClick={handleDestinationClick} />
        {showReview && <Review />}
      </div>
      <button className="add_btn" onClick={handleClick}>여행지 등록하기</button>
    </>
  );
}

export default Map