import React, { Component } from 'react';
import Header from '../../components/Header';
import ActivityView from '../../components/ActivityView';
import StatusContainer from '../../components/StatusContainer';

class Home extends Component {

  render() {
    return (
      <div>
        <Header title="Overview" subtitle="Nothing better than some 🎆"/>
        <StatusContainer />
        <ActivityView />
      </div>
    );
  }
}

export default Home;
