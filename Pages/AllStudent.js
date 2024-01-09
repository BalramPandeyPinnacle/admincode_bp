import React,{useState,useEffect} from 'react'
import styles from './AllStudent.module.css';
import { Link } from 'react-router-dom';

export default function AllStudent() {
  const[student,setStudent]=useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/student")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          // Check if data is an array
          setStudent(data);
        } else {
          console.error("Data is not an array:", data);
          setStudent([]); // Set an empty array in case of non-array data
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const deleteHandler= async(id)=>{
    const confirm=window.confirm("Delete");
    if(confirm){
      let result= await fetch(` http://localhost:8000/student/${id}`,
      {method:"Delete"});
      window.location.reload();
      result=await result.json();

    }
  
  }


  return (
    <div className={styles["allStudent-wraper"]}>
      <div className={styles["allStudent-heading"]}>
      <div className={styles["SrNo"]}>Sr.No.</div>
      <div className={styles["Name-student"]}>Name Of Student</div>
      <div className={styles["email-student"]}>Email Of Student</div>
      <div className={styles["purchased-courses"]}>PurchasedCourses</div>
    </div>
    {student.length>0?student.map((item, index) =>(
          <div key={item._id} className={styles["allStudent-subHeading"]}>
            <div className={styles["SrNo"]}>{index+1}</div>
            <div className={styles["Name-student"]}>{item.name} </div>
            <div className={styles["email-student"]}>{item.email} </div>
            <div className={styles["purchased-courses"]}>{item.purchasedCourses.length}</div>
            <div><button onClick={()=>deleteHandler(item._id)} className={styles["AllCourses-DeleteBTN"]}>Delete</button>
            <Link to={"/admin/updateCourse/"+item._id}  className={styles["AllCourses-editLink"]}>Edit</Link></div>
            </div>
        )):<p>Loading .....</p>
        }
    </div>
  )
}
