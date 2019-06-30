import React from 'react'
import styled from 'styled-components'
import Button from '@material/react-button'
// Local components
import PlayIcon from '../../../../images/PlayIcon'

function BrieflyAboutBtn({ className, setDialog }) {
  const leftIcon = <PlayIcon />
  return (
    <Button
      className={className}
      raised
      icon={leftIcon}
      onClick={() => setDialog(true)}
    >
      Briefly about
    </Button>
  )
}

const StyledComp = styled(BrieflyAboutBtn)`
  position: relative;
  height: 88px;
  width: 229px;
  border-radius: 44px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 0;
  padding: 0;
  background-color: white;
  --mdc-theme-primary: var(--green-nine);
  --mdc-theme-on-primary: var(--green-two);

  .mdc-button {
    height: 88px;
    width: 229px;
    border-radius: 44px;
  }

  .mdc-button__icon {
    position: absolute;
    left: 36px;
    height: 24px;
    width: 16px;
    fill: var(--green-two);
    padding-bottom: 2px;
  }

  .mdc-button__label {
    position: absolute;
    left: 76px;
    font-weight: 300;
    font-size: 1.125rem;
    letter-spacing: 0;
    line-height: 88px;
    text-transform: initial;
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

export default StyledComp
