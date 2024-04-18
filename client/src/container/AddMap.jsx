import { useEffect, useState } from "react";
import './css/AddMap.css';
import axios from 'axios';
import ImageUploader from "./ImageUploader";

const { Tmapv3 } = window;

export const AddMap = () => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState();
    const [imageUrl, setImageUrl] = useState('');

    const mapDiv = document.getElementById('add_map_div')
    const [select, setSelect] = useState("default");


    const selectList = [
        { value: "default", name: "카테고리" },
        { value: "food", name: "음식" },
        { value: "tour", name: "관광지" },
        { value: "extreme", name: "익스트림" },
    ];

    const handleSelect = (e) => {
        setSelect(e.target.value);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleSend = () => {
        const data = {
            name: name,
            text: text,
            select: select,
            imageUrl: imageUrl,
        }
        axios.post('http://localhost:3000/addPlace', data)
            .then(response => {
                console.log('Place added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding place:', error);
            });

    }
    
    const handleImageUpload = (url) => {
        setImageUrl(url);
    };

    useEffect(() => {
        if (!map) {
            const center = new Tmapv3.LatLng(35.1018535, 129.0258616);
            const newMap = new Tmapv3.Map("add_map_div", {
                center: center,
                width: "100%",
                height: "623px",
                zoom: 13, // 확대, 축소
            });
            setMap(newMap);
        }
    }, [mapDiv]);

    return (
        <div className="map-container">
            <div id="add_map_div"></div>
            <div className="addForm">
                <div className="text_map">여행지 이름</div>
                <input type="text" className="search_3" onChange={handleNameChange} value={name}></input>
                <div className="text_map">여행지 설명</div>
                <textarea className="search_desc" onChange={handleChange} value={text}></textarea>
                <div className="text_map">카테고리</div>
                <select className="select_2" onChange={handleSelect} value={select}>
                    {selectList.map((item) => {
                        return (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
                <ImageUploader onUpload={handleImageUpload}/>
                <button className="send_btn" onClick={handleSend}>작성완료</button>
            </div>
        </div>
    );
};

export default AddMap;
