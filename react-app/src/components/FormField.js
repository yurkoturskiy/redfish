import React from "react"
import { connect } from 'react-redux'
// actions
import { showHidePass } from '../actions/ui'


class FormField extends React.Component {
  constructor(props) {
    super(props)
    if (this.props.showPassState) {
      // hide password if shown
      this.props.showHidePass()
    }
  }
  render() {
    const {
      input,
      label,
      type,
      showPassIcon,
      meta: { touched, error, warning }
    } = this.props
    var dynamicType = undefined
    // type setup
    if (showPassIcon) {
      dynamicType = (this.props.showPassState ? "text" : "password")
    } else {
      dynamicType = type
    }
    
    return (
      <React.Fragment>
        <div>
          <label>{label}</label>
          <div className='input-container'>
            {showPassIcon && (
              <i className='material-icons input-icons' onClick={this.props.showHidePass}>
                {this.props.showPassState ? 'visibility' : 'visibility_off'}
              </i>
            )}
            <input 
              {...input} 
              placeholder={label} 
              type={dynamicType} 
              className='input-field'
              onChange={(event) => {
                input.onChange(event)
              }}
            />
          </div>
            {touched &&
              ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>


      </React.Fragment>
    )
  }
}


const mapStatetoProps = state => {
  return {
    showPassState: state.ui.showPassState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showHidePass: () => dispatch(showHidePass()),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(FormField)