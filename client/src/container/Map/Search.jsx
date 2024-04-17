import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Search.css';
import Destination from '../Destination';
import { useLocation } from 'react-router-dom';

export const Search = () => {
    const location = useLocation();
    const { category, data } = location.state;

    const [select, setSelect] = useState(category);
    const [text, setText] = useState(data);
    const [keyword, setKeyword] = useState(data);
    const [destinations, setDestinations] = useState([]);

    const selectList = [
        { value: "default", name: "카테고리" },
        { value: "food", name: "음식" },
        { value: "tour", name: "관광지" },
        { value: "extreme", name: "익스트림" },
    ];

    const handleSelect = (e) => {
        setSelect(e.target.value);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleClick = () => {
        setKeyword(text);
    };

    useEffect(() => {
        // 검색어(keyword)가 변경되면 데이터를 가져옴
        const fetchData = async () => {
            console.log(keyword);
            console.log(select);
            try {
                const res = await axios.get('http://localhost:3000/search', {
                    params: {
                        keyword: keyword,
                        category: select
                    }
                });
                setDestinations(res.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [keyword, select]);

    return (
        <>
            <div className="content_1">
                <div className="wrap_1">
                    <input type="text" className="search_1" onClick={handleClick} onChange={handleChange} value={text}></input>
                    <select className="select_1" onChange={handleSelect} value={select}>
                        {selectList.map((item) => {
                            return (
                                <option value={item.value} key={item.value}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    <button className="search_Btn" onClick={handleClick}>검색</button>
                    <div className="keyword">검색어 : "{keyword}"</div>
                </div>
                <div className="container_1">
                    <div className="destination_list">
                        {destinations.map((item) => (
                            <Destination
                                key={item.id} 
                                imgURL={item.td_picture_url}
                                name={item.td_name}
                                category={item.category}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
