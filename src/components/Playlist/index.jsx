import React from 'react'
import PlaylistCard from '../PlaylistCard'
import './style.css'

const Playlist = ({audioFiles,setCurrentAudio,isPlaying,setIsPlaying}) => {
  

  return (
    <div style={{marginTop : '3rem'}}>
      <h1>Playlist</h1>
     {
      audioFiles.length > 0 ? 
        <div className='playlist-container' >
         {
          audioFiles.map((item) => {
            return <PlaylistCard key={item.id} audioFile={item} setCurrentAudio={setCurrentAudio} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
          })
         }
        </div>
        :
        <p style={{marginTop : '1rem'}}>No playlist found</p>
     } 
    </div>
  )
}

export default Playlist
