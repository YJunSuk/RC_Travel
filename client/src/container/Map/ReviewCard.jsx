import './css/Review.css'
import moment from 'moment';

export const ReviewCard = ({ id, imgURL, content, rating, createDate }) => {
    const formattedDate = moment(createDate).format('YYYY-MM-DD HH:mm:ss');
;
    return (
        <div className="review" id={id}>
            <img className="rv_img" src={imgURL}/>
            <div className="wrap_contents">
                <div className="rating">평점 : {rating}</div>
                <div className="description">{content}</div>
                <div className="date">{formattedDate}</div>
            </div>
        </div>
    );
}

export default ReviewCard;