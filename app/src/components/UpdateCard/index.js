import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Runtime from '../../config/Runtime';
import UpdateIcon from '@material-ui/icons/Update'
import axios from 'axios';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: "20px 0",
    height: 140,
  },
  icon: {
    margin: "0 10px 0 0",
    verticalAlign: "middle"
  }
});

class UpdateCard extends React.Component {

  state = {
    available: false,
    updating: false
  }

  componentDidMount() {
    this.check();
  }

  check = async () => {
    try {
      let res = await axios.get("http://" + Runtime.serverUrl + "/api/update");
      this.setState({ available: res.data });
    } catch (error) {
      this.setState({ available: false });
    }
  }

  perform = async () => {
    try {
      this.setState({ updating: true });
      await axios.post("http://" + Runtime.serverUrl + "/api/update", {
        config: this.state.unsafedSettings
      });
      this.setState({ updating: false });
    } catch (error) {
      this.setState({ error });
      this.setState({ updating: false });
    }
  }

  render() {
    const { updating, available } = this.state;
    const { classes, theme } = this.props;

    return (
      !available
      ? null
      : (
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="headline">New Update!</Typography>
                <Typography variant="subheading" color="textSecondary">
                  Update ready to install.
              </Typography>
                <br />
                <Button disabled={updating} onClick={this.perform}>
                  {updating ? "Installing ..." : "Install"}
              </Button>
              </CardContent>
            </div>
          </Card>
      )
    );
  }
}

export default withStyles(styles, { withTheme: true })(UpdateCard);