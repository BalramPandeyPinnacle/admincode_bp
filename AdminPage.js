import React,{useState} from 'react'
import style from './AdminPage.module.css';
import AllCourses from './Pages/AllCourses';
import AllStudent from './Pages/AllStudent';
import AddCourse from './AddCourse';
import AddCourseContent from './Pages/AddCourseContent';

export default function AdminPage() {

  const[allCourses,setAllCourses]=useState(true);
  const[allStudent,setAllStudnt]=useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const[courseContent,setCourseContent]=useState(false)


  const handleAllCourses=()=>{
    setAllCourses(true);
    setAddCourse(false);
    setAllStudnt(false);
    setCourseContent(false);
  };

  const handleAllStudent=()=>{
    setAllCourses(false);
    setAddCourse(false);
    setAllStudnt(true);
    setCourseContent(false);
  }

  const handleAddNewCourse=()=>{
    setAllCourses(false);
    setAddCourse(true);
    setAllStudnt(false);
    setCourseContent(false);
  }

  const handleAddcourseContent=()=>{
    setCourseContent(true);
    setAllCourses(false);
    setAddCourse(false);
    setAllStudnt(false);

  }



  return (
    <div className={style["admin-wraper"]}>

      {/* ////NavBar-admin//// */}
      <div className={style["admin-navbar"]}>
        <div className={style["admin-navItems"]}onClick={handleAllCourses}>All Coures</div>
        <div className={style["admin-navItems"]}onClick={handleAllStudent}>All Students</div>
        <div className={style["admin-navItems-addCourses" ]}onClick={handleAddNewCourse}>Add New Course</div>
        <div className={style["admin-navItems-addCourses" ]}onClick={handleAddcourseContent}>Add Course Content</div>
        {/* <div className={style["admin-navItems-addCourses" ]}>Add New Student</div> */}
        
      </div>
      {/* ////////////////////// */}
      {allCourses&&<AllCourses/>}
      {allStudent&&<AllStudent/>}
      {addCourse&&<AddCourse/>}
      {courseContent&&<AddCourseContent/>}





    </div>
  )
}
