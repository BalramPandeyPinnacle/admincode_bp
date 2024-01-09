import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import styles from './AllCourses.module.css'

export default function AddCourseContent() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/courses")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          // Check if data is an array
          setCourses(data);
        } else {
          console.error("Data is not an array:", data);
          setCourses([]); // Set an empty array in case of non-array data
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const searchHandler=async(event)=>{
    let key= event.target.value;
    if(key){
      let result= await fetch(`http://localhost:8000/search/${key}`);
      result=await result.json();
      if(result){
        setCourses(result);
      }
    }
    // else{
    // window.location.reload();
    // }
}


  return(
  <div className={styles['AllCourses-FullDiv']}>
    <div className={styles["AllCourses-heading"]}>
        <div className={styles["AllCourses-srno"]}>Sr.No.</div>
        <div className={styles["AllCourses-heading-price"]}>Price</div>
        <div className={styles["AllCourses-nameOfCourse"]}>Name Of Course</div>

    </div>
       {courses.length>0?courses.map((item, index) =>(
          <div key={item._id} className={styles["AllCourses-subheading"]}>
            <div className={styles["AllCourses-srno"]}>{index+1}</div>
            <div className={styles["AllCourses-heading-price"]}>{item.price}</div>
            <div className={styles["AllCourses-nameOfCourse"]}>{item.courseTitle} </div>
            <div><Link to={"/admin/courseContent/"+item._id}  className={styles["AllCourses-editLink"]}>Add Course Content</Link></div>
            </div>
        )):<p>Loading .....</p>
      }
  
    </div>
  );
}
