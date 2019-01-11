import React from "react"
import TextField, {HelperText, Input, Icon} from '@material/react-text-field';

const MaterialTextField = ({
  id, input, label, type, helperText, tralingIcon, tralingIconOnClick,
  meta: {touched, error, warning} 
}) => {
  
  const helperTextTag = (
    <HelperText persistent='true'>
      {
        (touched && 
          ((error && error) || (warning && warning))
        ) || helperText
      }
    </HelperText>
  )
  const tralingIconTag = (
    <Icon>
      <i 
        className='material-icons' 
        tabIndex="1" 
        role="button" 
        onClick={tralingIconOnClick}
      >
        {tralingIcon}
      </i>
    </Icon>
  )

  return (
    <div>
      <TextField
        label={label}
        className='input-container'
        outlined={false}
        helperText={helperTextTag}
        trailingIcon={tralingIconTag}
      >
        <Input
          {...input}
          id={id}
          type={type} 
          onChange={(event) => {
            input.onChange(event)
          }}
        />
      </TextField>
    </div>
  )
}


export default MaterialTextField