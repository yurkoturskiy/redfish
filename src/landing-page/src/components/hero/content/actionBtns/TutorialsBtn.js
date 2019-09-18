import React from 'react'
import Button from '@material/react-button'
import PrimitivoTransitionLink from '../../../styledUIElements/PrimitivoTransitionLink'

function TutorialsBtn(props) {
  return (
    <PrimitivoTransitionLink to="/docs/">
      <Button className="material-button">Tutorials</Button>
    </PrimitivoTransitionLink>
  )
}

export default TutorialsBtn
