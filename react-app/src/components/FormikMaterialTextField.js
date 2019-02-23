import React from "react"
import TextField, {HelperText, Input, Icon} from '@material/react-text-field';

export const FormikMaterialTextField = ({
  field, // { name, value, onChange, onBlur }
  name,
  label,
  type,
  helperText,
  tralingIcon,
  tralingIconOnClick,
  warning,
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const helperTextTag = (
    <HelperText persistent='true'>
      {
        (touched[field.name] && 
          ((errors[field.name] && errors[field.name]) || (warning && warning))
        ) || helperText
      }
    </HelperText>
  )
  const tralingIconTag = (
    <Icon onSelect={tralingIconOnClick}>
      <i 
        className='material-icons' 
        tabIndex="1" 
        role="button"
      >
        {tralingIcon}
      </i>
    </Icon>
  )
  return (
    <div>
      <TextField
        label={label}
        {...field} {...props}
        className='input-container'
        outlined={false}
        helperText={helperTextTag}
        trailingIcon={tralingIconTag}
      >
        <Input 
          type={type} 
          {...field} 
          {...props} 
        />
      </TextField>
    </div>
  )
}

export default FormikMaterialTextField