import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = {

  cardHeader: {

  },

  cardContent: {
    paddingBottom: "16px !important"
  },

}

class AccountCard extends Component {
  render() {
    let { username, followerCount, followingCount, classes } = this.props;
    let char = username ? username.substr(0,1).toUpperCase() : "A";
    return (
      <Card>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label={username} className={classes.avatar}>
              {char}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={username}
          subheader={<span>{`${followerCount} | ${followingCount}`}</span>}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(AccountCard);
