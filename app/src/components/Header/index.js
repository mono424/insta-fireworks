import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {

  subheading: {
    color: "rgb(179, 179, 179)"
  }

}

class Header extends Component {
  render() {
    let { title, subtitle, classes } = this.props;
    return (
      <header>
        <Typography variant="display2">
          {title}
        </Typography>
        <Typography className={classes.subheading} variant="subheading" gutterBottom>
          {subtitle}
        </Typography>
      </header>
    );
  }
}

export default withStyles(styles)(Header);
