import React, { Component } from 'react';
import StatusCard from '../StatusCard';
import AccountCard from '../AccountCard';
import UpdateCard from '../UpdateCard';
import Sidebar from '../Sidebar';
import Runtime from '../../config/Runtime';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return { stats: state.stats };
};

class Wrapper extends Component {
  state = { stats: null }

  render() {
    let { children, connected, stats } = this.props;
    
    let {
      followerCount = 0,
      followingCount = 0,
      periodStates = {}, // {autoFollow: false, autoLike: true}
      pk = null,
      username = null
    } = stats || {};

    return (
      <div>
        <main>
          {children}
        </main>
        <nav>
        <div className="status-wrap">
          <StatusCard connected={connected} /><br />
          <AccountCard username={username} followerCount={followerCount} followingCount={followingCount} />
          <UpdateCard />
        </div>
        <span className="vert-pad"></span>
        <Sidebar />
        </nav>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Wrapper));
