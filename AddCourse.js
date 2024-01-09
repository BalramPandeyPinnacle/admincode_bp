import React,{useState} from "react";
import styles from "./Admin.module.css";

export default function AddCourse() {

  const[courseTitle,setCourseTitle]=useState('');
  const[courseDetails,setCourseDetails]=useState('');
  const[teacherName,setTeacherName]=useState('');
  const[category,setCategory]=useState('');
  const[rating,setRating]=useState('');
  const[price,setPrice]=useState('')
  const[SEOCode,setSEOCode]=useState('')

  const clearField=()=>{
    setCourseTitle("");
    setCourseDetails("");
    setTeacherName("");
    setRating("");
    setPrice("");
    setCategory("");
    setSEOCode("");
}

//   const addCourseHandler =async (event) => {
// const userId =JSON.parse(localStorage.getItem('user'))._id;
//     let result=await fetch("http://localhost:9000/add-course",{
//       method:"post",
//       body:JSON.stringify({ courseTitle,courseDetails,teacherName,rating,price,mrp}),
//       headers:{"Content-Type": "application/json"}
//     });
//     result=await result.json();
//     console.log(result);
//     clearField();
//   };

const addCourseHandler = async (e) => {
  e.preventDefault();
  const videoData = { courseTitle, courseDetails, rating, teacherName,price,category,SEOCode};// Include subtitle in videoData
try {
    const response = await fetch("http://localhost:8000/add-course",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    });

    if (response.ok) {
      const newVideo = await response.json();
      
      console.log("New video added:", newVideo);
      clearField()
      // You can perform any additional actions here after adding the video
    } else{
      console.error("Failed to add video");
    }
  } catch (error) {
    console.error("Error adding video:", error);
  }
};



  return (
    <div className={styles["AddCourse-fullPage"]}>
      <div className={styles["AddCourse-Heading"]}><h4>Add New Course</h4></div>
      <div className={styles["AddCourse-label"]}>Name of Course</div>
      <input type="text" placeholder="Enter Course Title" className={styles['AddCourse-inputbox']} value={courseTitle} onChange={(e)=>(setCourseTitle(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>Course Description</div>
      <input type="text" placeholder="Enter Course Details" className={styles['AddCourse-inputbox']} value={courseDetails} onChange={(e)=>(setCourseDetails(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}> Teacher's Name</div>
      <input type="text" placeholder="Teacher's Name" className={styles['AddCourse-inputbox']} value={teacherName} onChange={(e)=>(setTeacherName(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>Category (category Like SSC or Railway etc.)</div>
      <input type="text" placeholder="Category" className={styles['AddCourse-inputbox']} value={category} onChange={(e)=>(setCategory(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>SEO Code</div>
      <input type="text" placeholder="SEO Code" className={styles['AddCourse-inputbox']} value={SEOCode} onChange={(e)=>(setSEOCode(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>Rating</div>
      <input type="text" placeholder="Rating" className={styles['AddCourse-inputbox']} value={rating} onChange={(e)=>(setRating(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>Price of Course</div>
      <input type="text" placeholder="price" className={styles['AddCourse-inputbox']} value={price} onChange={(e)=>(setPrice(e.target.value))}></input>
      <button type="submit" className={styles['AddCourse-addCourseBtn']} onClick={addCourseHandler}>Add Course</button>

    </div>
  );
}
