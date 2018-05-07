import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import i18next from 'i18next';

const iconName = 'help_outline';

const HelpLink = ({ href }) => (
    <IconButton href={href} tooltip={i18next.t('open_user_guide')} target="_blank">
        <FontIcon className="material-icons">{iconName}</FontIcon>
    </IconButton>
);

export default HelpLink;
