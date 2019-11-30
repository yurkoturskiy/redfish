import React from 'react'

function VideoDialog({ setDialog }) {
  return (
    <div className="video-dialog">
      <iframe
        className="video"
        title="briefly-about"
        src="https://www.youtube.com/embed/RykuNuico7w?autoplay=1"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="background" onClick={() => setDialog(false)} />
    </div>
  )
}

export default VideoDialog
