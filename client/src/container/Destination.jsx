import './css/Destination.css';

export const Destination = ({ key, imgURL, name, category }) => {
    return (
            <div className="destination" key={key}>
                <div className="img">{imgURL}</div>
                <div className="wrap_content">
                    <div className="dt_name">{name}</div>
                </div>
            </div>
    );
}

export default Destination;