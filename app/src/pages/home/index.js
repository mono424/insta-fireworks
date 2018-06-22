import React, { Component } from 'react';
import Header from '../../components/Header';
import ActivityView from '../../components/ActivityView';

class Home extends Component {

  render() {
    return (
      <div>
        <Header title="Overview" subtitle="Nothing better than some 🎆"/>
        <ActivityView />
      </div>
    );
  }
}

export default Home;
