import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 100,
};

const Spinner = () => (
    <div style={style}>
        <CircularProgress size={80} thickness={5} />
    </div>
);

export default Spinner;
