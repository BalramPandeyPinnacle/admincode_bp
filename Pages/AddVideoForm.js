import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddVideoForm = () => {
  const [ebookId, setEbookId] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [ebooks, setEbooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/ebooks');

        if (response.ok) {
          const ebooksData = await response.json();
          setEbooks(ebooksData);
        } else {
          console.error('Failed to fetch ebooks');
        }
      } catch (error) {
        console.error('Error fetching ebooks:', error);
      }
    };

    fetchEbooks();
  }, []);

  const handleEbookChange = async (selectedEbookId) => {
    setEbookId(selectedEbookId);

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/chapters/${selectedEbookId}`);

      if (response.ok) {
        const chaptersData = await response.json();
        setChapters(chaptersData);
      } else {
        console.error('Failed to fetch chapters');
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('chapterId', chapterId);

      const response = await fetch('http://localhost:3001/api/uploadVideo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);

        // Reset form state
        setEbookId('');
        setChapterId('');
        setVideoFile(null);
      } else {
        console.error('Failed to upload video');
        setError('Failed to upload video. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setError('Error uploading video. Please try again.');
    }
  };

  return (
    <div className="video-form-container">
      <h1>Add Video</h1>
      <form className="video-form" onSubmit={handleSubmit}>
        <label htmlFor="ebookId">Select Ebook:</label>
        <select
          id="ebookId"
          value={ebookId}
          onChange={(e) => handleEbookChange(e.target.value)}
          required
          className="video-select"
        >
          <option value="" disabled>Select Ebook</option>
          {ebooks.map((ebook) => (
            <option key={ebook._id} value={ebook._id}>
              {ebook.title}
            </option>
          ))}
        </select>
        <br />

        {loading ? (
          <p>Loading chapters...</p>
        ) : (
          <>
            <label htmlFor="chapterId">Select Chapter:</label>
            <select
              id="chapterId"
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              required
              className="video-select"
            >
              <option value="" disabled>Select Chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter._id} value={chapter._id}>
                  {chapter.title}
                </option>
              ))}
            </select>
            <br />
          </>
        )}

        <label htmlFor="videoFile">Upload Video:</label>
        <input type="file" id="videoFile" onChange={handleVideoChange} accept=".mp4, .avi" required className="video-input" />
        <br />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="video-submit">Submit</button>
      </form>
    </div>
  );
};

export default AddVideoForm;