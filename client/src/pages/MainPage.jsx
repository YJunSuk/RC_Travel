import { MainHeader } from '../container/MainHeader';
import { Content } from '../container/Content';
import photo from '../assets/photo.jpg';
import './css/MainPage.css';

export const MainPage = () => {
    return (
        <>
            <img src={photo} className='photo' alt='React1' />
            <MainHeader />
            <Content />
        </>
    );
}

export default MainPage;