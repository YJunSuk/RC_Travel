import { useContext, useEffect, useState } from 'react';
import ReviewCard from './ReviewCard.jsx';
import './css/Review.css';
import axios from 'axios';
import { dtContext } from '../../App';


export const Review = () => {
    const { destId } = useContext(dtContext);
    const [reviewCards, setReviewCards] = useState([]);
    const [showContent, setShowContent] = useState(true);

    const handleCloseBtn = () => {
        setShowContent(false);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/review', {
                    params: {
                        id: destId,
                    }
                });
                setReviewCards(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
        setShowContent(true);
    }, [destId]);

    return (
        <div className="content_2" style={{ display: showContent ? 'block' : 'none' }}>
            <button className="close_btn" onClick={handleCloseBtn}>X</button>
            <div className="wrap_detail">
                <div className="img">사진</div>
                <div className="detail">야 상태관리 해야해 디테일 가져와야지</div>
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