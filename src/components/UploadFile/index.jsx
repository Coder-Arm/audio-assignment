import React from 'react'
import './style.css'
import UploadIcon from '@mui/icons-material/Upload';
import {toast} from 'react-toastify'
import localforage from 'localforage';
const UploadFile = ({setAudioFiles}) => {
   
 async function handleUpload(e){
    const file = e.target.files[0];
    const fileName = file.name.slice(0,-4)
    //  console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      const audioSrc = reader.result;
   
    if(await localforage.getItem('audioFiles')){
      const musicFiles = await localforage.getItem('audioFiles');
     await localforage.setItem('audioFiles',[...musicFiles,{
      id : Date.now().toString(),
      audioName : fileName,
      audioSrc
    }])
    
    }
    else{
     await localforage.setItem('audioFiles',([{
        id : Date.now().toString(),
        audioName : fileName,
        audioSrc
      }]))
    }
    setAudioFiles(await localforage.getItem('audioFiles'))
      
    toast.success(`${fileName} song is uploaded successfully`);
  }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  return (
    <div style={{display : 'flex',flexDirection : 'column' ,alignItems : 'center'}}>
      <label htmlFor='upload-audio-file' className='upload-box' >
        <UploadIcon sx={{fontSize : '4rem'}}/>
      </label>
      
      <input type='file' id='upload-audio-file' accept='audio/mp3' style={{display : 'none'}} onChange={handleUpload} />
      <p style={{fontSize : '1.5rem',marginTop : '1rem'}}>Upload your audio file here.</p>
    </div>
  )
}

export default UploadFile
