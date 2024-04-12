import './css/MainHeader.css';
import { Link } from 'react-router-dom';

export const MainHeader = () => {
    return (
        <div className="Header">
            <div className="left-section"></div>
            <div className="right-section">
                <Link to="/login"><li>회원가입</li></Link>
                <Link to="/login"><li>로그인</li></Link>
            </div>
        </div>
    );
}

export default MainHeader;