import './css/Register.css';
import photo from '../assets/photo.jpg';
import logo from '../assets/logo.png';
import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

export const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isSubmitted, errors },
    } = useForm();

    return (
        <>
            <img src={photo} className='photo' alt='React1' />
            <div className="container">
                <Link to="/">
                    <img src={logo} className='login-logo' alt='React3' />
                </Link>
                <form onSubmit={handleSubmit(async (data) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(data));
                })}>
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
                                minLength: {
                                    value: 8,
                                    message: "8자리 이상 비밀번호를 사용하세요.",
                                },
                            })}
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

export default Register;