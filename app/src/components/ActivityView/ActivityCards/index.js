import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ActivityCard from '../ActivityCard';

const displayedLogs = [
  "liked",
  "unliked",
  "subscribed",
  "unsubscribed"
];

const styles = (theme) => ({

  wrap: {
    display: "flex",
    // justifyContent: ""
  },

  card: {
    margin: 20,
    width: 260
  }

});

class ActivityCards extends Component {
  render() {
    let { classes, logs } = this.props;
    return (
      <div className={classes.wrap}>
        { (logs || [])
          .filter( log =>
            log.type === "data" &&
            displayedLogs.indexOf(log.data.action) > -1
          ).map( log => {
            return <ActivityCard key={log.date} className={classes.card} log={log} />
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(ActivityCards);
