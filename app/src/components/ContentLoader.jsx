import { connect } from 'react-redux';
import { compose, lifecycle, pure, branch, renderComponent } from 'recompose';
import * as actions from 'constants/actions';
import Routes from './Routes';

const getSymbolProperties = symbol => Array.from(symbol[Object.getOwnPropertySymbols(symbol)[0]]);
const userIsNotAuthorized = props => {
    const userAuthorities = getSymbolProperties(props.d2.currentUser.authorities);
    return !userAuthorities.includes('ALL') && !userAuthorities.includes('F_SCHEDULING_ADMIN');
};

const ContentLoader = compose(
  connect(
      () => ({}),
      dispatch => ({
          loadJobs: () => dispatch({ type: actions.JOBS_LOAD }),
          loadConfiguration: () => dispatch({ type: actions.CONFIGURATION_LOAD }),
          notAuthorized: () => dispatch({ type: actions.NOT_AUTHORIZED }),
      }),
  ),
  branch(
      // Render an 'unauthorized' message if user is not authorized.
      userIsNotAuthorized,
      renderComponent(
          compose(
              lifecycle({
                  componentWillMount() {
                      this.props.notAuthorized();
                  },
              }),
          )(() => null),
      ),
  ),
  lifecycle({
      componentWillMount() {
          this.props.loadJobs();
          this.props.loadConfiguration();
      },
  }),
  pure,
)(Routes);

export default ContentLoader;
