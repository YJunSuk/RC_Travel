import React, { useEffect, useState } from 'react';
import './css/AddMap.css';
import axios from 'axios';

const ImageUploader = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); 

    useEffect(() => {
        onUpload(() => handleUpload());
    }, [file]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const handleUpload = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const imageUrl = response.data;
            console.log(imageUrl)
            setImageUrl(imageUrl);
            onUpload(imageUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="input_btn">
            <input type="file" className="file" onChange={handleFileChange} />
        </div>
    );
};

export default ImageUploader;
