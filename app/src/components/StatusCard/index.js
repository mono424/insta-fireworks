import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff';
import Avatar from '@material-ui/core/Avatar';

const styles = {

  connecting: {
    display: "flex",
    color: "rgb(134, 134, 134)"
  },

  connectingText: {
    fontSize: 12,
    padding: "12px 0 10px 10px"
  },

  connectedText: {
    fontSize: 14,
    padding: "11px 0 10px 10px",
    color: "rgb(92, 200, 160)"
  },

  connected: {
    background: "rgb(104, 227, 181)"
  },

  cardContent: {
    paddingBottom: "16px !important"
  }

}

class StatusCard extends Component {
  render() {
    let { connected, classes } = this.props;
    return (
      <Card>
        <CardContent className={classes.cardContent}>
        {
          !connected
          ? (
              <div className={classes.connecting}>
                <Avatar><PortableWifiOffIcon /></Avatar>
                <span className={classes.connectingText}>not connected</span>
              </div>
            )
          : (
            <div className={classes.connecting}>
              <Avatar className={classes.connected}><WifiTetheringIcon /></Avatar>
              <span className={classes.connectedText}>Connected</span>
            </div>
          )
        }
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(StatusCard);
