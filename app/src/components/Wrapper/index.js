import React, { Component } from 'react';
import StatusCard from '../StatusCard';
import AccountCard from '../AccountCard';
import Sidebar from '../Sidebar';
import Runtime from '../../config/Runtime';

class Wrapper extends Component {
  state = { stats: null }

  componentWillUnmount() {
    Runtime.wsClient.unsubscribe('/log', this.subHandler);
  }

  componentDidMount() {
    Runtime.wsClient.subscribe('/log', this.subHandler);
  }

  subHandler = message => {
    let { type, payload } = message;
    if( type === "complete" ) {
      payload = payload
      .filter( log => log.data.action === "status" )
      .sort( (a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()) )
      this.setState({ stats: payload.length > 0 ? payload[0] : null });
    }else if (payload.action === "status") {
      this.setState({ stats: payload });
    }
  }

  render() {
    let { stats } = this.state;
    let {
      followerCount = 0,
      followingCount = 0,
      periodStates = {}, // {autoFollow: false, autoLike: true}
      pk = null,
      username = null
    } = stats ? stats.data.data : {};
    let { children, connected } = this.props;

    return (
      <div>
        <main>
          {children}
        </main>
        <nav>
        <div className="status-wrap">
          <StatusCard connected={connected} /><br />
          <AccountCard username={username} followerCount={followerCount} followingCount={followingCount} />
        </div>
        <span className="vert-pad"></span>
        <Sidebar />
        </nav>
      </div>
    );
  }
}

export default Wrapper;
