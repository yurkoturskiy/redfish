import React from 'react'

import '@material/react-text-field/dist/text-field.css'

function FormWrapper(props) {
  return <div className="form-wrapper">{props.children}</div>
}

export default FormWrapper
