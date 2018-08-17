import React, { Component } from 'react';
import Nes from 'nes/client';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import Routes from './config/Routes';
import CircularProgress from '@material-ui/core/CircularProgress';
import Wrapper from './components/Wrapper';
import { Provider } from 'react-redux';
import store from './store.js';
import { subLogs, subSettings } from './actions'
import Runtime from './config/Runtime';
import './App.css';

Runtime.serverUrl = window.location.host;

// For Dev
Runtime.serverUrl = "localhost:8081";

const client = new Nes.Client(`ws://${Runtime.serverUrl}`);

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue,
  }
});

class App extends Component {

  componentWillMount() {
    client.onDisconnect = () => {
      this.connectWS();
    };
    client.onConnect = () => {
      this.setState({ loading: false, connected: true  });
    };
    this.connectWS();
  }

  connectWS() {
    this.setState({ loading: true, connected: false });
    Runtime.wsClient = client;
    client.connect({ timeout: 3000 }).then( () => {
      Runtime.wsError = null;
      this.setState({ loading: false, connected: true  });
      store.dispatch(subLogs());
      store.dispatch(subSettings());
		}).catch( err => {
      Runtime.wsError = err;
      this.setState({ loading: false, connected: false  });
    })
  }

  render() {
    let { loading, connected } = this.state;
    return (
    <MuiThemeProvider theme={theme}>
      {
        loading
        ? (<div className="progress"><CircularProgress /></div>)
        : (
          <Router>
            <Provider store={store}>
              <Wrapper connected={connected}>
                <Routes />
              </Wrapper>
            </Provider>
          </Router>
        )
      }
    </MuiThemeProvider>
    );
  }
}

export default App;
