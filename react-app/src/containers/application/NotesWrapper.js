import React, { useState, useEffect } from 'react'
import Note from './Note'

import styled from 'styled-components'

const Container = styled.div`
  display: block;
  width: ${props => props.values.width}px;
  // border: 1px solid #CFCFCF;
  margin: 32px auto 0 auto;
  @media (min-width: 576px) {
    width: 340px;
  }
  @media (min-width: 768px) {
    width: 640px;
  }
  @media (min-width: 1024px) {
    width: 960px;
  }
  @media (min-width: 1200px) {
    width: 1024px;
  }
  @media (min-width: 1920px) {
    width: 1612px;
  }
`
Container.defaultProps =  {
  values: {
    width: 256,
  }
}

function NotesWrapper(props) {
  const [globalWidth, setGlobalWidth] = useState(0)
  const [globalHeight, setGlobalHeight] = useState(0)
  useEffect(() => {
    setGlobalWidth(document.getElementById("wrapper").offsetWidth)
  })


  // the sample of cards is a representer of all general styles of cards
  const [cardsSampleProps, setCardsSampleProps] = useState({
    width: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    totalWidth: 0,
  })
  useEffect(() => {
    // set cardsSampleProps
    let cardsSample = document.getElementById(props.allNotes[0].node.id)
    let cardsSampleStyles = window.getComputedStyle(cardsSample)
    cardsSampleProps.width = cardsSample.offsetWidth
    cardsSampleProps.marginTop = Number(cardsSampleStyles.marginTop.replace(/[^0-9]/g, ''))
    cardsSampleProps.marginRight = Number(cardsSampleStyles.marginRight.replace(/[^0-9]/g, ''))
    cardsSampleProps.marginBottom = Number(cardsSampleStyles.marginBottom.replace(/[^0-9]/g, ''))
    cardsSampleProps.marginLeft = Number(cardsSampleStyles.marginLeft.replace(/[^0-9]/g, ''))
    cardsSampleProps.totalWidth = (
      cardsSampleProps.width 
      + cardsSampleProps.marginRight 
      + cardsSampleProps.marginLeft
    )
    setCardsSampleProps(cardsSampleProps)  
  })


  // the number of columns depends on the width of screen
  const [columns, setColumns] = useState(undefined)
  useEffect(() => {
    setColumns(Math.floor(globalWidth / cardsSampleProps.totalWidth))
  }, [globalWidth, cardsSampleProps])


  const [cards, setCards] = useState([])
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  const handleResize = () => {
    setGlobalWidth(document.getElementById("wrapper").offsetWidth)
    cardsSampleProps.width = document.getElementById(props.allNotes[0].node.id).offsetWidth
    setCardsSampleProps(cardsSampleProps)
    // setColumns(Math.floor(globalWidth / cardsSampleProps.width))
  }

  const updateCards = (index, position, id) => {
    var width = cardsSampleProps.totalWidth
    var height = (
      document.getElementById(id).offsetHeight 
      + cardsSampleProps.marginTop 
      + cardsSampleProps.marginBottom
    )
    cards[index] = {
      index: index, 
      prevPosition: position,
      width: width, 
      height: height,
    }
    var endline = []
    for (let i = 0; i < columns; i++) {
      endline[i] = 0
    }
    for (let i in cards) {
      let leastNum = Math.min(...endline)
      let leastNumIndex = endline.indexOf(leastNum)
      if (i == index) {
        var posX = leastNumIndex * width
        var posY = endline[leastNumIndex]  
        cards[index].position = {x: posX, y: posY}
        setCards(cards)
        endline[leastNumIndex] += cards[i].height
        setGlobalHeight(Math.max(...endline))
        return cards[index].position
      }
      endline[leastNumIndex] += cards[i].height
    }
    return false
  }


  const notes = props.allNotes.map(({ node }, index) => {
    return (
      <Note 
        globalWidth={globalWidth} 
        cardsSampleProps={cardsSampleProps}
        columns={columns}
        updateCards={updateCards} 
        index={index} 
        key={node.id} 
        node={node}
      />
    )
  })

  return (
    <Container id="wrapper">
      <div style={{
        width: columns * cardsSampleProps.totalWidth + 'px', 
        height: globalHeight + 'px',
        // border: '1px solid red',
        margin: 'auto',
      }}>
        {notes}
      </div>
    </Container>
  )
}

export default NotesWrapper