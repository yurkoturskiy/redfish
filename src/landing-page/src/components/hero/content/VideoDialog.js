import React from 'react'

function VideoDialog({ setDialog }) {
  return (
    <div className="video-dialog">
      <div className="iframe-wrapper">
        <iframe
          className="video"
          title="briefly-about"
          src="https://www.youtube.com/embed/yOM1nbqirQQ"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="background" onClick={() => setDialog(false)} />
    </div>
  )
}

export default VideoDialog
