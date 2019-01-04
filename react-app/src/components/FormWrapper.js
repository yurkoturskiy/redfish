import React from 'react'
import styled from 'styled-components'


const FormWrapper = styled.form`
  height: 100vh;
  width: 100%;
  background: ${props => props.theme.background};

  .form {
	  position: absolute;
	  top: 20%;
	  left: 50%;
	  transform: translate(-50%);
  }

  .title {
	  font-size: 1.5em;
	  text-align: center;
  }
`;

FormWrapper.defaultProps =  {
	theme: {
		background: 'palevioletred'
	}
}

export default FormWrapper