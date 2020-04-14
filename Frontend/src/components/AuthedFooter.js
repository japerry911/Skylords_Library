import React from 'react';
import FooterIconButton from './FooterIconButton';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/colors';

const AuthedFooter = ({ parentNavigation }) => {
    return (
        <View style={styles.footerStyle}>
            <FooterIconButton
                iconComponent={<MaterialCommunityIcons
                                    name='home-outline'
                                    size={35}
                                    style={styles.footerIconStyle}
                                />}
                onPress={() => parentNavigation.navigate('Home', { fromFooter: true })}
            />
            <FooterIconButton
                iconComponent={<AntDesign
                                    name='book'
                                    size={35}
                                    style={styles.footerIconStyle}
                                />}
                onPress={() => parentNavigation.navigate('Books')}
            />
            <FooterIconButton
                iconComponent={<FontAwesome
                                    name='bookmark-o'
                                    size={32}
                                    style={styles.footerIconStyle}
                                />}
                onPress={() => parentNavigation.navigate('Favorites')}
            />
            <FooterIconButton
                iconComponent={<FontAwesome
                                    name='user-o'
                                    size={32}
                                    style={styles.footerIconStyle}
                                />}
                onPress={() => parentNavigation.navigate('My Profile')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    footerStyle: {
        justifyContent: 'space-evenly',
        backgroundColor: Colors.accentLightGray,
        flexDirection: 'row',
        width: '100%',
        paddingTop: '3%',
        height: '10%'
    },
    footerIconStyle: {
        marginTop: 5,
        color: Colors.primaryOrange
    }
});

export default AuthedFooter;