import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('File upload failed. Please try again.');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="file-upload-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Upload File</button>
      </form>
      {message && <p style={{ color: 'green', marginTop: '20px' }}>{message}</p>}
    </div>
  );
};

export default FileUpload;
