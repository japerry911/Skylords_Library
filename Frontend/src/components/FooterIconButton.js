import React from 'react';
import { TouchableOpacity } from 'react-native';

const FooterIconButton = ({ iconComponent, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            {iconComponent}
        </TouchableOpacity>
    );
};

export default FooterIconButton;