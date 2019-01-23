import styled from 'styled-components'
import '@material/react-button/dist/button.css';
import '@material/react-text-field/dist/text-field.css';


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
    display: inline-block;
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

  .input-container {
    width: 100%;
  }

  .form-button {
    float: right;
  }
`

FormWrapper.defaultProps =  {
  theme: {
    background: 'palevioletred'
  }
}

export default FormWrapper