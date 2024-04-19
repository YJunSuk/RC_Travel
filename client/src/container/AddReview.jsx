import { useContext, useEffect, useState } from "react";
import './css/AddMap.css';
import axios from 'axios';
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
import { loginContext } from '../App';
import { dtContext } from '../App';
import Destination from "./Destination";

export const AddMap = () => {
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { destId } = useContext(dtContext);
    const [rating, setRating] = useState(1);

    const { loginUser } = useContext(loginContext);
    const navigate = useNavigate();

    const Now = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSend = () => {
        console.log(imageUrl);
        const data = {
            user_id: loginUser.id,
            destination_id: destId,
            review_content: text,
            review_picture_url: imageUrl,
            rating: rating,
            create_date: Now(),
        }
        axios.post('http://localhost:3000/addReview', data)
            .then(response => {
                console.log('Place added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding place:', error);
            });
        navigate(-1);
    }

    const handleImageUpload = (url) => {
        console.log(url);
        setImageUrl(url);
    };



    return (
        <div className="map-container">
            <div className="addForm">
                <div className="text_map">리뷰 내용</div>
                <textarea className="search_desc" onChange={handleChange} value={text}></textarea>
                <div>
                    <label htmlFor="rating">평점: </label>
                    <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <div>여행지 사진</div>
                <ImageUploader onUpload={handleImageUpload} />
                <button className="send_btn" onClick={handleSend}>작성완료</button>
            </div>
        </div>
    );
};

export default AddMap;
