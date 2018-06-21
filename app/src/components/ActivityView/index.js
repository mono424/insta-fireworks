import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ActivityHeader from './ActivityHeader';
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
        this.setState({ log: payload });
      }else{
        this.setState({ log: payload.concat(this.state.log) });
      }
    });
  }

  changeMode = mode => {
    this.setState({mode})
  }

  render() {
    let { title, subtitle, classes } = this.props;
    let { mode, log } = this.state;
    console.log({log});
    return (
      <div>
        <ActivityHeader onChange={this.changeMode} selected={mode} />

      </div>
    );
  }
}

export default withStyles(styles)(ActivityView);
