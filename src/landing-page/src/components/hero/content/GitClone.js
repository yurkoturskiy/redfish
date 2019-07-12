import React, { useState } from 'react'
// Local components
import ClipboardIcon from '../../../images/ClipboardIcon'

function GitClone({ className }) {
  const [isCopied, setIsCopied] = useState(false)
  const copyToClipboard = () => {
    let copyText = document.getElementById('git-clone')
    copyText.select()
    document.execCommand('copy')
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2400)
  }
  return (
    <div className="git-clone">
      <ClipboardIcon className="icon" onClick={() => copyToClipboard()} />
      <input
        id="git-clone"
        type="text"
        defaultValue="git clone https://github.com/guandjoy/Redfish.git"
      />
      {isCopied && <div className="allert">Copied</div>}
    </div>
  )
}

export default GitClone
