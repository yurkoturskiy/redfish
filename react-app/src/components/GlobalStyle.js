import { createGlobalStyle } from 'styled-components'
import '@material/react-text-field/dist/text-field.css';
import '@material/react-button/dist/button.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  body {
    font-family: 'Fira Sans', sans-serif;
    margin: 0;
    padding: 0;
  }
`