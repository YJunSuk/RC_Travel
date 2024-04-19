import { useContext, useEffect, useState } from 'react';
import ReviewCard from './ReviewCard.jsx';
import './css/Review.css';
import axios from 'axios';
import { dtContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../App';

export const Review = () => {
    const { destId } = useContext(dtContext);
    const { loginUser } = useContext(loginContext);
    const [reviewCards, setReviewCards] = useState([]);
    const [description, setDescription] = useState('');
    const [showContent, setShowContent] = useState(true);
    const [imgURL, setImgURL] = useState('');
    const navigate = useNavigate();

    const handleAddbtn = () => {
        if (loginUser.flag == false) {
            alert("로그인이 필요합니다.")
            navigate('/login');
          }else{
            navigate('/review');
          }
    }
    const handleCloseBtn = () => {
        setShowContent(false);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const destRes = await axios.get('http://localhost:3000/travelDestinations', {
                    params: {
                        id: destId,
                    }
                });
                setDescription(destRes.data.data.description);
                setImgURL(destRes.data.data.td_picture_url);
                const rivewRes = await axios.get('http://localhost:3000/review', {
                    params: {
                        id: destId,
                    }
                });
                setReviewCards(rivewRes.data);  
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
        setShowContent(true);
    }, [destId, imgURL]);

    return (
        <div className="content_2" style={{ display: showContent ? 'block' : 'none' }}>
            <button className="close_btn" onClick={handleCloseBtn}>X</button>
            <button className="review_btn" onClick={handleAddbtn}>리뷰 쓰기</button>
            <div className="wrap_detail">
                <img className="dt_img" src={imgURL} />
                <div className="detail">{description}</div>
            </div>
            <div className="wrap_review">
                <div className="review_list">
                    {reviewCards.map((item) => (
                        <ReviewCard
                            key={item.id}
                            id={item.id}
                            imgURL={item.review_picture_url}
                            content={item.review_content}
                            rating={item.rating}
                            createDate={item.create_date}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Review;