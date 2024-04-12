import logo from '../assets/logo.png';
import Icon from '../assets/Icon.png';
import './css/Content.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Content = () => {
    const navigate = useNavigate();

    const selectList = [
        {value: "default", name:"카테고리"},
        { value: "food", name: "음식" },
        { value: "tour", name: "관광지" },
        { value: "extreme", name: "익스트림" },
    ];

    const [select, setSelect] = useState("카테고리");
    const [text, setText] = useState("여행지를 입력해주세요");

    const handleSelect = (e) => {
        setSelect(e.target.value);
    }
    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleClick = (e) => {
        setText("");
    }

    const btnClick = () => {
        navigate('/search', { state: '여기다가 카테고리랑 검색데이터 슝 보내면 됨' });
    }
    return (
        <div className="content">
            <div className="wrap">
                <img src={Icon} className='Icon' alt='React2' />
                <img src={logo} className='logo' alt='React3' />
            </div>
            <div className="wrap">
                <input type="text" className="search" onClick={handleClick} onChange={handleChange} value={text}></input>
                <select className="select" onChange={handleSelect} value={select}>
                    {selectList.map((item) => {
                        return (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
                <button className="searchBtn" onClick={btnClick}>검색</button>
            </div>
        </div>
    );
}

export default Content;