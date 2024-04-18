import './css/Review.css'
import moment from 'moment';

export const ReviewCard = ({ id, imgURL, content, rating, createDate }) => {
    const formattedDate = moment(createDate).format('YYYY-MM-DD HH:mm:ss');
;
    return (
        <div className="review" id={id}>
            <div className="img">{imgURL}</div>
            <div className="wrap_contents">
                <div className="rating">평점 : {rating}</div>
                <div className="description">{content}</div>
                <div className="date">{formattedDate}</div>
            </div>
        </div>
    );
}

export default ReviewCard;