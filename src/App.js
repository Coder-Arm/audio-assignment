import {  ToastContainer } from "react-toastify";
import Header from './components/Header'
import UploadFile from "./components/UploadFile";
import Playlist from "./components/Playlist";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import CurrentPlayer from "./components/CurrentPlayer";
import localforage from "localforage";



  function App() {
  const [audioFiles,setAudioFiles] = useState([]);
  const [currentAudio,setCurrentAudio] = useState(null);
  const [isPlaying,setIsPlaying] = useState(false);


  useEffect(() => {
    async function getData(){
    const audioFiles = await localforage.getItem('audioFiles')
     if(audioFiles) setAudioFiles(audioFiles)
    const currentMusic = await localforage.getItem('currentMusic');
    if(currentMusic) setCurrentAudio(currentMusic)
  }
  getData()
  },[])


  return (
          <>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
             
          />
          <Header/>
          <div style={{padding : '2rem'}}>
          <UploadFile audioFiles={audioFiles} setAudioFiles={setAudioFiles}/>
          <CurrentPlayer currentAudio={currentAudio} audioFiles={audioFiles} setCurrentAudio={setCurrentAudio} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          <Playlist audioFiles={audioFiles} setAudioFiles={setAudioFiles} setCurrentAudio={setCurrentAudio} setIsPlaying={setIsPlaying} isPlaying={isPlaying}/>
          </div>
          </>
  );
}

export default App;
