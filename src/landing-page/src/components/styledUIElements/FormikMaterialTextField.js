import React from 'react'
import MaterialIcon from '@material/react-material-icon'
import TextField, { HelperText, Input, Icon } from '@material/react-text-field'

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
    <HelperText persistent="true" validation isValidationMessage>
      {(touched[field.name] &&
        ((errors[field.name] && errors[field.name]) || (warning && warning))) ||
        helperText}
    </HelperText>
  )

  return (
    <div className="text-field">
      <TextField
        label={label}
        {...field}
        {...props}
        className="input-container"
        outlined={true}
        helperText={helperTextTag}
        trailingIcon={
          tralingIcon && <MaterialIcon role="button" icon={tralingIcon} />
        }
        onTrailingIconSelect={tralingIconOnClick}
      >
        <Input
          isValid={!errors[field.name]}
          type={type}
          {...field}
          {...props}
        />
      </TextField>
    </div>
  )
}

export default FormikMaterialTextField
