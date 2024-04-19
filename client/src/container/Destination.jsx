import './css/Destination.css';

export const Destination = ({ id, imgURL, name, onClick }) => {
    const handleClick = () => {
        onClick(id);
    }
    return (
        <div className="destination" id={id} onClick={handleClick}>
            <img className="dt_img"src={imgURL} alt={name} />
            <div className="wrap_content">
                <div className="dt_name">{name}</div>
            </div>
        </div>
    );
}

export default Destination;