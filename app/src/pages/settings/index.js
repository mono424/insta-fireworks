import React, { Component } from 'react';
import Header from '../../components/Header';
import Tags from '../../components/Tags';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

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
    unsafedSettings: {}
  }

  onTagsChanged = (tags) => {
    this.setState({
      unsafedSettings: Object.assign(this.state.unsafedSettings, { tags })
    });
  }

  save = () => {

  }

  render() {
    let { unsafedSettings } = this.state;
    let { settings, classes } = this.props;
    settings = Object.assign({}, settings, unsafedSettings);
    let { tags = [] } = settings;
    return (
      <div>
        <Header title="Settings" subtitle="Setup for an awesome 🎆"/>
        <Tags tags={tags} onChange={this.onTagsChanged} />
        <Button variant="extendedFab" aria-label="Delete" className={classes.button}>
          <SaveIcon className={classes.extendedIcon} />
            Save
        </Button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Settings)));
