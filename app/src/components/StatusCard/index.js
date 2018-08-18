import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Runtime from '../../config/Runtime';

const mapStateToProps = state => {
  return { status: state.status };
};

const styles = {

  connecting: {
    display: "flex",
    color: "rgb(134, 134, 134)"
  },

  connectingText: {
    fontSize: 14,
    padding: "22px 0 20px 20px"
  },

  connectedText: {
    fontSize: 14,
    padding: "22px 0 20px 20px",
  },

  connected: {
    background: "rgb(104, 227, 181)"
  },

  cardContent: {
    paddingBottom: "16px !important"
  }

}

class StatusCard extends Component {

  toggleStatus = () => {
    if (this.props.status === "started") {
      axios.post("http://" + Runtime.serverUrl + '/api/stop');
    } else {
      axios.post("http://" + Runtime.serverUrl + '/api/start');
    }
  }

  render() {
    let { connected, classes, status } = this.props;
    console.log({status});
    return (
      <Card>
        <CardContent className={classes.cardContent}>
          {
            !connected
            ? (
                <div className={classes.connecting}>
                  <Button variant="fab" color="secondary" disabled={true} >
                    <PortableWifiOffIcon />
                  </Button>
                  <span className={classes.connectingText}>Disconnected</span>
                </div>
              )
            : (
              <div className={classes.connecting}>
                  <Button variant="fab" color="secondary" onClick={this.toggleStatus}>
                    {
                      status === "started"
                        ? (<PauseIcon />)
                        : (<PlayIcon />)
                    }
                  </Button>
                <span className={classes.connectedText}>
                    {
                      status === "started"
                        ? "Running"
                        : "Stopped"
                    }
                </span>
              </div>
            )
          }
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(StatusCard)));

