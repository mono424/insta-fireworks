import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';


const styles = (theme) => ({

  subheading: {
    color: "rgb(179, 179, 179)"
  },

  wrap: {
    display: "flex",
    justifyContent: "space-between"
  },

  active: {
    color: "rgb(191, 191, 191) !important"
  },

  active: {
    color: "rgb(141, 141, 141)"
  },

  inactive: {
    color: "rgb(218, 218, 218)"
  }

});

class ActivityHeader extends Component {

  select = item => () => {
    this.props.onChange(item);
  }

  render() {
    let { classes, selected } = this.props;
    return (
      <div className={classes.wrap}>
        <Typography variant="title" gutterBottom>
          Last Activity
        </Typography>
        <div>
          <IconButton onClick={this.select("log")} className={ selected === "log" ? classes.active : classes.inactive } aria-label="View Log">
            <ViewHeadlineIcon />
          </IconButton>
          <IconButton onClick={this.select("cards")} className={ selected === "cards" ? classes.active : classes.inactive } aria-label="View Cards">
            <ViewModuleIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ActivityHeader);
