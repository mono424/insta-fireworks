import React, { Component } from 'react';
import Nes from 'nes/client';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import { BrowserRouter } from 'react-router-dom';
import Routes from './config/Routes';
import CircularProgress from '@material-ui/core/CircularProgress';
import Wrapper from './components/Wrapper';
import Runtime from './config/Runtime';
import './App.css';

const client = new Nes.Client('ws://' + window.location.host);

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue,
  }
});

class App extends Component {

  componentWillMount() {
    this.connectWS();
  }

  connectWS() {
    this.setState({ loading: true });
    Runtime.wsClient = client;
    client.connect({ timeout: 3000 }).then( () => {
      Runtime.wsError = null;
      this.setState({ loading: false });
		}).catch( err => {
      Runtime.wsError = err;
      this.setState({ loading: false });
    })
  }

  render() {
    let { loading } = this.state;
    return (
    <MuiThemeProvider theme={theme}>
      {
        loading
        ? (<div className="progress"><CircularProgress /></div>)
        : (
          <BrowserRouter>
            <Wrapper>
              <Routes />
            </Wrapper>
          </BrowserRouter>
        )
      }
    </MuiThemeProvider>
    );
  }
}

export default App;
