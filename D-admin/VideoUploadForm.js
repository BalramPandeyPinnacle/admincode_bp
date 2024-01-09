import React, { useState } from 'react';

const VideoUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch('http://localhost:3001/api/upload-video', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Video uploaded successfully:', data.s3Key);
      } else {
        console.error('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
};

export default VideoUploadForm;
