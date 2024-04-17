import './css/Modify.css';
import photo from '../assets/photo.jpg';
import logo from '../assets/logo.png';
import { React, useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { loginContext } from '../App';

export const Modify = () => {
    const {
        register,
        formState: { isSubmitting, isSubmitted, errors },
    } = useForm();

    const navigate = useNavigate();
    const { loginUser, setLoginUser } = useContext(loginContext);
    const [password, setPassword] = useState(loginUser.password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
            alert('비밀번호를 입력해주세요!');
            return;
        }
        const userInfo = {
            id: loginUser.id,
            password: password,
            flag: true,
        }

        try {
            const res = await axios.put('http://localhost:3000/modify', {
                id : loginUser.id,
                password,
            });

            if (res.status === 200) {
                alert('회원정보수정이 완료되었습니다.');
                setLoginUser({ ...userInfo, password: password });
                navigate(-1);
            } else if (res.status === 401) {
                alert("비밀번호가 누락되었습니다.");
            }
        } catch (error) {
            console.log(error);
            if (error.response=== 401) {
                alert("이미 존재하는 아이디입니다.");
            } else {
                alert("회원정보수정에 실패했습니다.");
            }
        }
    };
    const handleClick = async () => {
            try {
                const res = await axios.delete('http://localhost:3000/delete', {
                    id : loginUser.id,
                });
    
                if (res.status === 200) {
                    alert('회원탈퇴완료');
                    setLoginUser({ ...userInfo, flag: false});
                    navigate('/');
                } else if (res.status === 401) {
                    alert("회원탈퇴실패");
                }
            } catch (error) {
                console.log(error);
            }
        navigate('/');
    }
    return (
        <>
            <img src={photo} className='photo' alt='React1' />
            <div className="container">
                <Link to="/">
                    <img src={logo} className='login-logo' alt='React3' />
                </Link>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password"></label>
                    <div className="input-container">
                        <input
                            id="password"
                            type="password"
                            aria-invalid={
                                isSubmitted ? (errors.password ? "true" : "false") : undefined
                            }
                            placeholder="새로운 비밀번호를 입력해주세요."
                            {...register("password", {
                                required: "비밀번호는 필수 입력입니다.",
                                minLength: {
                                    value: 8,
                                    message: "8자리 이상 비밀번호를 사용하세요.",
                                },
                            })}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="underline"></div>
                        {errors.password && <small role="alert">{errors.password.message}</small>}
                    </div>
                    <button type="submit" disabled={isSubmitting}>회원정보수정</button>
                    <button type="button" onClick={handleClick}>회원탈퇴</button>
                </form>
            </div>
        </>
    );
}

export default Modify;
