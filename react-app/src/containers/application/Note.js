import React from "react";
import { 
  NoteCard,
  NoteTitle,
  NoteContent,
} from "../../components/Notes"

class Note extends React.Component {
  componentDidMount() {
    const height = document.getElementById(this.props.node.id).clientHeight
    console.log('height ' + height )
  }
  render() {
    const xAxis = this.props.index * 256
    const position = {
      transform: 'translate(' + xAxis + 'px, 0px)',
    }
    
    return (
      <NoteCard id={this.props.node.id}  style={position}>
        {this.props.node.title && <NoteTitle>{this.props.node.title}</NoteTitle>}
        {this.props.node.content && <NoteContent>{this.props.node.content}</NoteContent>}
      </NoteCard>
    )
  }
}


export default Note