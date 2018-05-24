import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import i18n from '@dhis2/d2-i18n';

const iconName = 'help_outline';

const HelpLink = ({ href }) => (
    <IconButton href={href} tooltip={i18n.t('Open user guide')} target="_blank">
        <FontIcon className="material-icons">{iconName}</FontIcon>
    </IconButton>
);

export default HelpLink;
