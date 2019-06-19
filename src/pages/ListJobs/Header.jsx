import React from 'react';
import Toggle from 'material-ui/Toggle';
import i18n from '@dhis2/d2-i18n';
import { connect } from 'react-redux';
import * as actions from '../../constants/actions';
import Heading from '../../components/Heading';
import { HelpButton } from '../../components/Buttons';

const styles = {
  header: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
  },
  headerLeft: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
  },
  systemJobToggleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '16px 24px',
  },
  systemJobToggle: {
      width: 'auto',
  },
  systemJobToggleTrack: {
      backgroundColor: '#dddddd',
  },
};

const documentationHref = 'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html';

const Header = ({ toggleSystemJobs, showSystemJobs }) => (
    <div style={styles.header}>
        <div style={styles.headerLeft}>
            <Heading>{i18n.t('Scheduled jobs')}</Heading>
            <HelpButton href={documentationHref} />
        </div>
        <div style={styles.systemJobToggleContainer}>
            {i18n.t('Show system jobs')}
            <Toggle
                style={styles.systemJobToggle}
                trackStyle={styles.systemJobToggleTrack}
                toggled={showSystemJobs}
                onToggle={() => toggleSystemJobs(!showSystemJobs)}
            />
        </div>
    </div>
);

const mapStateToProps = state => ({
  showSystemJobs: state.jobs.showSystemJobs,
});

const mapDispatchToProps = dispatch => ({
  toggleSystemJobs: enabled =>
      dispatch({ type: actions.TOGGLE_SYSTEM_JOBS, payload: { enabled } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
