import React from 'react'
import './style.css'
import localforage from 'localforage'
const PlaylistCard = ({audioFile,setCurrentAudio,setIsPlaying}) => {
   
 async function handlePlay(){
  await localforage.setItem('currentMusic',audioFile)
    setCurrentAudio(audioFile)
    setIsPlaying(true)
  }

  return (
    <div className='playlist-card'>
         <h3>{audioFile.audioName}</h3>
         <button onClick={handlePlay}>Play</button>
    </div>
  )
}

export default PlaylistCard
