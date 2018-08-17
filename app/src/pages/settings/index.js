import React, { Component } from 'react';
import Header from '../../components/Header';
import Tags from '../../components/Tags';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Runtime from '../../config/Runtime';
import axios from 'axios';

const mapStateToProps = state => {
  return { settings: state.settings };
};

const styles = {
  wrap: {
    position: "relative",
    height: "100%"
  },
  extendedIcon: {
    marginRight: 10
  },
  button: {
    position: "absolute",
    width: 150,
    bottom: 50,
    left: "calc(50% - 75px)"
  }
}

class Settings extends Component {

  state = {
    isSaving: false,
    unsafedSettings: {},
    error: null
  }

  onTagsChanged = (tags) => {
    this.setState({
      unsafedSettings: Object.assign(this.state.unsafedSettings, { tags })
    });
  }

  save = async () => {
    if (!this.hasUnsafedState()) {
      return;
    }
    this.setState({ isSaving: true });
    try {
      await axios.post("http://" + Runtime.serverUrl + "/api/config", {
        config: this.state.unsafedSettings
      });
    } catch (error) {
      this.setState({ error });
    }
    this.setState({ isSaving: false });
  }

  hasUnsafedState = () => {
    return Object.keys(this.state.unsafedSettings).length > 0;
  }

  render() {
    let { unsafedSettings, isSaving } = this.state;
    let { settings, classes } = this.props;
    settings = Object.assign({}, settings, unsafedSettings);
    let { tags = [] } = settings;
    return (
      <div>
        <Header title="Settings" subtitle="Setup for an awesome 🎆"/>
        <Tags tags={tags} onChange={this.onTagsChanged} />
        <Button onClick={this.save} disabled={!this.hasUnsafedState() || isSaving} variant="extendedFab" aria-label="Delete" className={classes.button}>
          <SaveIcon className={classes.extendedIcon} />
            Save
        </Button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Settings)));
