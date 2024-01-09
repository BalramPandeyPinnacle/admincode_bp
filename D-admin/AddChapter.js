import React, { useState, useEffect } from "react";
import styles from "./AddChapter.module.css";

const AddChapter = () => {
  const [courseId, setCourseId] = useState("");
  const [courseChapters, setCourseChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState({
    dayNumber: 1,
    chapterNumber: 1,
    chapterTitle: "",
    topics: [],
  });
  const [availableVideos, setAvailableVideos] = useState([]);
  const [availablePdfs, setAvailablePdfs] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentSelectedVideo, setCurrentSelectedVideo] = useState("");
  const [currentPdfTitle, setCurrentPdfTitle] = useState("");
  const [currentSelectedPdf, setCurrentSelectedPdf] = useState("");
  const [forpdf, setforpdf] = useState("");
  const [forvideo, setforvideo] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/courses");
        console.log("Courses API Response:", response);

        if (response.ok) {
          const courses = await response.json();
          console.log("Fetched Courses:", courses);
          setAvailableCourses(courses);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    // Log availableCourses whenever it changes
    console.log("Updated availableCourses:", availableCourses);

    // Fetch courses when the component mounts
    const fetchInitialData = async () => {
      await fetchCourses();
      // You can perform additional initialization steps here
    };

    fetchInitialData();
  }, []); 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/get-videos");
        if (response.ok) {
          const videos = await response.json();
          setAvailableVideos(videos);
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchPdfs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/get-pdfs");
        if (response.ok) {
          const pdfs = await response.json();
          setAvailablePdfs(pdfs);
        } else {
          console.error("Failed to fetch PDFs");
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchVideos();
    fetchPdfs();
  }, []);

  useEffect(() => {
    // This will be called whenever currentSelectedVideo or currentSelectedPdf changes
    // Find the corresponding URL in availableVideos or availablePdfs
    const videoData = availableVideos.find((video) => video.s3Key === currentSelectedVideo);
    const pdfData = availablePdfs.find((pdf) => pdf.s3Key === currentSelectedPdf);

    // Set URLs based on the comparison
    setforvideo(videoData ? videoData.url : "");
    setforpdf(pdfData ? pdfData.url : "");
  }, [currentSelectedVideo, currentSelectedPdf, availableVideos, availablePdfs]);

  const clearCurrentChapter = () => {
    setCurrentChapter((prevChapter) => ({
      ...prevChapter,
      chapterNumber: prevChapter.chapterNumber + 1,
      topics: [],
    }));
  };

  const clearField = () => {
    setCourseChapters((prevChapters) => [
      ...prevChapters,
      {
        id: Date.now(), 
        dayNumber: currentChapter.dayNumber,
        chapterNumber: currentChapter.chapterNumber,
        chapterTitle: currentChapter.chapterTitle,
        topics: [...currentChapter.topics],
      },
    ]);
    clearCurrentChapter();
  };

  const addChapter = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Current Chapter Data:", currentChapter);
  
      const requestBody = {
        dayNumber: currentChapter.dayNumber,
        chapterNumber: currentChapter.chapterNumber,
        chapterTitle: currentChapter.chapterTitle,
        courseId: courseId,
        days: currentChapter.topics.map((topic) => ({
          dayNumber: currentChapter.dayNumber,
          topics: [
            {
              title: topic.title,
              selectedVideo: topic.selectedVideo,
              pdfTitle: topic.pdfTitle,
              selectedPdf: topic.selectedPdf,
              serialNumber: topic.serialNumber,
            },
          ],
        })),
      };
  
      const response = await fetch("http://localhost:3001/api/saveChapter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        console.log("Chapter created successfully!");
        clearField();
      } else {
        console.error("Failed to create chapter");
      }
    } catch (error) {
      console.error("Error creating chapter:", error);
    }
  };
  

  const addTopic = () => {
    const newTopic = {
      title: currentTitle,
      selectedVideo: forvideo,
      pdfTitle: currentPdfTitle,
      selectedPdf: forpdf,
      serialNumber: currentChapter.topics.length + 1,
    };

    setCurrentChapter((prevChapter) => ({
      ...prevChapter,
      topics: [...prevChapter.topics, newTopic],
    }));

    setCurrentPdfTitle("");
    setCurrentTitle("");
    setCurrentSelectedVideo("");
    setCurrentSelectedPdf("");
  };

  return (
    <div className={styles["AddChapter-fullPage"]}>
      <div className={styles["AddChapter-Heading"]}>
        <h4>Add New Chapter</h4>
      </div>
      <form onSubmit={addChapter}>
        <div>
          <label>Course:</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="" disabled>
              Select Course
            </option>
            {availableCourses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseTitle}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Day Number:</label>
          <input
            type="text"
            placeholder="Enter Day Number"
            value={currentChapter.dayNumber}
            onChange={(e) =>
              setCurrentChapter({
                ...currentChapter,
                dayNumber: e.target.value,
              })
            }
          />
        </div>
        <p>{`Day ${currentChapter.dayNumber}, Chapter ${currentChapter.chapterNumber}`}</p>
        <input
          type="text"
          placeholder="Enter Chapter Title"
          className={styles["AddChapter-inputbox"]}
          value={currentChapter.chapterTitle}
          onChange={(e) =>
            setCurrentChapter({
              ...currentChapter,
              chapterTitle: e.target.value,
            })
          }
        />
        <div>
          <input
            type="text"
            placeholder="Enter Video Title"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
          />
          <select
            className={styles["AddChapter-select"]}
            value={currentChapter.selectedVideo || ""}
            onChange={(e) => setCurrentSelectedVideo(e.target.value)}
          >
            <option key="select-video" value="" disabled>
              Select Video
            </option>
            {availableVideos.map((video) => (
              <option
                key={video.s3Key}
                value={video.s3Key}
                className={styles["AddChapter-option"]}
              >
                {video.originalname}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter PDF Title"
            value={currentPdfTitle}
            onChange={(e) => setCurrentPdfTitle(e.target.value)}
          />
          <select
            className={styles["AddChapter-select"]}
            value={currentChapter.selectedPdf || ""}
            onChange={(e) => setCurrentSelectedPdf(e.target.value)}
          >
            <option key="select-pdf" value="" disabled>
              Select PDF
            </option>
            {availablePdfs.map((pdf) => (
              <option
                key={pdf.s3Key}
                value={pdf.s3Key}
                className={styles["AddChapter-option"]}
              >
                {pdf.originalname}
              </option>
            ))}
          </select>

          <button type="button" onClick={addTopic}>
            Add Topic
          </button>
        </div>

        <div>
          <button type="submit">Add Chapter</button>
          <button type="button" onClick={clearField}>
            Clear
          </button>
        </div>
      </form>

      <div>
        <h4>Added Chapters</h4>
        <ul>
          {courseChapters.map((chapter) => (
            <li key={chapter.id}>
              {`Day ${chapter.dayNumber}, Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Current Chapter</h4>
        <pre>{JSON.stringify(currentChapter, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AddChapter;