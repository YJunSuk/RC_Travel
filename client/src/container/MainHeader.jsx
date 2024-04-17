import { useContext, useState } from 'react';
import { loginContext } from '../App';
import './css/MainHeader.css';
import { Link } from 'react-router-dom';


export const MainHeader = () => {
    const {loginUser, setLoginUser } = useContext(loginContext);
    const handleClick = async () => {
        setLoginUser({
            ...loginUser, 
            flag:false
        });
        alert("로그아웃되었습니다.");
    }

    return (
        <div className="Header">
            <div className="left-section"></div>
            <div className="right-section">
                {loginUser.flag ?
                    <>
                        <Link to={"/modify"}>회원정보수정</Link>
                        <Link to="/" onClick={handleClick}>로그아웃</Link>
                    </> :
                    <>
                        <Link to={"/register"}>회원가입</Link>
                        <Link to={"/login"}>로그인</Link>
                    </>
                }

            </div>
        </div>
    );
}

export default MainHeader;