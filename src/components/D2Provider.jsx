import React from 'react';
import PropTypes from 'prop-types';

class D2Provider extends React.Component {
  getChildContext = () => ({
      d2: this.props.d2,
  });

  render = () => (
      <React.Fragment>
          {this.props.children}
      </React.Fragment>
  );
}

D2Provider.propTypes = {
  children: PropTypes.element.isRequired,
  d2: PropTypes.object.isRequired,
};

D2Provider.childContextTypes = {
  d2: PropTypes.object,
};

export default D2Provider;
