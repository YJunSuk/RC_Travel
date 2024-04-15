import './css/MainHeader.css';
import { Link } from 'react-router-dom';

export const MainHeader = () => {
    return (
        <div className="Header">
            <div className="left-section"></div>
            <div className="right-section">
                <Link to={"/register"}>회원가입</Link>
                <Link to={"/login"}>로그인</Link>
            </div>
        </div>
    );
}

export default MainHeader;