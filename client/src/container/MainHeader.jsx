import './css/MainHeader.css';
import { Link } from 'react-router-dom';

export const MainHeader = () => {
    return (
        <div className="Header">
            <div className="left-section"></div>
            <div className="right-section">
                <Link to={"/login"} state={{ page: "register", isLogin: false, isSignup: true }}>회원가입</Link>
                <Link to={"/login"} state={{ page: "login" }}>로그인</Link>
            </div>
        </div>
    );
}

export default MainHeader;