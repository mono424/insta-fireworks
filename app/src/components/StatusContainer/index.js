import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Runtime from '../../config/Runtime';

const styles = {

  wrapper: {
      marginBottom: 60
  }

}

class StatusContainer extends Component {

  state = { stats: null }

  componentDidMount() {
    Runtime.wsClient.subscribe('/log', message => {
      let { type, payload } = message;
      if( type === "complete" ) {
        payload = payload
        .filter( log => log.data.action === "status" )
        .sort( (a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()) )
        this.setState({ stats: payload.length > 0 ? payload[0] : null });
      }else if (payload.action === "status") {
        this.setState({ stats: payload });
      }
    });
  }

  render() {
    let { title, subtitle, classes } = this.props;
    let { stats } = this.state;
    let {
      autoLikedCount = 0,
      followerCount = 0,
      followingCount = 0,
      periodStates = {}, // {autoFollow: false, autoLike: true}
      pk = null,
      username = null
    } = stats ? stats.data.data : {};

    return (
      <div className={classes.wrapper}>
        <Typography variant="title" gutterBottom>
          Current Statistics
        </Typography>
        Account: {`${username} (${pk})`}<br />
        Follower: {followerCount}<br />
        Following: {followingCount}<br />
        Auto-Follow: {periodStates.autoFollow ? "running..." : "paused"}<br />
        Auto-Like: {periodStates.autoLike ? "running..." : "paused"}<br />
      </div>
    );
  }
}

export default withStyles(styles)(StatusContainer);
