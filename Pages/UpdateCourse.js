import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import styles from '../Admin.module.css'
export default function UpdateProduct() {
    const [courseTitle,setCourseTitle]=useState("");
    const [courseDetails,setCourseDetails]=useState("");
    const [ teacherName,setTeacherName]=useState("");
    const [ rating,setRating]=useState("");
    const [ price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[SEOCode,setSEOCode]=useState("");
    const [updated,setUpdated]=useState();
    // const navigate=useNavigate();
    const params =useParams();
    useEffect(()=>{
        getCourseDetails();
    },[])

    const getCourseDetails=async()=>{
        let result= await fetch(`http://localhost:8000/course/${params.id}`);
        result=await result.json();
        console.log(result);
        setCourseTitle(result.courseTitle);
        setCourseDetails(result.courseDetails);
        setCategory(result.category);
        setSEOCode(result.SEOCode)
        setTeacherName(result.teacherName);
        setRating(result.rating);
        setPrice(result.price);
  

}
  const updateProdutHandler= async()=>{
    let result= await fetch(`http://localhost:8000/course/${params.id}`,{
      method:"Put",
      body:JSON.stringify({courseTitle,courseDetails,teacherName,rating,price,category,SEOCode}),
      headers:{"Content-Type":"application/json"}
    });
    result=result.json();
    // navigate('/');
    clearField()
    setUpdated(true)
  }

  const clearField=()=>{
    setCourseTitle('');
    setCourseDetails('');
    setCategory('');
    setSEOCode('')
    setTeacherName('');
    setRating('');
    setPrice('');
  }


  return (<>

    {/* ******Copy of Add Course ******* */}


    <div className={styles["AddCourse-fullPage"]}>
      <div className={styles["AddCourse-Heading"]}><h4>Update Course</h4></div>
      <div className={styles["AddCourse-label"]}>Name Of Course</div>
      <input type="text" placeholder="Enter Course Title" className={styles['AddCourse-inputbox']} value={courseTitle} onChange={(e)=>(setCourseTitle(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>Course Details</div>
      <input type="text" placeholder="Enter Course Details" className={styles['AddCourse-inputbox']} value={courseDetails} onChange={(e)=>(setCourseDetails(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>Teacher's Name</div>
      <input type="text" placeholder="Teacher's Name" className={styles['AddCourse-inputbox']} value={teacherName} onChange={(e)=>(setTeacherName(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>Category</div>
      <input type="text" placeholder="Category" className={styles['AddCourse-inputbox']} value={category} onChange={(e)=>(setCategory(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>SEO Code</div>
      <input type="text" placeholder="SEO Code" className={styles['AddCourse-inputbox']} value={SEOCode} onChange={(e)=>(setSEOCode(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>Course Rating</div>
      <input type="text" placeholder="Rating" className={styles['AddCourse-inputbox']} value={rating} onChange={(e)=>(setRating(e.target.value))}></input>
      <div className={styles["AddCourse-label"]}>Price</div>
      <input type="text" placeholder="price" className={styles['AddCourse-inputbox']} value={price} onChange={(e)=>(setPrice(e.target.value))}></input>
      <button type="submit" className={styles['AddCourse-addCourseBtn']} onClick={updateProdutHandler}>Update Course</button>
      {updated&&<div className={styles['AddCourse-successMsg']}>!! Updated Successfully !!</div> }

    </div>
    
    </>
  );
}

