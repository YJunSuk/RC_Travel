import { MainHeader } from '../container/MainHeader';
import photo from '../assets/photo.jpg';
import './css/SearchPage.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import Map from '../container/Map/Map.jsx';

export const SearchPage = () => {
    return (
        <>
            <img src={photo} className='photo' alt='React1' />
            <MainHeader />
            <Link to="/">
                <img src={logo} className='login-logo123' alt='React3' />
            </Link>
            <Map />
        </>
    );
}

export default SearchPage