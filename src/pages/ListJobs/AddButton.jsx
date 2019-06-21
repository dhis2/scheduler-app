import React from 'react';
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

const style = {
  position: 'absolute',
  right: 36,
  bottom: 36,
};

const AddButton = () => (
    <Link to={'add'}>
        <div style={style}>
            <FloatingActionButton>
                <FontIcon className="material-icons">add</FontIcon>
            </FloatingActionButton>
        </div>
    </Link>
);

export default AddButton;
