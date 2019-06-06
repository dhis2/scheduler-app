import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Entry from 'components/jobOverview/Entry';

class EntryWrap extends Component {
  state = {
      backgroundColor: 'white',
  };

  setBackgroundColor = color => {
      this.setState({
          backgroundColor: color,
      });
  };

  setNeutral = () => this.setBackgroundColor('white');
  setFocus = () => this.setBackgroundColor('#e4e4e4');
  setHover = () => this.setBackgroundColor('#f2f2f2');

  render = () => (
      <div>
          <div
              style={{ transition: 'all 0.1s ease-in-out', ...this.state }}
              onMouseEnter={this.setHover}
              onMouseLeave={this.setNeutral}
              onFocus={this.setFocus}
              onBlur={this.setNeutral}
          >
              <Link to={`edit/${this.props.job.id}`}>
                  <Entry
                      job={this.props.job}
                      onToggle={this.props.onToggle}
                      onRun={this.props.onRun}
                  />
              </Link>
              <Divider />
          </div>
      </div>
  );
}

export default EntryWrap;
