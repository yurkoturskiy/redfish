import React from 'react'

function TutorialsContainer() {
  return (
    <div className="tutorials-container">
      <h2 id="tutorials">Tutorials</h2>
      <div className="content">
        <div className="element">
          01<span>Install</span>
        </div>
        <div className="element">
          02<span>Walkthrough</span>
        </div>
        <div className="element">
          03<span>Deploy landing on Netlify</span>
        </div>
        <div className="element">
          04<span>Deploy server on DigitalOcean</span>
        </div>
      </div>
    </div>
  )
}

export default TutorialsContainer
