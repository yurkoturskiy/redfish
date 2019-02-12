import React, { useState, useEffect } from 'react'
import Note from './Note'

import styled from 'styled-components'

const Styled = styled.div`
  display: block;
  width: ${props => props.values.width}px;
  // border: 1px solid grey;
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
Styled.defaultProps =  {
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
    console.log(cardsSampleProps)
  })

  const [columns, setColumns] = useState(undefined)
  useEffect(() => {
    setColumns(Math.floor(globalWidth / cardsSampleProps.totalWidth))
  }, [globalWidth, cardsSampleProps])

  const [cards, setCards] = useState([])
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
  const updateCards = (index, position, id) => {
    console.log('updateCards')
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
    // console.log("height", height)
    // console.log("empty endline", endline)
    // console.log("index", index)
    // console.log("columns", columns)
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
  const handleResize = () => {
    // console.log('resize')
    setGlobalWidth(document.getElementById("wrapper").offsetWidth)
    cardsSampleProps.width = document.getElementById(props.allNotes[0].node.id).offsetWidth
    setCardsSampleProps(cardsSampleProps)
    // setColumns(Math.floor(globalWidth / cardsSampleProps.width))
  }

  const styles = () => ({
    display: 'block',
    width: `300px`,
    margin: '32px auto 0 auto',
    border: '1px solid grey',
    background: '#030303'
  })

  const notes = props.allNotes.map(({ node }, index) => {
    // console.log(node)
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
    <Styled id="wrapper">
      <div style={{
        width: columns * cardsSampleProps.totalWidth + 'px', 
        height: globalHeight + 'px',
        // border: '1px solid red',
        margin: 'auto',
      }}>
        {notes}
      </div>
    </Styled>
  )
}

export default NotesWrapper