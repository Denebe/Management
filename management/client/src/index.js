import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
  },
});


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
