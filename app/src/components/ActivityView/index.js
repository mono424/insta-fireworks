import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ActivityHeader from './ActivityHeader';
import ActivityCards from './ActivityCards';
import Runtime from '../../config/Runtime';

const styles = {

  subheading: {
    color: "rgb(179, 179, 179)"
  }

}

class ActivityView extends Component {
  state = {
    log: [],
    mode: "cards"
  }

  componentDidMount() {
    Runtime.wsClient.subscribe('/log', message => {
      let { type, payload } = message;
      if( type === "complete" ) {
        this.setState({ logs: payload });
      }else{
        this.setState({ logs: payload.concat(this.state.logs) });
      }
    });
  }

  changeMode = mode => {
    this.setState({mode})
  }

  render() {
    let { title, subtitle, classes } = this.props;
    let { mode, logs } = this.state;

    return (
      <div>
        <ActivityHeader onChange={this.changeMode} selected={mode} />
        {
          mode === "cards"
          ? <ActivityCards logs={logs} />
          : null
        }
      </div>
    );
  }
}

export default withStyles(styles)(ActivityView);
