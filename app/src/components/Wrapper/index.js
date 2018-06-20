import React, { Component } from 'react';
import Sidebar from '../Sidebar';

class Wrapper extends Component {
  render() {
    let { children } = this.props;
    return (
      <div>
        <main>
          {children}
        </main>
        <Sidebar />
      </div>
    );
  }
}

export default Wrapper;
