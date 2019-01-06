import styled from 'styled-components'


const FormWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: ${props => props.theme.background};

  form {
    width: 300px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
  }

  h3 {
    color: #444
    font-size: 1.5em;
    text-align: center;
  }

  label {
    font-size: 1em;
    color: #444;
  }

input, select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

input[type=submit]:disabled {
  background-color: #45a049;
  color: #93D098;
}

`;

FormWrapper.defaultProps =  {
  theme: {
    background: 'palevioletred'
  }
}

export default FormWrapper