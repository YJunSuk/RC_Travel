import './css/Login.css';
import photo from '../assets/photo.jpg';
import logo from '../assets/logo.png';
import { React, useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"   
import { loginContext } from '../App';

export const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const userInfo = {
        id: id,
        password: password,
        flag: false,
    }
    const {setLoginUser} = useContext(loginContext);
    const navigate = useNavigate();

    const {
        register,
        formState: { isSubmitting, isSubmitted, errors },
    } = useForm();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id || !password) {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }
        const formData = new FormData();
        formData.append('id', id);
        formData.append('password', password);
        try {
                const res = await axios.post('http://localhost:3000/login', {
                id,
                password,
            });
            if (res.status === 200) {
                alert('로그인이 완료되었습니다.');
                setLoginUser({...userInfo, flag: true});
                navigate('/');
            }else{
                alert("로그인에 실패했습니다.");
            }

        } catch (error) {
            console.log(error.response.status);
            if(error.response.status === 401){
                alert("아이디와 비밀번호가 틀렸습니다.");
                setId('');
                setPassword('');
            }else{
                alert("로그인에 실패했습니다.");
            }
        }
    };

    return (
        <>
            <img src={photo} className='photo' alt='React1' />
            <div className="container">
                <Link to="/">
                    <img src={logo} className='login-logo' alt='React3' />
                </Link>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="id"></label>
                    <div className="input-container">
                        <input
                            id="id"
                            type="id"
                            aria-invalid={
                                isSubmitted ? (errors.id ? "true" : "false") : undefined
                            }
                            placeholder="아이디를 입력해주세요."
                            {...register("id", {
                                required: "아이디는 필수 입력입니다.",
                            })}
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <div className="underline"></div>
                        {errors.id && <small role="alert">{errors.id.message}</small>}
                    </div>
                    <label htmlFor="password"></label>
                    <div className="input-container">
                        <input
                            id="password"
                            type="password"
                            aria-invalid={
                                isSubmitted ? (errors.password ? "true" : "false") : undefined
                            }
                            placeholder="비밀번호를 입력해주세요."
                            {...register("password", {
                                required: "비밀번호는 필수 입력입니다.",
                            })}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="underline"></div>
                        {errors.password && <small role="alert">{errors.password.message}</small>}
                    </div>
                    <button type="submit" disabled={isSubmitting}>로그인</button>
                </form>
            </div>
        </>
    );
}

export default Login;