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

    // type setup
    if (showPassIcon) {
      var dynamicType = (this.props.showPassState === false ? "password" : "text")
    } else {
      var dynamicType = type
    }

    return (
      <div>
        <label>{label}</label>
        <div className='input-container'>
          {showPassIcon && (
            <i className='icon' onClick={this.props.showHidePass}>
              {this.props.showPassState ? 'hide' : 'show'}
            </i>
          )}
          <input {...input} placeholder={label} type={dynamicType} className='input-field' />
        </div>
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
      </div>
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