import React from 'react'
import { useYoutubePlayer } from './player/YoutubePlayer';

function TogglePlaybackButton() {
  const { togglePlayer } = useYoutubePlayer();
  return <button onClick={togglePlayer}>Toggle Playback</button>
}


export default TogglePlaybackButton
