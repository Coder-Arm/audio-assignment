import React from 'react'
import musicImg from '../../assets/musicImg.png'
import './style.css'
import AudioPlayer from '../AudioPlayer'

const CurrentPlayer = ({currentAudio,setCurrentAudio,audioFiles,isPlaying,setIsPlaying}) => {


  return (
    <div className='current-player-container'>
       <h1>Playing Now</h1>
       {
        currentAudio ? <div className='current-player'>
        <div >
            <img className='music-logo' src={musicImg} alt={currentAudio.audioName}/>
        </div>
        <div >
            <h2>{currentAudio.audioName}</h2>
            <AudioPlayer  currentAudio={currentAudio} setCurrentAudio={setCurrentAudio} audioFiles={audioFiles} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
        </div>
       </div>
       :
       <p>No music is being played.</p>
     } 
    </div>
  )
}

export default CurrentPlayer
