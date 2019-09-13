import React from 'react'
import { navigate } from 'gatsby'
import Button from '@material/react-button'

function TutorialsBtn(props) {
  const scrollToTutorials = e => {
    let tutorialsHeader = document.getElementById('tutorials-header')

    console.log(window.pageYOffset)
    let scroll =
      tutorialsHeader.getBoundingClientRect().top +
      document.documentElement.scrollTop
    console.log(
      'offset top',
      tutorialsHeader.getBoundingClientRect().top +
        document.documentElement.scrollTop
    )
    window.scroll({
      top: scroll,
      left: 0,
      behavior: 'smooth',
    })
  }
  return (
    <Button className="material-button" onClick={e => navigate('/docs')}>
      Tutorials
    </Button>
  )
}

export default TutorialsBtn
