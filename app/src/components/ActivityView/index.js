import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ActivityHeader from './ActivityHeader';
import ActivityCards from './ActivityCards';
import ActivityLog from './ActivityLog';
import Runtime from '../../config/Runtime';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { logs: state.logs };
};

const styles = {

  subheading: {
    color: "rgb(179, 179, 179)"
  }

}

class ActivityView extends Component {
  state = {
    mode: "cards"
  }

  changeMode = mode => {
    this.setState({mode})
  }

  render() {
    let { title, subtitle, classes, logs } = this.props;
    let { mode } = this.state;
    
    return (
      <div>
        <ActivityHeader onChange={this.changeMode} selected={mode} />
        {
          mode === "cards"
          ? <ActivityCards logs={logs} />
          : <ActivityLog logs={logs} />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ActivityView));
