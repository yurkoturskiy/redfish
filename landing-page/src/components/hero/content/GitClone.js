import React, { useState } from 'react'
import { css } from 'linaria'
// Local components
import ClipboardIcon from '../../../images/ClipboardIcon'

const block = css`
  /* position */
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 48px;
  /* style */
  height: 30px;
  width: 447px;
  border: 1px solid #444;
  border-radius: 8px;
`

const input = css`
  display: inline-block;
  margin: 0;
  color: #444;
  line-height: 30px;
  padding: 0 7px 0 4px;
  margin: 0;
  border: 0;
  width: 412px;
  background-color: transparent;
  caret-color: transparent;
  /* text */
  font-family: Fira Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 30px;
`

const allert = css`
  /* position */
  position: absolute;
  top: -28px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  /* style */
  background-color: yellow;
  border-radius: 4px;
  width: 64px;
  padding: 4px;
  /* text */
  text-align: center;
  font-size: 0.75rem;
`

function GitClone() {
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
    <div className={block}>
      <ClipboardIcon onClick={() => copyToClipboard()} />
      <input
        className={input}
        id="git-clone"
        type="text"
        defaultValue="git clone https://github.com/guandjoy/Redfish.git"
      />
      {isCopied && <div className={allert}>Copied</div>}
    </div>
  )
}

export default GitClone
