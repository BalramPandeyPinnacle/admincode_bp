import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Select,Button,Avatar} from "antd";
import {saveOutlined} from '@ant-design/icons'
import styles from '../Admin.module.css'
import Resizer from 'react-image-file-resizer';




const {Option} =Select;
export default function CreateCourse() {
    //state 
    const [values,setValues]=useState({
        name:"",
        description:"",
        category:"",
        price:"",
        mrp:"",
        uploading:false,
        paid:false,
        loading:false
    })

    const[previewE,setPreviewE]=useState("")
    const [previewH,setPreviewH]=useState("")
    const[uploadBtnTestHM,setUploadBtnTestHM] =useState("")
    const[uploadBtnTestEM,setUploadBtnTestEM]=useState("")
    const handleChange=e=>{
    setValues({...values,[e.target.name]:e.target.value})
}
    const handleEMImage=(e)=>{
        let file=e.target.file[0];
        setPreviewE(window.URL.createObjectURL(e.target.files[0]))
        setUploadBtnTestEM(file.name);
        setValues({...values,loading:true})
        //resize
        Resizer.imageFileResizer(file,720,500,"JEPG",100,0,async()=>{
            try{}
            catch(err){
                console.log(err)
                setValues({...values,loading:false})

            }

        })

    }
    const handleHMImage=(e)=>{
        let file=e.target.file[0]
        setPreviewH(window.URL.createObjectURL(e.target.files[0]))
        setUploadBtnTestHM(file.name);

        //resizer

    }

    const handleSubmit=e=>{
        e.preventDefault()
        console.log(values);
    }

    // const CreateCourseForm=()=>{
    //     <form onSubmit={handleSubmit}>
    //         <div>
    //             <input type='text' name='name' className='create-course-inputBox' placeholder='Name'  value={values.name} onChange={handleChange}></input>
    //         </div>

    //     </form>

    // }
  return (
    <>
        <form onSubmit={handleSubmit} className={styles["createCourseForm"]}>
            <div><input type='text'className={styles["createCourse-inputBox"]}  name='name'  placeholder='Enter The Name of Course'  value={values.name} onChange={handleChange}></input></div>
            <div><textarea cols={7} rows={7} name='description' className={styles["createCourse-inputBox"]} placeholder='Description'  value={values.description} onChange={handleChange}></textarea></div>
            <div><input type='text' name='category' className={styles["createCourse-inputBox"]} placeholder='Enter Category'  value={values.category} onChange={handleChange}></input></div>
            <div><Select value={values.paid} className={styles["createCourse-inputBox"]} onChange={v=>setValues({...values,paid:!values.paid})}>
                <Option value={true}>Paid</Option>.
                <Option value={false}>Free</Option>
            </Select></div>
            {values.paid && 

                <div>
                <div><input type='text' name='price' className={styles["createCourse-inputBox"]} placeholder='Enter The Price'  value={values.price} onChange={handleChange}></input></div>
                <div><input type='text' name='mrp' className={styles["createCourse-inputBox"]} placeholder='Enter MRP'  value={values.mrp} onChange={handleChange}></input></div>
               </div>}
            {/* <div><input type='text' name='name' className={styles["createCourse-inputBox"]} placeholder='Name'  value={values.name} onChange={handleChange}></input></div> */}
            <div className={styles["createCourse-image-div"]}> <label className={styles["createCourse-inputBox"]}>
                {values.loading?'uploading':'image upload EM'}
                <input className={styles["createCourse-image"]} type='file' name='image-english' accept='image/*' hidden onChange={handleEMImage}></input></label>

            </div>
            <div className={styles["createCourse-image-div"]}> <label className={styles["createCourse-inputBox"]}>
                {values.loading?'uploading':'image upload HM'}
                <input className={styles["createCourse-image"]} type='file' name='image-hindi' accept='image/*' hidden onChange={handleHMImage}></input></label>

            </div>
            {previewE &&<div><Avatar src={previewE} ></Avatar></div> }
            {previewH &&<div><Avatar  src={previewH} ></Avatar></div> }

            <div>
                <Button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                icon={<saveOutlined/>}>
                {values.loading? "Saving...":"Save and Continue"}
                </Button>
            </div>


        </form>

        <div>
        <pre>{JSON.stringify(values,null,4)}</pre>
        </div>
    </>
  )
}
