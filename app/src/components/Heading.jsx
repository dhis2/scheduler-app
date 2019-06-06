import React from 'react';

const style = {
    fontWeight: 300,
    fontSize: 24,
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0,
    padding: '16px 0px 16px 24px',
};

const Heading = (props) => <h1 style={{ ...style, ...props.style }}>{props.children}</h1>;

export default Heading;
