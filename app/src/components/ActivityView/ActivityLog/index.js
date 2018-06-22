import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ActivityCard from '../ActivityCard';

const styles = (theme) => ({

  wrap: {

  },

  date: {
    display: "inline-block",
    width: 45,
    marginRight: 10,
    background: "rgb(115, 115, 114)",
    color: "white",
    padding: "5px 10px",
    borderRadius: 20,
    textAlign: "center"
  },

});

class ActivityLog extends Component {

  formatDate(date) {
    let d = new Date(date);
    return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
  }

  logLine(log, classes) {
      let date = <span className={classes.date}>{this.formatDate(log.date)}</span>
      if ( log.type === "data" ) {
        switch (log.data.action) {
          case "status":
          return <p key={log.date}>{date}Updated Account Status</p>

          case "liked":
          return <p key={log.date}>{date}Liked Media: {log.data.data.media.caption.substr(0, 32)}</p>

          case "unliked":
          return <p key={log.date}>{date}Unliked Media: {JSON.stringify(log.data)}</p>

          case "subscribed":
          return <p key={log.date}>{date}Unliked Media: {JSON.stringify(log.data)}</p>

          case "unsubscribed":
          return <p key={log.date}>{date}Unliked Media: {JSON.stringify(log.data)}</p>
        }
      } else {
        return <p key={log.date}>{date}{JSON.stringify(log.data)}</p>
      }
  }

  render() {
    let { classes, logs } = this.props;
    logs = (logs || []);
    logs.sort( (a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()) );
    return (
      <div className={classes.wrap}>
        { logs.map( log => this.logLine(log, classes) ) }
      </div>
    );
  }
}

export default withStyles(styles)(ActivityLog);
