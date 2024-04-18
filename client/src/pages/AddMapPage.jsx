import { MainHeader } from '../container/MainHeader';
import photo from '../assets/photo.jpg';
import './css/SearchPage.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import AddMap from '../container/AddMap.jsx';

export const AddMapPage = () => {
    return (
        <>
            <img src={photo} className='photo' alt='React1' />
            <MainHeader />
            <Link to="/">
                <img src={logo} className='login-logo123' alt='React3' />
            </Link>
            <AddMap />
        </>
    );
}

export default AddMapPage