import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './css/Search.css';
import Destination from '../Destination';
import { useLocation } from 'react-router-dom';
import { dtContext } from '../../App';

export const Search = ({onDestinationClick}) => {
    const location = useLocation();
    const { category, data } = location.state;
    const {setDestId} = useContext(dtContext);

    const [select, setSelect] = useState(category);
    const [text, setText] = useState(data);
    const [keyword, setKeyword] = useState(data);
    const [destinations, setDestinations] = useState([]);
    const [selectedDestinationId, setSelectedDestinationId] = useState(null);

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
    const handleDestinationClick = (id) =>{
        setSelectedDestinationId(id);
        setDestId(id);
        onDestinationClick(id); 
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/search', {
                    params: {
                        keyword: keyword,
                        category: select,
                        destinatinoId: selectedDestinationId,
                    }
                });
                setDestinations(res.data);
                console.log(res);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [keyword, select, selectedDestinationId]);

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
                                id={item.id} 
                                imgURL={item.td_picture_url}
                                name={item.td_name}
                                category={item.category}
                                onClick={handleDestinationClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
