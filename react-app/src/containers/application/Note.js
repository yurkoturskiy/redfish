import React from "react"
import { withApollo, compose, graphql } from 'react-apollo'
import { 
  NoteCard,
  NoteTitle,
  NoteContent,
} from "../../components/Notes"
import cardsParams from '../../graphql/cardsParams'

class Note extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      xAxis: 0,
      yAxis: 0,
    }
  }
  componentDidMount() {
    const height = document.getElementById(this.props.node.id).clientHeight
    const width = document.getElementById(this.props.node.id).clientWidth
    this.setState({ xAxis: this.props.index * 256 })
    let cardsParams = this.props.cardsParams
    cardsParams[this.props.index] = { 
      xAxis: this.state.xAxis, 
      height: height, 
      width: width, 
      __typename: 'size' 
    }
    this.props.client.writeData({ data: { cardsParams: cardsParams } })
  }
  render() {
    // const xAxis = this.props.index * 256
    const position = {
      transform: 'translate(' + this.state.xAxis + 'px, 0px)',
    }
    return (
      <NoteCard id={this.props.node.id}  style={position}>
        {this.props.node.title && <NoteTitle>{this.props.node.title}</NoteTitle>}
        {this.props.node.content && <NoteContent>{this.props.node.content}</NoteContent>}
      </NoteCard>
    )
  }
}


// export default Note

export default withApollo(compose(
  graphql(cardsParams, {
    props: ({ data: { cardsParams } }) => ({
      cardsParams
    })
  }),
)(Note))