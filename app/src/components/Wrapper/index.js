import React, { Component } from 'react';
import StatusCard from '../StatusCard';
import Sidebar from '../Sidebar';

class Wrapper extends Component {
  render() {
    let { children, connected } = this.props;
    return (
      <div>
        <main>
          {children}
        </main>
        <nav>
        <div className="status-wrap">
          <StatusCard connected={connected} />
        </div>
        <span className="vert-pad"></span>
        <Sidebar />
        </nav>
      </div>
    );
  }
}

export default Wrapper;
