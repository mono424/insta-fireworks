import React, { Component } from 'react';
import Header from '../../components/Header';
import Tags from '../../components/Tags';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return { settings: state.settings };
};

const styles = {

}

class Settings extends Component {

  render() {
    let { tags = [] } = this.props.settings;
    return (
      <div>
        <Header title="Settings" subtitle="Setup for an awesome 🎆"/>
        <Tags tags={tags} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Settings)));
