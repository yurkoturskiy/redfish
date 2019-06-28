import React from 'react'
import { css } from 'linaria' // eslint-disable-line
import Button from '@material/react-button'
// Local components
import PlayIcon from '../../../../images/PlayIcon'

const button = css`
  position: relative;
  height: 88px;
  width: 245px;
  border-radius: 44px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 0;
  padding: 0;
  background-color: white;
  --mdc-theme-primary: var(--green-nine);
  --mdc-theme-on-primary: var(--green-two);

  .mdc-button__icon {
    position: absolute;
    left: 32px;
    height: 29px;
    width: 29px;
    fill: var(--green-ten);
    padding-bottom: 2px;
  }

  .mdc-button__label {
    font-weight: 300;
    font-size: 1.125rem;
    letter-spacing: 0;
    line-height: 88px;
    text-transform: initial;
    margin-left: 16px;
  }

  /* Adapt size */

  @media screen and (max-width: 800px) {
    height: 72px;
    width: 200px;
    border-radius: 36px;

    .mdc-button__icon {
      height: 22px;
      width: 22px;
      left: 24px;
    }

    .mdc-button__label {
      font-size: 1rem;
      line-height: 72px;
      margin-left: 8px;
    }
  }
`

function BrieflyAboutBtn(props) {
  const leftIcon = <PlayIcon />
  return (
    <Button
      className={button}
      raised
      icon={leftIcon}
      onClick={() => props.setDialog(true)}
    >
      Briefly about
    </Button>
  )
}

export default BrieflyAboutBtn
