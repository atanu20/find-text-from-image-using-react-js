import React,{useState} from 'react'
import Tesseract from 'tesseract.js';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import './App.css'

const App = () => {
 
  const [searchByurl, setSearchByurl] = useState(false)
  const [show, setShow] = useState(false)
  const [textArea, setTextArea] = useState(false)
  const [textAreaValue, setTextAreaValue] = useState("")
  // const [imageURL, setImageURL] = useState(null);

  const ChangeOption=()=>{
    setShow(false)
    setTextArea(false)
    setTextAreaValue("")
    setSearchByurl(!searchByurl)
    
  }

  const notify = () => {
    toast('You Copied It!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      });
  }



const UrlHandel= async (e)=>{
  setShow(true)
  
 const urlInp = e.target.value
 if (urlInp) {
    
  try{
    const {data: { text } } = await Tesseract.recognize(
      `${urlInp}`,
      'eng'
     
    )


    //  console.log(text)
     setTextArea(true)
     setTextAreaValue(text)
     setShow(false)

  }
  catch (error){
    alert("Check Your url or Something Wrong with Url")
    setShow(false)

  }
     
    


      
     
 } else {
   // setImageURL(null)
     alert("Upload Url")
 }
 

}


  const InputHandel= async (e)=>{
     setShow(true)
     
    const { files } = e.target
    if (files.length > 0) {
        const url = URL.createObjectURL(files[0])
        // setImageURL(url)
        
       const {data: { text } } = await Tesseract.recognize(
          `${url}`,
          'eng'
         
        )


        //  console.log(text)
         setTextArea(true)
         setTextAreaValue(text)
         setShow(false)


         
        
    } else {
      // setImageURL(null)
        alert("file not uploaded")
    }
    
   
  }
 
  // console.log(imageURL)

  return (
    <>
      {
        searchByurl ? (
          <>
          <div className="home">
      <div className="container">
        <div className="box">
         
          <h1>Find Your Image Text</h1>
          <button className="btn btn-outline-success" onClick={ChangeOption}>Search By File</button>
        </div>
        <div className="row">
          <div className="col-md-6 mb-5">
            <img src="image/logo.jpg" alt="kno" className="img-fluid img" />
          </div>
          <div className="col-md-6 mb-3">
           <div className="card">
             <div className="card-box">
            {
              show ? (
                <>
                
              <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>
                
                </>
              ) :(
                <>
                {
                  textArea ? (
                    <>
                    
                     <textarea className="form-control" rows="5" id="comment" value={textAreaValue}></textarea>
                     <div className="text-center p-2">
                       <button className="btn btn-outline-success m-1" onClick={()=>setTextArea(false)}>Reset Now</button>
                       <CopyToClipboard text={textAreaValue}>
                         <button className="btn btn-outline-success m-1" onClick={notify}>Copy It</button>
                       </CopyToClipboard>
                       
       
                     </div>
                     
                    </>
                  ) :(
                    <>
                    <div className="upload-btn-wrapper">
                    <input type="text" className="form-control text-url" placeholder="Enter Url . . ." onChange={UrlHandel} />
                    </div>
              
              
            

                    </>
                  )
                }
                 

                </>
              )
            }
             </div>
           </div>
          </div>
        </div>
      </div>
    </div>

    <ToastContainer />

          </>
        ) :(
          <>
          <div className="home">
      <div className="container">
        <div className="box">
         
          <h1>Find Your Image Text</h1>
          <button className="btn btn-outline-success" onClick={ChangeOption}>Search By Url</button>
        </div>
        <div className="row">
          <div className="col-md-6 mb-5">
            <img src="image/logo.jpg" alt="kno" className="img-fluid img" />
          </div>
          <div className="col-md-6 mb-3">
           <div className="card">
             <div className="card-box">
            {
              show ? (
                <>
                
              <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>
                
                </>
              ) :(
                <>
                {
                  textArea ? (
                    <>
                    
                     <textarea className="form-control" rows="5" id="comment" value={textAreaValue}></textarea>
                     <div className="text-center p-2">
                       <button className="btn btn-outline-success m-1" onClick={()=>setTextArea(false)}>Reset Now</button>
                       <CopyToClipboard text={textAreaValue}>
                         <button className="btn btn-outline-success m-1" onClick={notify}>Copy It</button>
                       </CopyToClipboard>
                       
       
                     </div>
                     
                    </>
                  ) :(
                    <>
                    <div className="upload-btn-wrapper">
              <button className="btn">Upload a file</button>
              <input type="file" accept='image/*' capture='camera' name="myfile" onChange={InputHandel} />
            </div>

                    </>
                  )
                }
                 

                </>
              )
            }
             </div>
           </div>
          </div>
        </div>
      </div>
    </div>

    <ToastContainer />


          </>
        )
      }
      <div className="container text-center p-2">
        <p className="text-white">Design & Develop By <a href="https://github.com/atanu20" target="_blank">Atanu Jana</a> </p>
      </div>
    </>
  )
}

export default App
