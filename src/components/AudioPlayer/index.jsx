import React, { useEffect, useRef, useState } from 'react'
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import localforage from 'localforage';
import './style.css'

const AudioPlayer = ({currentAudio,setCurrentAudio,audioFiles,setIsPlaying,isPlaying}) => {
    const [duration,setDuration] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);
     
    const skipTime = 10;
    const audioRef = useRef();

    useEffect(() => {
      const audio = audioRef.current;
      if(isPlaying) audio.play()
      else audio.pause()
    })

    useEffect(() => {
      const audio = audioRef.current;
      audio.addEventListener('loadedmetadata',() => {
        setDuration(audio.duration)
      })
         
      audio.addEventListener('timeupdate',handleTimeUpdate)
      audio.addEventListener('ended',handleTimeEnd)

      return () => {
        audio.removeEventListener('timeupdate',handleTimeUpdate)
        audio.removeEventListener('ended',handleTimeEnd)
      }
    },[])

    function formatTime(time){
       const totalMins = Math.floor(time/60) < 10 ? `0${Math.floor(time/60)}` : Math.floor(time/60);
       const remSecs = Math.floor(time%60) < 10 ? `0${Math.floor(time%60)}` : Math.floor(time%60);

       return totalMins + " : " + remSecs;
    }

    function handleTimeUpdate(){
        setCurrentTime(audioRef.current.currentTime)
    }

    async function handleTimeEnd(){
       setCurrentTime(0);
       console.log('time ended');
       console.log(currentAudio.id)
        const idx = audioFiles.findIndex(item => item.id === currentAudio.id)
        console.log(idx);
        if(idx < audioFiles.length-1){
          const nextMusic =  await localforage.setItem('currentMusic',audioFiles[idx+1])
           setCurrentAudio(nextMusic)
        }
        else{
         const nextMusic =  await localforage.setItem('currentMusic',audioFiles[0]);
          setCurrentAudio(nextMusic)
        }
        
        
    }

    function handlePlayPause(){
      if(isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    } 

    function handleSeek(e){
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(audioRef.current.currentTime)
    }
    function handleForward(){
        if(duration - currentTime < 10) {
            setCurrentTime(0)
            audioRef.current.currentTime = 0;
        }
        else {
             setCurrentTime(prev => prev+skipTime)
             audioRef.current.currentTime += skipTime     
        }
    }

    function handleBackward(){
        if(currentTime < 10){
             setCurrentTime(0)
            audioRef.current.currentTime = 0
        }
        else {
            setCurrentTime(prev => prev-skipTime)
            audioRef.current.currentTime -= skipTime  
        }
    }


  return (
    <div className='audio-player'>
      <audio src={currentAudio.audioSrc} ref={audioRef} />
      <input type='range' value={currentTime} onChange={handleSeek} max={duration}/>
      <div style={{
             display : 'flex', 
             justifyContent : 'space-between',
             fontSize : '1.1rem',
             alignItems : 'center',
             marginTop : '5px'}}>

        <span>{formatTime(currentTime)}</span>
 
        <span>{formatTime(duration)}</span>
        
      </div>
      <div style={{display : 'flex', justifyContent : 'center', gap : '5%',alignItems : 'center'}}>
      <Replay10Icon onClick={handleBackward} sx={{fontSize : '3rem',cursor : 'pointer'}}/>

{ 
     !isPlaying ?
     <PlayCircleIcon onClick={handlePlayPause} sx={{fontSize : '3rem',cursor : 'pointer'}}/>

     : 
     <PauseCircleIcon onClick={handlePlayPause} sx={{fontSize : '3rem',cursor : 'pointer'}}/>
}
 <Forward10Icon onClick={handleForward} sx={{fontSize : '3rem',cursor : 'pointer'}}/>
      </div>
    </div>
  )
}

export default AudioPlayer
