import styled from 'styled-components'


export const NotesWrapper = styled.div`
  display: block;
  width: 1612px;
  margin: 32px auto 0 auto;
`

export const NoteCard = styled.div`
  width: 240px;
  position: absolute;
  margin: 8px;
  padding: 12px;
  border: 1px solid grey;
  border-radius: 6px;
  transform: translate(${props => props.position.x}px, ${props => props.position.y}px);
  visibility: ${props => props.visibility};
`

export const NoteTitle = styled.h3`
  font-size: 1.5em;
`

export const NoteContent = styled.p`
  font-size: 1em;
`

NoteCard.defaultProps =  {
  position: '0px, 0px',
  visibility: 'hidden',
}