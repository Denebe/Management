import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Wow from './Wow';


const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
  },
});


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Wow />
  </MuiThemeProvider>,
  document.getElementById('root')
);
